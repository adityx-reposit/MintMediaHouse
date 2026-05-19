import { google } from "googleapis";
import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

// ── Helpers ────────────────────────────────────────────────────────────────

function buildIST(date: string, time: string, offsetMinutes = 0): string {
  const [h, m] = time.split(":").map(Number);
  const total  = h * 60 + m + offsetMinutes;
  const hh     = String(Math.floor(total / 60)).padStart(2, "0");
  const mm     = String(total % 60).padStart(2, "0");
  return `${date}T${hh}:${mm}:00+05:30`;
}

function formatTime12h(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour   = h % 12 || 12;
  return `${hour}:${m.toString().padStart(2, "0")} ${period}`;
}

// ── OAuth2 Google Calendar + Meet ─────────────────────────────────────────

async function createCalendarEventWithMeet(
  date: string,
  time: string,
  name: string,
  email: string,
  note: string
): Promise<string> {
  const clientId     = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;
  const calId        = process.env.GOOGLE_CALENDAR_ID || "primary";

  if (!clientId || !clientSecret || !refreshToken) {
    console.error(
      "[Book API] OAuth2 credentials missing. " +
      "Set GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN in .env.local. " +
      "Run: node scripts/get-google-token.mjs"
    );
    throw new Error("Google Calendar not configured. Contact mintmediahouse.in to book.");
  }

  const oauth2Client = new google.auth.OAuth2(clientId, clientSecret);
  oauth2Client.setCredentials({ refresh_token: refreshToken });

  const calendar = google.calendar({ version: "v3", auth: oauth2Client });

  const res = await calendar.events.insert({
    calendarId: calId,
    conferenceDataVersion: 1,
    sendUpdates: "all",           // sends calendar invite to attendee
    requestBody: {
      summary:     `Discovery Call — ${name} × Mint Media House`,
      description: `Client: ${name}\nEmail: ${email}${note ? `\nNote: ${note}` : ""}`,
      start: { dateTime: buildIST(date, time, 0),  timeZone: "Asia/Kolkata" },
      end:   { dateTime: buildIST(date, time, 30), timeZone: "Asia/Kolkata" },
      attendees: [{ email }],
      reminders: {
        useDefault: false,
        overrides: [
          { method: "email",  minutes: 60 },
          { method: "popup",  minutes: 10 },
        ],
      },
      conferenceData: {
        createRequest: {
          requestId: `mmh-${Date.now()}`,
          conferenceSolutionKey: { type: "hangoutsMeet" },
        },
      },
    },
  });

  // Extract Meet link from response
  const entryPoints = res.data.conferenceData?.entryPoints ?? [];
  const videoEntry  = entryPoints.find((ep) => ep.entryPointType === "video");
  const meetLink    = videoEntry?.uri ?? entryPoints[0]?.uri ?? "";

  if (!meetLink) {
    throw new Error("Calendar event created but Meet link missing in API response.");
  }

  console.log("[Book API] ✅ Event created. Meet link:", meetLink, "| Event ID:", res.data.id);
  return meetLink;
}

// ── Emails ─────────────────────────────────────────────────────────────────

function teamEmail(
  name: string, email: string, date: string,
  time: string, note: string, meetLink: string
): string {
  return `<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;background:#f4f4f4;padding:20px;margin:0;">
  <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
    <div style="background:#ff3300;padding:24px 32px;">
      <h1 style="color:#fff;margin:0;font-size:20px;letter-spacing:1px;">NEW DISCOVERY CALL BOOKING</h1>
    </div>
    <div style="padding:32px;">
      <p style="margin:0 0 10px;"><strong>Name:</strong> ${name}</p>
      <p style="margin:0 0 10px;"><strong>Email:</strong> <a href="mailto:${email}" style="color:#ff3300;">${email}</a></p>
      <p style="margin:0 0 10px;"><strong>Date:</strong> ${date}</p>
      <p style="margin:0 0 16px;"><strong>Time:</strong> ${formatTime12h(time)} IST (${time})</p>
      ${note ? `<p style="margin:0 0 16px;"><strong>Note:</strong> ${note.replace(/</g,"&lt;").replace(/>/g,"&gt;")}</p>` : ""}
      <div style="padding:16px 20px;background:#f9f9f9;border-left:4px solid #ff3300;border-radius:0 4px 4px 0;">
        <p style="margin:0 0 8px;font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#999;">Google Meet</p>
        <a href="${meetLink}" style="color:#ff3300;word-break:break-all;font-size:14px;">${meetLink}</a>
      </div>
      <p style="margin:16px 0 0;color:#aaa;font-size:12px;">Booked at ${new Date().toISOString()}</p>
    </div>
  </div>
</body></html>`;
}

