import { createClient } from "@supabase/supabase-js";

/**
 * Supabase client met service role key — bypassed RLS.
 * Alleen gebruiken in server-side API routes, nooit client-side.
 */
export function createServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL of SUPABASE_SERVICE_ROLE_KEY is niet ingesteld"
    );
  }

  return createClient(url, key, {
    auth: { persistSession: false },
  });
}
