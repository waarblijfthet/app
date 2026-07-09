"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";
import Link from "next/link";

interface Props {
  email: string;
}

export default function AdminNav({ email }: Props) {
  const router = useRouter();

  async function uitloggen() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <nav className="bg-primary h-14 flex items-center px-6 gap-4 sticky top-0 z-40">
      <Link href="/admin" className="flex items-center gap-2.5 flex-1">
        <span className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center text-white font-display font-medium text-xs">
          wb
        </span>
        <span className="font-display font-light text-white/90 text-base tracking-tight">
          Beheer
        </span>
      </Link>

      <div className="flex items-center gap-4">
        <span className="text-white/50 font-body text-xs hidden sm:block">
          {email}
        </span>
        <button
          onClick={uitloggen}
          className="text-xs font-body font-medium px-3 py-1.5 rounded-lg bg-accent text-white hover:bg-[#0A6A5F] transition-colors"
        >
          Uitloggen
        </button>
      </div>
    </nav>
  );
}
