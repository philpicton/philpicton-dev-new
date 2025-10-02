import { defineEventHandler, readBody, getHeader, getRequestIP } from "h3";
import type { MailApiResponse } from "~/types/types";

type MailOptions = {
  from: string;
  replyTo: string;
  to: string[];
  subject: string;
  text: string;
  html: string;
};

type ContactFormData = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  website?: string;
};

export default defineEventHandler(async (event) => {
  // 1. State ----------------------------------

  const kv = hubKV();
  const contentType = getHeader(event, "content-type");
  const body = await readBody<ContactFormData>(event);
  const { name, email, phone, message, website } = body || {};
  const ip = getRequestIP(event) || "unknown";
  const maxSubmissions = process.env.MAX_SUBMISSIONS;
  const ttl = process.env.RATE_LIMIT_TTL_SECONDS;

  // 2. Functions ------------------------------

  // Sanitize HTML entities to prevent XSS
  function escapeHtml(text: string): string {
    const map: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return text.replace(/[&<>"']/g, (char) => map[char] || char);
  }

  // Sanitize input by trimming and escaping
  function sanitizeInput(input: string | undefined, maxLength: number): string {
    if (!input) return "";
    return escapeHtml(input.trim().slice(0, maxLength));
  }

  async function belowRateLimit() {
    const key = `contact:${ip}`;
    const currentCount = (await kv.get<number>(key)) || 0;
    if (currentCount >= Number(maxSubmissions)) {
      return false;
    }
    await kv.set(key, currentCount + 1, { ttl });
    return true;
  }

  async function validate(): Promise<MailApiResponse> {
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

    // Email validation (RFC 5322 standard)
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!email || email.length > 254 || !emailRegex.test(email)) {
      return { success: false, error: "A valid email is required." };
    }

    if (message && message.length > 2000) {
      return { success: false, error: "Message is too long." };
    }

    // check rate limit
    const withinLimit = await belowRateLimit();
    if (!withinLimit) {
      return {
        success: false,
        error: "Rate limit exceeded. Please try again later.",
      };
    }

    return { success: true };
  }

  function getEmail(): MailOptions {
    // Sanitize all inputs before using them
    const sanitizedName = sanitizeInput(name, 100);
    const sanitizedEmail = email?.trim() || "";
    const sanitizedPhone = sanitizeInput(phone, 20);
    const sanitizedMessage = sanitizeInput(message, 2000);

    return {
      from: `Website <${process.env.MAIL_FROM}>`,
      replyTo: `${sanitizedName} <${sanitizedEmail}>`,
      to: [`${process.env.MAIL_TO}`],
      subject: `New Contact Form Submission`,
      text: `
        Name: ${sanitizedName}
        Email: ${sanitizedEmail}
        Phone: ${sanitizedPhone || "N/A"}
        Message: ${sanitizedMessage || "(no message)"}
      `,
      html: `
        <p><b>Name:</b> ${sanitizedName}</p>
        <p><b>Email:</b> ${sanitizedEmail}</p>
        <p><b>Phone:</b> ${sanitizedPhone || "N/A"}</p>
        <p><b>Message:</b><br/>${sanitizedMessage.replace(/\n/g, "<br/>") || "(no message)"}</p>
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
        if (process.env.NODE_ENV === "development") {
          console.log("Mail sent:", data);
        }
        return true;
      }
    } catch (error: unknown) {
      if (process.env.NODE_ENV === "development") {
        console.error("Mail error:", error);
      }
      return false;
    }
    return false;
  }

  // 3. Main ------------------------------------
  try {
    // preflight checks
    const valid = await validate();
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
  } catch (error: unknown) {
    if (process.env.NODE_ENV === "development") {
      console.error("Server error:", error);
    }
    return { success: false, error: "Server error." };
  }
});
