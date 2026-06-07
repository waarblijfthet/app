import { GoogleAuth } from "google-auth-library";

let _auth: GoogleAuth | null = null;

function getAuth(): GoogleAuth {
  if (_auth) return _auth;

  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!raw) {
    throw new Error("GOOGLE_SERVICE_ACCOUNT_JSON is niet ingesteld");
  }

  const credentials = JSON.parse(raw) as Record<string, unknown>;

  _auth = new GoogleAuth({
    credentials,
    scopes: [
      "https://www.googleapis.com/auth/indexing",
      "https://www.googleapis.com/auth/webmasters.readonly",
    ],
  });

  return _auth;
}

export async function getGoogleAuthToken(): Promise<string> {
  const auth = getAuth();
  const client = await auth.getClient();
  const tokenResponse = await client.getAccessToken();
  if (!tokenResponse.token) {
    throw new Error("Kon geen Google access token ophalen");
  }
  return tokenResponse.token;
}
