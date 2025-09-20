import { defineEventHandler, readBody, getHeader, getRequestIP } from "h3";
import { Resend } from "resend";

export default defineEventHandler(async (event) => {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    // Validate Content-Type header
    const contentType = getHeader(event, "content-type");
    if (!contentType || !contentType.includes("application/json")) {
      return { success: false, error: "Invalid request." };
    }

    // Get client IP
    //const ip = getRequestIP(event) || "unknown";
    //const kv = hubKV();

    // Rate limit: max 3 submissions / 10 minutes per IP
    //const key = `contact:${ip}`;
    //const currentCount = (await kv.get<number>(key)) || 0;
    //if (currentCount >= 3) {
    //  return { success: false, error: "Too many submissions." };
    //}
    //await kv.set(key, currentCount + 1, { ttl: 600 }); // expires in 600s = 10 mins

    // Parse request body
    const body = await readBody(event);
    const { name, email, phone, message, website } = body || {};

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

    // Prepare email content
    const mailOptions = {
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

    const { data, error } = await resend.emails.send(mailOptions);
    if (!error) {
      console.log("Mail sent:", data);
      return { success: true };
    }
    console.error("Mail send error:", error);
    return { success: false, error: "Failed to send message." };
  } catch (error: any) {
    console.error("Mail error:", error);
    return {
      success: false,
      error: "Failed to send message.",
    };
  }
});
