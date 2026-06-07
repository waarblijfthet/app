import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Controleert of de inkomende request afkomstig is van een ingelogde admin.
 * Gebruik in API routes die alleen door de admin mogen worden aangeroepen.
 * Geeft `true` terug als de gebruiker ingelogd is via Supabase auth.
 */
export async function isAdminRequest(): Promise<boolean> {
  try {
    const cookieStore = await cookies();

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll() {
            // read-only in Route Handlers
          },
        },
      }
    );

    const {
      data: { user },
    } = await supabase.auth.getUser();

    return !!user;
  } catch {
    return false;
  }
}
