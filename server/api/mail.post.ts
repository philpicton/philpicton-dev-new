import { defineEventHandler, readBody, getHeader, getRequestIP } from "h3";

type MailOptions = {
  from: string;
  replyTo: string;
  to: string[];
  subject: string;
  text: string;
  html: string;
};

export default defineEventHandler(async (event) => {
  // 1. State ----------------------------------

  const kv = hubKV();
  const contentType = getHeader(event, "content-type");
  const body = await readBody(event);
  const { name, email, phone, message, website } = body || {};
  const ip = getRequestIP(event) || "unknown";
  const maxSubmissions = process.env.MAX_SUBMISSIONS;
  const ttl = process.env.RATE_LIMIT_TTL_SECONDS;

  // 2. Functions ------------------------------

  async function belowRateLimit() {
    const key = `contact:${ip}`;
    const currentCount = (await kv.get<number>(key)) || 0;
    if (currentCount >= Number(maxSubmissions)) {
      return false;
    }
    await kv.set(key, currentCount + 1, { ttl });
    return true;
  }

  function validate() {
    // Validate Content-Type header
    if (!contentType || !contentType.includes("application/json")) {
      return { success: false, error: "Invalid Content-Type." };
    }

    // Honeypot check
    if (website) {
      return { success: false, error: "Spam detected." };
    }

    // Field validation
    if (!name || name.length < 2 || name.length > 100) {
      return { success: false, error: "Name is required. 2-100 chars max." };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return { success: false, error: "A valid email is required." };
    }

    if (message && message.length > 2000) {
      return { success: false, error: "Message is too long." };
    }

    // check rate limit
    if (!belowRateLimit) {
      return {
        success: false,
        error: "Rate limit exceeded. Please try again later.",
      };
    }

    return { success: true, error: "" };
  }

  function getEmail(): MailOptions {
    return {
      from: `Website <${process.env.MAIL_FROM}>`,
      replyTo: `${name} <${email}>`,
      to: [`${process.env.MAIL_TO}`],
      subject: `New Contact Form Submission`,
      text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone || "N/A"}
        Message: ${message || "(no message)"}
      `,
      html: `
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone || "N/A"}</p>
        <p><b>Message:</b><br/>${message || "(no message)"}</p>
      `,
    };
  }

  async function sendEmail() {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify(getEmail()),
      });
      if (res.ok) {
        const data = await res.json();
        console.log("Mail sent:", data);
        return true;
      }
    } catch (error: any) {
      console.error("Mail error:", error);
      return false;
    }
    return false;
  }

  // 3. Main ------------------------------------
  try {
    // preflight checks
    const valid = validate();
    if (!valid.success) {
      return { success: false, error: valid.error };
    }
    // send email
    const emailSent = await sendEmail();
    // report back
    if (emailSent) {
      return { success: true };
    }
    return { success: false, error: "Failed to send email." };
    // catch errors
  } catch (error) {
    console.error("Server error:", error);
    return { success: false, error: "Server error." };
  }
});
