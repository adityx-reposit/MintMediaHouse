/**
 * One-time script to get your Google OAuth2 refresh token.
 * Run: node scripts/get-google-token.mjs
 *
 * Prerequisites:
 *  1. Go to console.cloud.google.com → APIs & Services → Credentials
 *  2. Click "+ Create Credentials" → OAuth 2.0 Client ID
 *  3. Application type: Web application
 *  4. Under "Authorised redirect URIs" add: http://localhost:3001/callback
 *  5. Click Create — copy Client ID and Client Secret
 *  6. Set them below or pass as env vars before running this script
 */

import { google } from "googleapis";
import http from "http";
import { URL } from "url";

const CLIENT_ID     = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI  = "http://localhost:3001/callback";

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error(
    "\n❌  Missing credentials.\n" +
    "Run like this:\n\n" +
    "  GOOGLE_CLIENT_ID=xxx GOOGLE_CLIENT_SECRET=yyy node scripts/get-google-token.mjs\n"
  );
  process.exit(1);
}

const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

const authUrl = oauth2Client.generateAuthUrl({
  access_type: "offline",
  prompt: "consent",          // forces refresh_token to be returned every time
  scope: ["https://www.googleapis.com/auth/calendar"],
});

console.log("\n──────────────────────────────────────────────────");
console.log("  Open this URL in your browser and sign in with");
console.log("  the Google account that owns the calendar:");
console.log("──────────────────────────────────────────────────");
console.log("\n" + authUrl + "\n");
console.log("Waiting for Google to redirect back...\n");

const server = http.createServer(async (req, res) => {
  try {
    const url  = new URL(req.url, "http://localhost:3001");
    const code = url.searchParams.get("code");

    if (!code) {
      res.end("No code found. Please try again.");
      return;
    }

    const { tokens } = await oauth2Client.getToken(code);

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h2>✅ Token obtained! Close this tab and check your terminal.</h2>");

    console.log("──────────────────────────────────────────────────");
    console.log("✅  SUCCESS — add these to your .env.local:\n");
    console.log(`GOOGLE_CLIENT_ID=${CLIENT_ID}`);
    console.log(`GOOGLE_CLIENT_SECRET=${CLIENT_SECRET}`);
    console.log(`GOOGLE_REFRESH_TOKEN=${tokens.refresh_token}`);
    console.log("──────────────────────────────────────────────────\n");

    server.close();
    process.exit(0);
  } catch (err) {
    console.error("❌  Error getting token:", err.message);
    res.end("Error: " + err.message);
    server.close();
    process.exit(1);
  }
});

server.listen(3001, () => {
  console.log("Local callback server listening on http://localhost:3001");
});
