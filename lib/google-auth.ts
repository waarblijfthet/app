import { OAuth2Client } from "google-auth-library";

let _client: OAuth2Client | null = null;

function getClient(): OAuth2Client {
  if (_client) return _client;

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error(
      "GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET of GOOGLE_REFRESH_TOKEN is niet ingesteld"
    );
  }

  _client = new OAuth2Client(clientId, clientSecret);
  _client.setCredentials({ refresh_token: refreshToken });
  return _client;
}

export async function getGoogleAuthToken(): Promise<string> {
  const client = getClient();
  const { token } = await client.getAccessToken();
  if (!token) throw new Error("Kon geen Google access token ophalen");
  return token;
}
