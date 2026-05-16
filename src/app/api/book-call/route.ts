import { google } from "googleapis";
import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

function buildIST(date: string, timeSlot: string, offsetMinutes = 0): string {
  const [h, m] = timeSlot.split(":").map(Number);
  const total = h * 60 + m + offsetMinutes;
  const hh = String(Math.floor(total / 60)).padStart(2, "0");
  const mm = String(total % 60).padStart(2, "0");
  return `${date}T${hh}:${mm}:00+05:30`;
}

async function tryCreateGoogleEvent(
  date: string,
  timeSlot: string,
  name: string,
  email: string,
  note: string
): Promise<string> {
  const saEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const saKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;
  const calId = process.env.GOOGLE_CALENDAR_ID || "primary";

  if (!saEmail || !saKey) return "";

  const auth = new google.auth.JWT({
    email: saEmail,
    key: saKey.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/calendar"],
  });

  const calendar = google.calendar({ version: "v3", auth });

  const event = await calendar.events.insert({
    calendarId: calId,
    conferenceDataVersion: 1,
    sendUpdates: "all",
    requestBody: {
      summary: `Discovery Call — ${name} × Mint Media House`,
      description: `Client: ${name}\nEmail: ${email}${note ? `\nNote: ${note}` : ""}`,
      start: { dateTime: buildIST(date, timeSlot, 0), timeZone: "Asia/Kolkata" },
      end: { dateTime: buildIST(date, timeSlot, 30), timeZone: "Asia/Kolkata" },
      attendees: [{ email }],
      conferenceData: {
        createRequest: {
          requestId: `mmh-${Date.now()}`,
          conferenceSolutionKey: { type: "hangoutsMeet" },
        },
      },
    },
  });

  return event.data.conferenceData?.entryPoints?.[0]?.uri ?? "";
}

export async function POST(request: NextRequest) {
  try {
    const { date, timeSlot, name, email, note = "" } = await request.json();

    if (!date || !timeSlot || !name || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    const safeName = name.replace(/[<>]/g, "");
    const safeEmail = email.trim();

    let meetLink = "";
    try {
      meetLink = await tryCreateGoogleEvent(date, timeSlot, safeName, safeEmail, note);
    } catch (googleErr) {
      console.error("[Book API] Google Calendar error (non-fatal):", googleErr);
    }

    const gmailUser = process.env.GMAIL_USER;
    const gmailPassword = process.env.GMAIL_PASSWORD;

    if (gmailUser && gmailPassword) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: gmailUser, pass: gmailPassword },
      } as any);

      const meetSection = meetLink
        ? `<p style="margin:16px 0;"><strong>Google Meet Link:</strong> <a href="${meetLink}" style="color:#ff3300;">${meetLink}</a></p>`
        : `<p style="margin:16px 0;color:#666;">Our team will send the meeting link to your email shortly.</p>`;

      await transporter.sendMail({
        from: `"${safeName}" <${gmailUser}>`,
        to: "mintmediaconnect@gmail.com",
        replyTo: safeEmail,
        subject: `New Discovery Call Booking — ${safeName} (${date} ${timeSlot} IST)`,
        html: `
          <body style="font-family:Arial,sans-serif;background:#f4f4f4;padding:20px;">
            <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:8px;overflow:hidden;">
              <div style="background:#ff3300;padding:24px 32px;">
                <h1 style="color:#fff;margin:0;font-size:20px;letter-spacing:1px;">NEW DISCOVERY CALL BOOKING</h1>
              </div>
              <div style="padding:32px;">
                <p><strong>Name:</strong> ${safeName}</p>
                <p><strong>Email:</strong> <a href="mailto:${safeEmail}" style="color:#ff3300;">${safeEmail}</a></p>
                <p><strong>Date:</strong> ${date}</p>
                <p><strong>Time:</strong> ${timeSlot} IST</p>
                ${note ? `<p><strong>Note:</strong> ${note.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>` : ""}
                ${meetSection}
              </div>
            </div>
          </body>`,
      });

      await transporter.sendMail({
        from: `"Mint Media House" <${gmailUser}>`,
        to: safeEmail,
        subject: `Your Discovery Call is Confirmed — ${date} at ${timeSlot} IST`,
        html: `
          <body style="font-family:Arial,sans-serif;background:#f4f4f4;padding:20px;">
            <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:8px;overflow:hidden;">
              <div style="background:#111;padding:24px 32px;text-align:center;">
                <h1 style="color:#fff;margin:0;font-size:18px;letter-spacing:1px;">MINT<span style="color:#ff3300;">MEDIA</span>HOUSE</h1>
              </div>
              <div style="padding:32px;">
                <p>Hi ${safeName},</p>
                <p style="color:#333;line-height:1.6;">Your <strong>30-minute discovery call</strong> is confirmed!</p>
                <div style="margin:24px 0;padding:20px;background:#f9f9f9;border-left:4px solid #ff3300;">
                  <p style="margin:0 0 8px;"><strong>📅 Date:</strong> ${date}</p>
                  <p style="margin:0 0 8px;"><strong>🕐 Time:</strong> ${timeSlot} IST (Asia/Kolkata)</p>
                  ${meetLink ? `<p style="margin:0;"><strong>🎥 Google Meet:</strong> <a href="${meetLink}" style="color:#ff3300;">${meetLink}</a></p>` : `<p style="margin:0;color:#666;">We will send your meeting link shortly.</p>`}
                </div>
                <p style="color:#888;font-size:13px;">Questions? Reply to this email or visit <a href="https://mintmediahouse.in" style="color:#ff3300;">mintmediahouse.in</a></p>
                <p style="color:#999;font-size:12px;">— The Mint Media House Team</p>
              </div>
            </div>
          </body>`,
      });
    }

    return NextResponse.json({ success: true, meetLink }, { status: 200 });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error("[Book API] Error:", msg);
    return NextResponse.json({ error: "Booking failed. Please try again.", success: false }, { status: 500 });
  }
}
