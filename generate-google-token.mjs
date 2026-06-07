import { google } from "googleapis";
import * as readline from "readline";

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error("Zet GOOGLE_CLIENT_ID en GOOGLE_CLIENT_SECRET als omgevingsvariabelen.");
  process.exit(1);
}

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  "urn:ietf:wg:oauth:2.0:oob" // out-of-band redirect — geen redirect URL nodig
);

const SCOPES = [
  "https://www.googleapis.com/auth/indexing",
  "https://www.googleapis.com/auth/webmasters.readonly",
];

const authUrl = oauth2Client.generateAuthUrl({
  access_type: "offline",
  scope: SCOPES,
  prompt: "consent",
});

console.log("\n=== Google OAuth2 Token Generator ===\n");
console.log("1. Open deze URL in je browser:\n");
console.log(authUrl);
console.log("\n2. Log in en geef toestemming.");
console.log("3. Kopieer de code die je krijgt en plak hem hieronder.\n");

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

rl.question("Voer de autorisatiecode in: ", async (code) => {
  rl.close();
  try {
    const { tokens } = await oauth2Client.getToken(code.trim());
    console.log("\n=== Tokens ===");
    console.log("Access token :", tokens.access_token);
    console.log("Refresh token:", tokens.refresh_token);
    console.log("\nVoeg toe aan .env.local en Vercel:");
    console.log(`GOOGLE_REFRESH_TOKEN=${tokens.refresh_token}`);
  } catch (err) {
    console.error("Fout bij ophalen token:", err.message);
  }
});
