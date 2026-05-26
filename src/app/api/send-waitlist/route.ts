import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { channel, reach, frequency, name, email } = await request.json();

    if (!channel || !reach || !frequency || !name || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    const safeName = name.replace(/[<>]/g, "");
    const safeEmail = email.trim();

    const gmailUser = process.env.GMAIL_USER;
    const gmailPassword = process.env.GMAIL_PASSWORD;

    if (!gmailUser || !gmailPassword) {
      return NextResponse.json(
        { error: "Email service not configured. Please contact hello@mintmediahouse.in", code: "MISSING_CONFIG" },
        { status: 503 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: gmailUser, pass: gmailPassword },
    } as any);

    await transporter.verify();

    await transporter.sendMail({
      from: `"${safeName}" <${gmailUser}>`,
      to: "mintmediaconnect@gmail.com",
      replyTo: safeEmail,
      subject: `New Self Growth Channel Waitlist — ${safeName}`,
      html: `
        <body style="font-family:Arial,sans-serif;background:#f4f4f4;padding:20px;">
          <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:8px;overflow:hidden;">
            <div style="background:#ff3300;padding:24px 32px;">
              <h1 style="color:#fff;margin:0;font-size:20px;letter-spacing:1px;">SELF GROWTH CHANNEL — WAITLIST</h1>
            </div>
            <div style="padding:32px;">
              <p><strong>Name:</strong> ${safeName}</p>
              <p><strong>Email:</strong> <a href="mailto:${safeEmail}" style="color:#ff3300;">${safeEmail}</a></p>
              <p><strong>Platform:</strong> ${channel}</p>
              <p><strong>Minimum Reach:</strong> ${reach}</p>
              <p><strong>Content Frequency:</strong> ${frequency}</p>
              <p style="color:#666;font-size:12px;">Submitted at: ${new Date().toISOString()}</p>
            </div>
          </div>
        </body>`,
    });

    await transporter.sendMail({
      from: `"Mint Media House" <${gmailUser}>`,
      to: safeEmail,
      subject: `We received your application — Self Growth Channel`,
      html: `
        <!DOCTYPE html>
        <html>
          <body style="font-family:Arial,sans-serif;background:#f4f4f4;padding:20px;margin:0;">
            <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
              <div style="background:#111;padding:20px 32px;text-align:center;">
                <img src="https://mintmediahouse.in/logo/logo.png" alt="Mint Media House" width="120" height="48" style="display:block;margin:0 auto;filter:brightness(1.2);" />
              </div>
              <div style="padding:36px 32px;">
                <p style="margin:0 0 20px;font-size:16px;color:#111;font-weight:600;">Hey ${safeName},</p>
                <p style="margin:0 0 16px;color:#333;line-height:1.7;font-size:15px;">We have received your response for the <strong>Self Growth Channel</strong> — thank you for applying.</p>
                <p style="margin:0 0 24px;color:#333;line-height:1.7;font-size:15px;">We will review your application and <strong>reach out shortly if selected</strong>. Spots are limited, so we'll be in touch soon.</p>
                <div style="margin:28px 0;padding:20px 24px;background:#f9f9f9;border-left:4px solid #ff3300;border-radius:0 4px 4px 0;">
                  <p style="margin:0 0 10px;font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:#999;font-weight:600;">Your submission</p>
                  <p style="margin:0 0 6px;font-size:13px;color:#444;">📱 <strong>Platform:</strong> ${channel}</p>
                  <p style="margin:0 0 6px;font-size:13px;color:#444;">📊 <strong>Reach goal:</strong> ${reach}</p>
                  <p style="margin:0;font-size:13px;color:#444;">🎬 <strong>Frequency:</strong> ${frequency}</p>
                </div>
                <p style="margin:24px 0 8px;color:#888;font-size:13px;line-height:1.6;">Questions? Just reply to this email — we read every one.</p>
                <p style="margin:0;color:#888;font-size:13px;">Or visit us at <a href="https://mintmediahouse.in" style="color:#ff3300;text-decoration:none;">mintmediahouse.in</a></p>
              </div>
              <div style="background:#f4f4f4;padding:16px 32px;text-align:center;border-top:1px solid #eee;">
                <p style="margin:0;color:#bbb;font-size:11px;letter-spacing:0.5px;">— The Mint Media House Team</p>
              </div>
            </div>
          </body>
        </html>`,
    });

    return NextResponse.json({ success: true, message: "Added to waitlist successfully." }, { status: 200 });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error("[Waitlist API] Error:", msg);

    let userMessage = "Failed to join waitlist. Please try again.";
    let statusCode = 500;

    if (msg.includes("ECONNREFUSED")) { statusCode = 503; userMessage = "Email service unavailable. Try again shortly."; }
    else if (msg.includes("Invalid login") || msg.includes("535")) { statusCode = 503; userMessage = "Email authentication error. Please contact us directly."; }

    return NextResponse.json({ error: userMessage, success: false }, { status: statusCode });
  }
}
