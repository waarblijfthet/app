import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-[#E8E0D0]">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link href="/" className="font-display font-light text-primary text-base tracking-tight">
          Waar blijft het
        </Link>
        <p className="text-text-muted font-body text-sm">
          &copy; 2026 waarblijfthet.nl
        </p>
      </div>
    </footer>
  );
}
