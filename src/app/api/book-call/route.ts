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
      description: `30-minute Discovery Call with Mint Media House\n\nGuest: ${name}\nEmail: ${email}${note ? `\n\nNote from ${name}: ${note}` : ""}\n\n——\nmintmediahouse.in`,
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
      <table cellpadding="0" cellspacing="0" border="0" style="width:100%;"><tr>
        <td><img src="https://mintmediahouse.in/mint-logo.svg" alt="Mint Media" width="48" height="32" style="display:block;"/></td>
        <td align="right"><span style="color:#fff;font-size:13px;letter-spacing:2px;text-transform:uppercase;font-weight:700;">New Discovery Call</span></td>
      </tr></table>
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
  const firstName = name.split(" ")[0];
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Your Discovery Call is Confirmed</title></head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:'Helvetica Neue',Arial,sans-serif;">

  <!-- Outer wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#0a0a0a;padding:40px 16px;">
    <tr><td align="center">

      <!-- Card -->
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:580px;background:#111111;border-radius:12px;overflow:hidden;border:1px solid #1e1e1e;">

        <!-- ── Top accent bar ── -->
        <tr>
          <td style="background:linear-gradient(90deg,#ff3300 0%,#ff6600 100%);height:4px;font-size:0;line-height:0;">&nbsp;</td>
        </tr>

        <!-- ── Header ── -->
        <tr>
          <td style="padding:36px 40px 28px;border-bottom:1px solid #1e1e1e;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td>
                  <p style="margin:0;font-size:11px;letter-spacing:3px;color:#ff3300;text-transform:uppercase;font-weight:600;">// Confirmed</p>
                  <img src="https://mintmediahouse.in/mint-logo.svg" alt="Mint Media House" width="80" height="54" style="margin:10px 0 0;display:block;" />
                </td>
                <td align="right" valign="top">
                  <div style="width:48px;height:48px;background:#ff3300;border-radius:50%;text-align:center;line-height:48px;font-size:22px;">✓</div>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- ── Greeting ── -->
        <tr>
          <td style="padding:36px 40px 0;">
            <p style="margin:0 0 8px;font-size:22px;font-weight:700;color:#ffffff;">Hey ${firstName},</p>
            <p style="margin:0;font-size:15px;color:#888888;line-height:1.7;">Your <span style="color:#ffffff;font-weight:600;">30-minute Discovery Call</span> with Mint Media House is locked in. Here's everything you need.</p>
          </td>
        </tr>

        <!-- ── Details card ── -->
        <tr>
          <td style="padding:28px 40px 0;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#1a1a1a;border-radius:10px;border:1px solid #2a2a2a;overflow:hidden;">
              <tr>
                <td style="padding:24px 28px;">

                  <!-- Date row -->
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:16px;">
                    <tr>
                      <td width="32" valign="top">
                        <div style="width:32px;height:32px;background:#ff330015;border:1px solid #ff330040;border-radius:8px;text-align:center;line-height:32px;font-size:14px;">📅</div>
                      </td>
                      <td style="padding-left:12px;">
                        <p style="margin:0;font-size:11px;text-transform:uppercase;letter-spacing:2px;color:#555;font-weight:600;">Date</p>
                        <p style="margin:4px 0 0;font-size:15px;color:#ffffff;font-weight:600;">${date}</p>
                      </td>
                    </tr>
                  </table>

                  <!-- Time row -->
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:16px;padding-bottom:16px;border-bottom:1px solid #2a2a2a;">
                    <tr>
                      <td width="32" valign="top">
                        <div style="width:32px;height:32px;background:#ff330015;border:1px solid #ff330040;border-radius:8px;text-align:center;line-height:32px;font-size:14px;">🕐</div>
                      </td>
                      <td style="padding-left:12px;">
                        <p style="margin:0;font-size:11px;text-transform:uppercase;letter-spacing:2px;color:#555;font-weight:600;">Time</p>
                        <p style="margin:4px 0 0;font-size:15px;color:#ffffff;font-weight:600;">${formatTime12h(time)} <span style="color:#555;font-weight:400;font-size:13px;">India Standard Time</span></p>
                      </td>
                    </tr>
                  </table>

                  <!-- Meet link -->
                  <p style="margin:0 0 12px;font-size:11px;text-transform:uppercase;letter-spacing:2px;color:#555;font-weight:600;">Google Meet Link</p>
                  <a href="${meetLink}" style="display:block;text-align:center;padding:14px 24px;background:linear-gradient(135deg,#ff3300,#ff6600);color:#ffffff;text-decoration:none;border-radius:8px;font-size:15px;font-weight:700;letter-spacing:0.3px;">
                    Join Google Meet &nbsp;→
                  </a>
                  <p style="margin:10px 0 0;font-size:11px;color:#444;text-align:center;word-break:break-all;">${meetLink}</p>

                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- ── What to expect ── -->
        <tr>
          <td style="padding:28px 40px 0;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#161616;border-radius:10px;border:1px solid #1e1e1e;">
              <tr>
                <td style="padding:20px 24px;">
                  <p style="margin:0 0 14px;font-size:11px;text-transform:uppercase;letter-spacing:2px;color:#ff3300;font-weight:600;">What to expect</p>
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td style="padding:4px 0;font-size:13px;color:#888;">
                        <span style="color:#ff3300;margin-right:8px;">—</span>We'll learn about your brand and content goals
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:4px 0;font-size:13px;color:#888;">
                        <span style="color:#ff3300;margin-right:8px;">—</span>We'll show you what a custom content strategy looks like
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:4px 0;font-size:13px;color:#888;">
                        <span style="color:#ff3300;margin-right:8px;">—</span>No pressure, no sales pitch — just clarity
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- ── Calendar note ── -->
        <tr>
          <td style="padding:24px 40px 0;">
            <p style="margin:0;font-size:13px;color:#555;line-height:1.7;text-align:center;">
              A Google Calendar invite has been sent to your inbox — accept it so the call shows up in your calendar automatically.
            </p>
          </td>
        </tr>

        <!-- ── Footer ── -->
        <tr>
          <td style="padding:32px 40px 36px;margin-top:8px;border-top:1px solid #1e1e1e;margin-top:24px;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td>
                  <p style="margin:0 0 4px;font-size:13px;color:#555;">Questions? Just reply to this email.</p>
                  <a href="https://mintmediahouse.in" style="font-size:13px;color:#ff3300;text-decoration:none;font-weight:600;">mintmediahouse.in</a>
                </td>
                <td align="right">
                  <img src="https://mintmediahouse.in/mint-logo.svg" alt="Mint Media" width="44" height="30" style="display:block;" />
                </td>
              </tr>
            </table>
          </td>
        </tr>

      </table>
      <!-- /Card -->

      <!-- Bottom note -->
      <p style="margin:20px 0 0;font-size:11px;color:#333;text-align:center;">This confirmation was sent from mintmediahouse.in</p>

    </td></tr>
  </table>

</body>
</html>`;
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
