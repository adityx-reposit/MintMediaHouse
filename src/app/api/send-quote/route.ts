import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    console.log("[Quote API] Received request:", { name, email, messageLength: message?.length });

    // Validate input
    if (!name || !email || !message) {
      console.warn("[Quote API] Missing required fields:", { name: !!name, email: !!email, message: !!message });
      return NextResponse.json(
        { error: "Missing required fields: name, email, and message are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.warn("[Quote API] Invalid email format:", email);
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Check env vars are present
    const gmailUser = process.env.GMAIL_USER;
    const gmailPassword = process.env.GMAIL_PASSWORD;

    if (!gmailUser || !gmailPassword) {
      console.error("[Quote API] Missing email credentials - GMAIL_USER:", !!gmailUser, "GMAIL_PASSWORD:", !!gmailPassword);
      return NextResponse.json(
        { error: "Email service not configured. Please contact us directly." },
        { status: 503 }
      );
    }

    console.log("[Quote API] Configuring nodemailer with user:", gmailUser);

    // Configure nodemailer with Gmail + App Password
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: gmailUser,
        pass: gmailPassword,
      },
      connectionTimeout: 10000,
      socketTimeout: 10000,
    });

    // Verify connection before sending
    console.log("[Quote API] Verifying SMTP connection...");
    await transporter.verify();
    console.log("[Quote API] SMTP connection verified");

    const senderName = name.replace(/[<>]/g, "");
    const clientEmail = email.trim();
    const projectMessage = message.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    // Email to Mint Media House
    console.log("[Quote API] Sending email to mintmediaconnect@gmail.com");
    await transporter.sendMail({
      from: `"${senderName}" <${gmailUser}>`,
      to: "mintmediaconnect@gmail.com",
      replyTo: clientEmail,
      subject: `New Quote Request from ${senderName}`,
      html: `
        <!DOCTYPE html>
        <html>
          <body style="font-family:Arial,sans-serif;background:#f4f4f4;padding:20px;">
            <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.1);">
              <div style="background:#ff3300;padding:24px 32px;">
                <h1 style="color:#fff;margin:0;font-size:20px;letter-spacing:1px;">NEW QUOTE REQUEST</h1>
              </div>
              <div style="padding:32px;">
                <p style="margin:0 0 16px;"><strong>Name:</strong> ${senderName}</p>
                <p style="margin:0 0 16px;"><strong>Email:</strong> <a href="mailto:${clientEmail}" style="color:#ff3300;text-decoration:none;">${clientEmail}</a></p>
                <p style="margin:0 0 12px;"><strong>Project Details:</strong></p>
                <div style="margin:0;background:#f9f9f9;padding:16px;border-left:4px solid #ff3300;font-family:monospace;white-space:pre-wrap;word-break:break-word;font-size:13px;">${projectMessage}</div>
                <p style="margin:16px 0 0;color:#666;font-size:12px;">Sent at: ${new Date().toISOString()}</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });
    console.log("[Quote API] Email sent to mintmediaconnect@gmail.com");

    // Auto-reply to the sender
    console.log("[Quote API] Sending auto-reply to", clientEmail);
    await transporter.sendMail({
      from: `"Mint Media House" <${gmailUser}>`,
      to: clientEmail,
      subject: `We received your request, ${senderName}!`,
      html: `
        <!DOCTYPE html>
        <html>
          <body style="font-family:Arial,sans-serif;background:#f4f4f4;padding:20px;">
            <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.1);">
              <div style="background:#111;padding:24px 32px;text-align:center;">
                <h1 style="color:#fff;margin:0;font-size:18px;letter-spacing:1px;">MINT<span style="color:#ff3300;">MEDIA</span>HOUSE</h1>
              </div>
              <div style="padding:32px;">
                <p style="margin:0 0 16px;">Hi ${senderName},</p>
                <p style="margin:0 0 16px;color:#333;line-height:1.6;">Thanks for reaching out! We've received your quote request and will get back to you within <strong>24 hours</strong> with a custom proposal.</p>
                <div style="margin:24px 0;padding:16px;background:#f9f9f9;border-left:4px solid #ff3300;font-size:13px;color:#666;">
                  <p style="margin:0;"><strong>What happens next:</strong></p>
                  <ul style="margin:8px 0 0;padding-left:20px;">
                    <li>Our team reviews your project details</li>
                    <li>We prepare a custom quote & timeline</li>
                    <li>We'll email you the proposal directly</li>
                  </ul>
                </div>
                <p style="margin:24px 0 0;color:#888;font-size:13px;">Questions? Reply to this email or visit <a href="https://mintmediahouse.in" style="color:#ff3300;">mintmediahouse.in</a></p>
                <p style="margin:12px 0 0;color:#999;font-size:12px;">— The Mint Media House Team</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });
    console.log("[Quote API] Auto-reply sent to", clientEmail);

    return NextResponse.json(
      { 
        message: "Quote request sent successfully. Check your email for confirmation.",
        success: true 
      },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    const errorStack = error instanceof Error ? error.stack : "";
    
    console.error("[Quote API] Error occurred:", {
      message: errorMessage,
      stack: errorStack,
      timestamp: new Date().toISOString(),
    });

    // Determine the appropriate error message
    let userMessage = "Failed to send quote request. Please try again.";
    let statusCode = 500;

    if (errorMessage.includes("ECONNREFUSED")) {
      userMessage = "Email service temporarily unavailable. Please try again in a moment.";
      statusCode = 503;
    } else if (errorMessage.includes("ETIMEDOUT") || errorMessage.includes("timeout")) {
      userMessage = "Request timed out. Please try again.";
      statusCode = 504;
    } else if (errorMessage.includes("Invalid login")) {
      userMessage = "Email service authentication failed. Contact support@mintmediahouse.in";
      statusCode = 503;
    }

    return NextResponse.json(
      { 
        error: userMessage,
        details: process.env.NODE_ENV === "development" ? errorMessage : undefined 
      },
      { status: statusCode }
    );
  }
}
