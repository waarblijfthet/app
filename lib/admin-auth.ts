import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Controleert of een e-mailadres op de admin-allowlist staat.
 * ADMIN_EMAILS is een kommagescheiden lijst in de omgevingsvariabelen.
 * Staat de variabele leeg of ontbreekt hij, dan valt dit terug op het oude
 * gedrag (elke ingelogde gebruiker is admin), zodat de admin niet op slot
 * gaat zolang de variabele nog niet in Vercel staat.
 */
export function isEmailAllowed(email: string | null | undefined): boolean {
  const lijst = process.env.ADMIN_EMAILS?.trim();
  if (!lijst) return true;
  if (!email) return false;
  const toegestaan = lijst
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  return toegestaan.includes(email.toLowerCase());
}

/**
 * Controleert of de inkomende request afkomstig is van een ingelogde admin
 * die ook op de allowlist staat (zie isEmailAllowed).
 * Gebruik in API routes die alleen door de admin mogen worden aangeroepen.
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

    if (!user) return false;
    return isEmailAllowed(user.email);
  } catch {
    return false;
  }
}
