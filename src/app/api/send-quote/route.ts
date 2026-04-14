import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check env vars are present
    if (!process.env.GMAIL_USER || !process.env.GMAIL_PASSWORD) {
      console.error("Missing GMAIL_USER or GMAIL_PASSWORD environment variables");
      return NextResponse.json(
        { error: "Server email configuration is missing" },
        { status: 500 }
      );
    }

    // Configure nodemailer with Gmail + App Password
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    // Verify connection before sending
    await transporter.verify();

    // Email to Mint Media House
    await transporter.sendMail({
      from: `"Mint Media House" <${process.env.GMAIL_USER}>`,
      to: "mintmediaconnect@gmail.com",
      replyTo: email,
      subject: `New Quote Request from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <body style="font-family:Arial,sans-serif;background:#f4f4f4;padding:20px;">
            <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:8px;overflow:hidden;">
              <div style="background:#ff3300;padding:24px 32px;">
                <h1 style="color:#fff;margin:0;font-size:20px;letter-spacing:1px;">NEW QUOTE REQUEST</h1>
              </div>
              <div style="padding:32px;">
                <p style="margin:0 0 12px;"><strong>Name:</strong> ${name}</p>
                <p style="margin:0 0 12px;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                <p style="margin:0 0 8px;"><strong>Project Details:</strong></p>
                <p style="margin:0;background:#f9f9f9;padding:16px;border-left:3px solid #ff3300;white-space:pre-wrap;">${message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    // Auto-reply to the sender
    await transporter.sendMail({
      from: `"Mint Media House" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: `We received your request, ${name}!`,
      html: `
        <!DOCTYPE html>
        <html>
          <body style="font-family:Arial,sans-serif;background:#f4f4f4;padding:20px;">
            <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:8px;overflow:hidden;">
              <div style="background:#111;padding:24px 32px;">
                <h1 style="color:#fff;margin:0;font-size:18px;letter-spacing:1px;">MINT<span style="color:#ff3300;">MEDIA</span>HOUSE</h1>
              </div>
              <div style="padding:32px;">
                <p>Hi ${name},</p>
                <p>Thanks for reaching out! We've received your quote request and will get back to you within <strong>24 hours</strong>.</p>
                <p style="margin-top:24px;color:#888;font-size:13px;">— The Mint Media House Team</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    return NextResponse.json(
      { message: "Quote request sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email. Please try again or contact us directly." },
      { status: 500 }
    );
  }
}