function clientEmail(
  name: string, date: string, time: string, meetLink: string
): string {
  return `<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;background:#f4f4f4;padding:20px;margin:0;">
  <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
    <div style="background:#111;padding:24px 32px;text-align:center;">
      <h1 style="color:#fff;margin:0;font-size:18px;letter-spacing:2px;">MINT<span style="color:#ff3300;">MEDIA</span>HOUSE</h1>
    </div>
    <div style="padding:36px 32px;">
      <p style="margin:0 0 16px;font-size:16px;color:#111;font-weight:600;">Hey ${name},</p>
      <p style="margin:0 0 20px;color:#333;line-height:1.7;font-size:15px;">Your <strong>30-minute discovery call</strong> is confirmed! Here are your details:</p>
      <div style="margin:0 0 24px;padding:20px 24px;background:#f9f9f9;border-left:4px solid #ff3300;border-radius:0 4px 4px 0;">
        <p style="margin:0 0 10px;font-size:13px;color:#444;"><strong>📅 Date:</strong> ${date}</p>
        <p style="margin:0 0 16px;font-size:13px;color:#444;"><strong>🕐 Time:</strong> ${formatTime12h(time)} IST</p>
        <p style="margin:0 0 10px;font-size:13px;color:#444;"><strong>🎥 Google Meet:</strong></p>
        <a href="${meetLink}" style="display:inline-block;padding:10px 22px;background:#ff3300;color:#fff;text-decoration:none;border-radius:20px;font-size:13px;font-weight:600;">Join Google Meet →</a>
        <p style="margin:10px 0 0;font-size:11px;color:#aaa;word-break:break-all;">${meetLink}</p>
      </div>
      <p style="margin:0 0 8px;color:#888;font-size:13px;">You should also receive a Google Calendar invite — check your inbox and accept it so the call appears in your calendar.</p>
      <p style="margin:12px 0 0;color:#888;font-size:13px;">Questions? Reply to this email or visit <a href="https://mintmediahouse.in" style="color:#ff3300;text-decoration:none;">mintmediahouse.in</a></p>
    </div>
    <div style="background:#f4f4f4;padding:16px 32px;text-align:center;border-top:1px solid #eee;">
      <p style="margin:0;color:#bbb;font-size:11px;letter-spacing:0.5px;">— The Mint Media House Team</p>
    </div>
  </div>
</body></html>`;
}

// ── Handler ────────────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    const { date, time, name, email, note = "" } = await request.json();

    if (!date || !time || !name || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    const safeName  = name.replace(/[<>]/g, "");
    const safeEmail = email.trim();

    // Create Google Calendar event + Meet link (throws if config missing or API fails)
    let meetLink: string;
    try {
      meetLink = await createCalendarEventWithMeet(date, time, safeName, safeEmail, note);
    } catch (calErr) {
      const msg = calErr instanceof Error ? calErr.message : String(calErr);
      console.error("[Book API] Calendar error:", msg);
      return NextResponse.json({ error: msg, success: false }, { status: 500 });
    }

    // Send confirmation emails
    const gmailUser     = process.env.GMAIL_USER;
    const gmailPassword = process.env.GMAIL_PASSWORD;

    if (gmailUser && gmailPassword) {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: { user: gmailUser, pass: gmailPassword },
        } as any);

        await Promise.all([
          transporter.sendMail({
            from:    `"Mint Media House" <${gmailUser}>`,
            to:      "mintmediaconnect@gmail.com",
            replyTo: safeEmail,
            subject: `New Discovery Call — ${safeName} (${date} at ${formatTime12h(time)} IST)`,
            html:    teamEmail(safeName, safeEmail, date, time, note, meetLink),
          }),
          transporter.sendMail({
            from:    `"Mint Media House" <${gmailUser}>`,
            to:      safeEmail,
            subject: `Your Discovery Call is Confirmed — ${date} at ${formatTime12h(time)} IST`,
            html:    clientEmail(safeName, date, time, meetLink),
          }),
        ]);
        console.log("[Book API] ✅ Confirmation emails sent to team + client.");
      } catch (mailErr) {
        // Email failure is non-fatal — Meet link was already created
        console.error("[Book API] Email send failed (non-fatal):", mailErr);
      }
    }

    return NextResponse.json({ success: true, meetLink }, { status: 200 });

  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error("[Book API] Fatal error:", msg);
    return NextResponse.json({ error: "Booking failed. Please try again.", success: false }, { status: 500 });
  }
}
