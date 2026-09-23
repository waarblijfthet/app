import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Bescherm alle /admin routes behalve /admin/login
  if (
    request.nextUrl.pathname.startsWith("/admin") &&
    !request.nextUrl.pathname.startsWith("/admin/login") &&
    !user
  ) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  // Al ingelogd op /admin/login → redirect naar /admin
  if (request.nextUrl.pathname === "/admin/login" && user) {
    return NextResponse.redirect(new URL("/admin/vandaag", request.url));
  }

  return supabaseResponse;
}

/**
 * Alleen de /admin-pagina's, niet /api/admin (23-sep-2026). Elke API-route
 * onder /api/admin controleert zelf isAdminRequest(), en een redirect naar de
 * loginpagina is voor een fetch sowieso geen bruikbaar antwoord. Door ze hier
 * over te slaan scheelt elke admin-API-aanroep een extra rondje naar Supabase
 * Auth; op het Vandaag-dashboard waren dat er per lading vier achter elkaar
 * (middleware en layout voor de pagina, middleware en route voor de data).
 */
export const config = {
  matcher: ["/admin/:path*"],
};
