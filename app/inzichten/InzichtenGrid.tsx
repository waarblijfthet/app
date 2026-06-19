"use client";

import { useState } from "react";
import Link from "next/link";
import type { Artikel } from "@/lib/inzichten-data";
import { ArticlePreview } from "@/components/artikel/ArticlePreview";

const categorieKleuren: Record<string, { bg: string; tekst: string }> = {
  Besparen: { bg: "#E8F2EC", tekst: "#2D6A4F" },
  Inkomen: { bg: "#FAF0EB", tekst: "#92600A" },
  Sparen: { bg: "#EDE6D8", tekst: "#4A5E4E" },
  Inzicht: { bg: "#E8F2FA", tekst: "#1B5E8A" },
};

function getCategorieKleur(cat: string) {
  return categorieKleuren[cat] ?? { bg: "#EDE6D8", tekst: "#4A5E4E" };
}

function ArtikelKaart({
  artikel,
  featured = false,
}: {
  artikel: Artikel;
  featured?: boolean;
}) {
  const kleur = getCategorieKleur(artikel.categorie);
  // Minder hoog op mobiel voor de featured card: 160px ipv 208px
  const previewH = featured ? "h-40 md:h-56" : "h-32 md:h-40";

  return (
    <Link href={`/inzichten/${artikel.slug}`} className="group block h-full">
      <article className="bg-[#FDFAF4] rounded-2xl overflow-hidden border border-[#E8E0D4] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col h-full min-h-[120px]">
        {/* Preview */}
        <div
          className={`${previewH} bg-[#F5F0E8] border-b border-[#E8E0D4] relative overflow-hidden flex-shrink-0`}
        >
          <ArticlePreview preview={artikel.preview} />
          {/* Categorie badge */}
          <div className="absolute top-3 right-3">
            <span
              className="text-[10px] font-medium uppercase tracking-wider px-2 py-1 rounded-full"
              style={{ backgroundColor: kleur.bg, color: kleur.tekst }}
            >
              {artikel.categorie}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          {/* Meta */}
          <div className="flex items-center gap-2 text-[11px] text-[#8A9E8E] mb-3">
            <span>{artikel.datumFormatted}</span>
            <span>·</span>
            <span>{artikel.leestijd} min</span>
          </div>

          {/* Titel */}
          <h2
            className={`font-display font-light text-[#1C3A2A] leading-snug mb-2 flex-1 group-hover:text-[#C4603A] transition-colors ${
              featured ? "text-xl md:text-2xl" : "text-lg"
            }`}
          >
            {artikel.korteTitel || artikel.titel}
          </h2>

          {/* Excerpt */}
          <p className="text-sm text-[#4A5E4E] leading-relaxed mb-4 line-clamp-3">
            {artikel.excerpt}
          </p>

          {/* Lees verder */}
          <div className="mt-auto">
            <span className="text-sm font-medium text-[#C4603A] flex items-center gap-1.5">
              Lees verder
              <span aria-hidden="true">&#8594;</span>
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

const filters = ["Alles", "Besparen", "Inkomen", "Sparen", "Inzicht"];

export function InzichtenGrid({ artikelen }: { artikelen: Artikel[] }) {
  const [actief, setActief] = useState("Alles");

  const gefilterd = (
    actief === "Alles"
      ? artikelen
      : artikelen.filter((a) => a.categorie === actief)
  )
    .slice()
    .sort((a, b) => b.datum.localeCompare(a.datum));

  // Aantal per categorie voor de filterlabels
  const aantalPerCategorie: Record<string, number> = { Alles: artikelen.length };
  for (const f of filters.slice(1)) {
    aantalPerCategorie[f] = artikelen.filter((a) => a.categorie === f).length;
  }

  const featured = gefilterd[0];
  const rest = gefilterd.slice(1);

  return (
    <div>
      {/*
        Categorie filter, mobiel verbeteringen:
        - scrollbar-hide: scrollbaar maar geen zichtbare native scrollbar
        - Fade-gradient rechts als scroll-hint op mobiel
        - Touch targets: py-2.5 voor bredere tapzone
        - Artikeltelling per categorie
      */}
      <div className="relative mb-8 -mx-6 md:mx-0">
        {/* Scroll-hint: fade rechts, alleen mobiel */}
        <div
          className="absolute right-0 top-0 bottom-0 w-10 z-10 pointer-events-none md:hidden"
          style={{ background: "linear-gradient(to left, #FDFAF4, transparent)" }}
        />
        <div className="overflow-x-auto scrollbar-hide px-6 md:px-0">
          <div className="flex gap-2 flex-nowrap md:flex-wrap min-w-max md:min-w-0 pb-px">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActief(f)}
                className="text-xs font-medium px-4 py-2.5 rounded-full border transition-all whitespace-nowrap"
                style={
                  actief === f
                    ? {
                        backgroundColor: "#1C3A2A",
                        color: "#F5F0E8",
                        borderColor: "#1C3A2A",
                      }
                    : {
                        backgroundColor: "transparent",
                        color: "#8A9E8E",
                        borderColor: "#E8E0D4",
                      }
                }
              >
                {f}
                <span
                  className="ml-1.5 text-[10px]"
                  style={{ opacity: actief === f ? 0.6 : 0.45 }}
                >
                  {aantalPerCategorie[f]}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {gefilterd.length === 0 && (
        <p className="text-[#8A9E8E] text-sm">
          Geen artikelen in deze categorie.
        </p>
      )}

      {/* Featured artikel */}
      {featured && (
        <div className="mb-6">
          <ArtikelKaart artikel={featured} featured />
        </div>
      )}

      {/* Rest grid */}
      {rest.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {rest.map((artikel) => (
            <ArtikelKaart key={artikel.slug} artikel={artikel} />
          ))}
        </div>
      )}
    </div>
  );
}
