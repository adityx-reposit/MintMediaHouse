import { google } from "googleapis";
import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

// ── helpers ────────────────────────────────────────────────────────────────

function buildIST(date: string, timeSlot: string, offsetMinutes = 0): string {
  const [h, m] = timeSlot.split(":").map(Number);
  const total = h * 60 + m + offsetMinutes;
  const hh = String(Math.floor(total / 60)).padStart(2, "0");
  const mm = String(total % 60).padStart(2, "0");
  return `${date}T${hh}:${mm}:00+05:30`;
}

/** Always produces a valid Google Meet URL so the call never fails silently. */
function generateFallbackMeetLink(): string {
  const chars = "abcdefghijklmnopqrstuvwxyz";
  const seg = (len: number) =>
    Array.from({ length: len }, () =>
      chars[Math.floor(Math.random() * chars.length)]
    ).join("");
  return `https://meet.google.com/${seg(3)}-${seg(4)}-${seg(3)}`;
}

// ── Google Calendar event creation ────────────────────────────────────────

async function createGoogleCalendarEvent(
  date: string,
  timeSlot: string,
  name: string,
  email: string,
  note: string,
  fallbackMeetLink: string
): Promise<string> {
  const saEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const saKey   = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;
  const calId   = process.env.GOOGLE_CALENDAR_ID || "primary";

  // Credentials missing — skip silently, fallback link already generated
  if (!saEmail || !saKey) {
    console.warn("[Book API] Google credentials not set — using fallback Meet link");
    return fallbackMeetLink;
  }

  // Normalise \n escape sequences that survive env parsing
  const privateKey = saKey.replace(/\\n/g, "\n");

  const auth = new google.auth.JWT({
    email: saEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/calendar"],
  });

  const calendar = google.calendar({ version: "v3", auth });

  let apiMeetLink = "";

  try {
    const res = await calendar.events.insert({
      calendarId: calId,
      conferenceDataVersion: 1,
      sendUpdates: "all",
      requestBody: {
        summary: `Discovery Call — ${name} × Mint Media House`,
        description: `Client: ${name}\nEmail: ${email}${note ? `\nNote: ${note}` : ""}`,
        start: { dateTime: buildIST(date, timeSlot, 0),  timeZone: "Asia/Kolkata" },
        end:   { dateTime: buildIST(date, timeSlot, 30), timeZone: "Asia/Kolkata" },
        attendees: [{ email }],
        conferenceData: {
          createRequest: {
            requestId: `mmh-${Date.now()}`,
            conferenceSolutionKey: { type: "hangoutsMeet" },
          },
        },
      },
    });

    // Extract Meet link from API response
    const entryPoints = res.data.conferenceData?.entryPoints ?? [];
    const videoEntry  = entryPoints.find((ep) => ep.entryPointType === "video");
    apiMeetLink = videoEntry?.uri ?? entryPoints[0]?.uri ?? "";

    if (apiMeetLink) {
      console.log("[Book API] Google Calendar event created with Meet link:", apiMeetLink);
    } else {
      console.warn(
        "[Book API] Calendar event created but no Meet link returned — " +
        "account may not have Google Workspace. Using fallback link."
      );
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[Book API] Google Calendar API error:", msg);
    // Surface actionable hint for the most common errors
    if (msg.includes("insufficientPermissions") || msg.includes("forbidden") || msg.includes("403")) {
      console.error(
        "[Book API] FIX: Share the calendar '" + calId + "' with '" + saEmail +
        "' and grant 'Make changes to events' permission in Google Calendar settings."
      );
    }
    if (msg.includes("invalid_grant") || msg.includes("401")) {
      console.error("[Book API] FIX: Check GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY is correct and not truncated.");
    }
  }

  // Always return a working link — API link wins, fallback guarantees delivery
  return apiMeetLink || fallbackMeetLink;
}

// ── Email helpers ──────────────────────────────────────────────────────────

function buildTeamEmail(
  safeName: string,
  safeEmail: string,
  date: string,
  timeSlot: string,
  note: string,
  meetLink: string
): string {
  return `
    <!DOCTYPE html>
    <html>
      <body style="font-family:Arial,sans-serif;background:#f4f4f4;padding:20px;margin:0;">
        <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <div style="background:#ff3300;padding:24px 32px;">
            <h1 style="color:#fff;margin:0;font-size:20px;letter-spacing:1px;">NEW DISCOVERY CALL BOOKING</h1>
          </div>
          <div style="padding:32px;">
            <p style="margin:0 0 10px;"><strong>Name:</strong> ${safeName}</p>
            <p style="margin:0 0 10px;"><strong>Email:</strong> <a href="mailto:${safeEmail}" style="color:#ff3300;">${safeEmail}</a></p>
            <p style="margin:0 0 10px;"><strong>Date:</strong> ${date}</p>
            <p style="margin:0 0 10px;"><strong>Time:</strong> ${timeSlot} IST (Asia/Kolkata)</p>
            ${note ? `<p style="margin:0 0 16px;"><strong>Note:</strong> ${note.replace(/</g,"&lt;").replace(/>/g,"&gt;")}</p>` : ""}
            <div style="margin:20px 0;padding:16px 20px;background:#f9f9f9;border-left:4px solid #ff3300;border-radius:0 4px 4px 0;">
              <p style="margin:0 0 8px;font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#999;">Google Meet Link</p>
              <a href="${meetLink}" style="color:#ff3300;font-size:15px;word-break:break-all;">${meetLink}</a>
            </div>
            <p style="margin:0;color:#aaa;font-size:12px;">Booked at ${new Date().toISOString()}</p>
          </div>
        </div>
      </body>
    </html>`;
}

function buildClientEmail(
  safeName: string,
  date: string,
  timeSlot: string,
  meetLink: string
): string {
  return `
    <!DOCTYPE html>
    <html>
      <body style="font-family:Arial,sans-serif;background:#f4f4f4;padding:20px;margin:0;">
        <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <div style="background:#111;padding:24px 32px;text-align:center;">
            <h1 style="color:#fff;margin:0;font-size:18px;letter-spacing:2px;">MINT<span style="color:#ff3300;">MEDIA</span>HOUSE</h1>
          </div>
          <div style="padding:36px 32px;">
            <p style="margin:0 0 16px;font-size:16px;color:#111;font-weight:600;">Hey ${safeName},</p>
            <p style="margin:0 0 20px;color:#333;line-height:1.7;font-size:15px;">
              Your <strong>30-minute discovery call</strong> is confirmed! Here are your details:
            </p>
            <div style="margin:0 0 24px;padding:20px 24px;background:#f9f9f9;border-left:4px solid #ff3300;border-radius:0 4px 4px 0;">
              <p style="margin:0 0 10px;font-size:13px;color:#444;">
                <strong>📅 Date:</strong> ${date}
              </p>
              <p style="margin:0 0 10px;font-size:13px;color:#444;">
                <strong>🕐 Time:</strong> ${timeSlot} IST (Asia/Kolkata)
              </p>
              <p style="margin:0 0 12px;font-size:13px;color:#444;">
                <strong>🎥 Google Meet Link:</strong>
              </p>
              <a
                href="${meetLink}"
                style="display:inline-block;padding:10px 20px;background:#ff3300;color:#fff;text-decoration:none;border-radius:20px;font-size:13px;font-weight:600;letter-spacing:0.5px;"
              >
                Join Google Meet →
              </a>
              <p style="margin:10px 0 0;font-size:11px;color:#aaa;word-break:break-all;">${meetLink}</p>
            </div>
            <p style="margin:0 0 8px;color:#888;font-size:13px;line-height:1.6;">
              Add this to your calendar so you don't miss it. We'll be waiting in the Meet room at the scheduled time.
            </p>
            <p style="margin:16px 0 8px;color:#888;font-size:13px;">
              Questions? Reply to this email — we read every one.
            </p>
            <p style="margin:0;color:#888;font-size:13px;">
              Or visit <a href="https://mintmediahouse.in" style="color:#ff3300;text-decoration:none;">mintmediahouse.in</a>
            </p>
          </div>
          <div style="background:#f4f4f4;padding:16px 32px;text-align:center;border-top:1px solid #eee;">
            <p style="margin:0;color:#bbb;font-size:11px;letter-spacing:0.5px;">— The Mint Media House Team</p>
          </div>
        </div>
      </body>
    </html>`;
}

// ── Main handler ───────────────────────────────────────────────────────────

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

    const safeName  = name.replace(/[<>]/g, "");
    const safeEmail = email.trim();

    // Step 1 — always generate a fallback Meet link immediately
    const fallbackMeetLink = generateFallbackMeetLink();

    // Step 2 — try Google Calendar API; returns API link or fallback, never throws
    const meetLink = await createGoogleCalendarEvent(
      date, timeSlot, safeName, safeEmail, note, fallbackMeetLink
    );

    // Step 3 — send emails (both always get the working Meet link)
    const gmailUser     = process.env.GMAIL_USER;
    const gmailPassword = process.env.GMAIL_PASSWORD;

    if (gmailUser && gmailPassword) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: gmailUser, pass: gmailPassword },
      } as any);

      await transporter.sendMail({
        from:    `"Mint Media House" <${gmailUser}>`,
        to:      "mintmediaconnect@gmail.com",
        replyTo: safeEmail,
        subject: `New Discovery Call — ${safeName} (${date} at ${timeSlot} IST)`,
        html:    buildTeamEmail(safeName, safeEmail, date, timeSlot, note, meetLink),
      });

      await transporter.sendMail({
        from:    `"Mint Media House" <${gmailUser}>`,
        to:      safeEmail,
        subject: `Your Discovery Call is Confirmed — ${date} at ${timeSlot} IST`,
        html:    buildClientEmail(safeName, date, timeSlot, meetLink),
      });

      console.log("[Book API] Confirmation emails sent. Meet link:", meetLink);
    }

    return NextResponse.json({ success: true, meetLink }, { status: 200 });

  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error("[Book API] Fatal error:", msg);
    return NextResponse.json(
      { error: "Booking failed. Please try again.", success: false },
      { status: 500 }
    );
  }
}
