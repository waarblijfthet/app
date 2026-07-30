"use client";

import { useEffect, useState } from "react";

interface TeDoen {
  gereageerd: number;
  followupRijp: number;
  mailsTeVersturen: number;
  aanvragenZonderRapport: { aantal: number; oudsteDagen: number | null };
  prospectsTeReviewen: number;
  contactenActieRijp: number;
}

interface WeekBudget {
  verstuurd: number;
  budget: number;
  resterend: number;
}

interface WeekTelling {
  mailsVerstuurd: number;
  geopend: number;
  replies: number;
  analysesVoltooid: number;
  scanAanmeldingen: number;
  scansGeleverd: number;
}

interface DoelgroepReplies {
  doelgroep: string;
  label: string;
  verstuurd: number;
  geopend: number;
  gereageerd: number;
  percentage: number | null;
}

interface Trechter {
  bezoekers: number;
  gestart: number;
  voltooid: number;
  leads: number;
  aanmeldingen: number;
  betaald: number;
}

interface ActiviteitItem {
  type: string;
  tekst: string;
  tijd: string;
}

interface VandaagData {
  teDoen: TeDoen;
  weekbudget: WeekBudget;
  week: { dezeWeek: WeekTelling; vorigeWeek: WeekTelling };
  repliesPerDoelgroep: DoelgroepReplies[];
  trechter: Trechter;
  activiteit: ActiviteitItem[];
}

function relatieveTijd(iso: string): string {
  const dagen = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
  if (dagen <= 0) return "Vandaag";
  if (dagen === 1) return "Gisteren";
  return `${dagen} dagen geleden`;
}

const WEEK_RIJEN: { key: keyof WeekTelling; label: string }[] = [
  { key: "mailsVerstuurd", label: "Mails verstuurd" },
  { key: "geopend", label: "Geopend" },
  { key: "replies", label: "Replies" },
  { key: "analysesVoltooid", label: "Analyses voltooid" },
  { key: "scanAanmeldingen", label: "Scan-aanmeldingen" },
  { key: "scansGeleverd", label: "Scans geleverd" },
];

/**
 * Vandaag-dashboard: vervangt de oude Funnel-tab. Zes blokken, allemaal
 * gevoed door één aggregatieroute (/api/admin/vandaag), zie
 * docs/admin-redesign-30-jul-2026.md sectie 6.
 */
export default function VandaagDashboard() {
  const [data, setData] = useState<VandaagData | null>(null);
  const [laden, setLaden] = useState(true);
  const [fout, setFout] = useState<string | null>(null);

  useEffect(() => {
    let actief = true;
    async function laad() {
      setLaden(true);
      try {
        const res = await fetch("/api/admin/vandaag");
        const json = await res.json();
        if (!res.ok) throw new Error(json?.error ?? "Kon het dashboard niet laden.");
        if (actief) setData(json);
      } catch (e) {
        if (actief) setFout(e instanceof Error ? e.message : "Kon het dashboard niet laden.");
      } finally {
        if (actief) setLaden(false);
      }
    }
    laad();
    return () => {
      actief = false;
    };
  }, []);

  if (laden) return <p className="text-text-muted text-sm">Dashboard laden...</p>;
  if (fout) return <div className="bg-danger-bg text-danger text-sm rounded-md px-4 py-3">{fout}</div>;
  if (!data) return null;

  const { teDoen, weekbudget, week, repliesPerDoelgroep, trechter, activiteit } = data;

  const teDoenRijen: { aantal: number; tekst: string; href: string }[] = [];
  if (teDoen.gereageerd > 0) {
    teDoenRijen.push({
      aantal: teDoen.gereageerd,
      tekst: `contact${teDoen.gereageerd === 1 ? "" : "en"} gemarkeerd als gereageerd, nog niet afgehandeld`,
      href: "/admin/outreach",
    });
  }
  if (teDoen.followupRijp > 0) {
    teDoenRijen.push({
      aantal: teDoen.followupRijp,
      tekst: `follow-up${teDoen.followupRijp === 1 ? "" : "s"} rijp`,
      href: "/admin/outreach",
    });
  }
  if (teDoen.mailsTeVersturen > 0) {
    teDoenRijen.push({
      aantal: teDoen.mailsTeVersturen,
      tekst: `mail${teDoen.mailsTeVersturen === 1 ? "" : "s"} te versturen binnen het weekbudget`,
      href: "/admin/outreach",
    });
  }
  if (teDoen.aanvragenZonderRapport.aantal > 0) {
    const oudste = teDoen.aanvragenZonderRapport.oudsteDagen;
    teDoenRijen.push({
      aantal: teDoen.aanvragenZonderRapport.aantal,
      tekst: `aanvra${teDoen.aanvragenZonderRapport.aantal === 1 ? "ag" : "gen"} zonder rapport${
        oudste !== null ? `, ${oudste} dag${oudste === 1 ? "" : "en"} oud` : ""
      }`,
      href: "/admin/aanvragen?filter=zonder-rapport",
    });
  }
  if (teDoen.prospectsTeReviewen > 0) {
    teDoenRijen.push({
      aantal: teDoen.prospectsTeReviewen,
      tekst: `prospect${teDoen.prospectsTeReviewen === 1 ? "" : "s"} te reviewen`,
      href: "/admin/prospects",
    });
  }
  if (teDoen.contactenActieRijp > 0) {
    teDoenRijen.push({
      aantal: teDoen.contactenActieRijp,
      tekst: `contact${teDoen.contactenActieRijp === 1 ? "" : "en"} met een volgende actie rijp`,
      href: "/admin/contacten?chip=actie",
    });
  }

  return (
    <div className="space-y-6">
      {/* Blok 1: Te doen */}
      <section className="card-base overflow-hidden">
        <div className="px-4 py-3 border-b border-[#F0F3F1]">
          <h2 className="font-body font-semibold text-primary text-sm">Te doen</h2>
        </div>
        {teDoenRijen.length === 0 ? (
          <p className="px-4 py-3 text-sm text-text-muted">Niets te doen vandaag.</p>
        ) : (
          <div className="divide-y divide-[#F0F3F1]">
            {teDoenRijen.map((r, i) => (
              <a
                key={i}
                href={r.href}
                className="flex items-center gap-2 px-4 py-3 text-sm hover:bg-[#FAFBFA] transition-colors"
              >
                <span className="font-medium text-primary">{r.aantal}</span>
                <span className="text-text-soft">{r.tekst}</span>
              </a>
            ))}
          </div>
        )}
      </section>

      {/* Blok 2: Weekbudget */}
      <section className="flex items-center justify-between text-sm text-text-soft bg-[#F5F0E8] rounded-lg px-4 py-2.5">
        <span>
          Deze week: <span className="font-medium text-primary">{weekbudget.verstuurd} van {weekbudget.budget}</span> verstuurd
        </span>
        <span className="text-text-muted text-xs">{weekbudget.resterend} nog te versturen deze week</span>
      </section>

      {/* Blok 3: Deze week vs vorige week */}
      <section className="card-base overflow-hidden">
        <div className="px-4 py-3 border-b border-[#F0F3F1]">
          <h2 className="font-body font-semibold text-primary text-sm">Deze week tegenover vorige week</h2>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-text-muted text-xs">
              <th className="px-4 py-2 font-medium"></th>
              <th className="px-4 py-2 font-medium">Deze week</th>
              <th className="px-4 py-2 font-medium">Vorige week</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F0F3F1]">
            {WEEK_RIJEN.map((rij) => (
              <tr key={rij.key}>
                <td className="px-4 py-2 text-text-soft">{rij.label}</td>
                <td className="px-4 py-2 font-medium text-primary">{week.dezeWeek[rij.key]}</td>
                <td className="px-4 py-2 text-text-muted">{week.vorigeWeek[rij.key]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Blok 4: Replies per doelgroep */}
      <section className="card-base overflow-hidden">
        <div className="px-4 py-3 border-b border-[#F0F3F1]">
          <h2 className="font-body font-semibold text-primary text-sm">Replies per doelgroep</h2>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-text-muted text-xs">
              <th className="px-4 py-2 font-medium">Doelgroep</th>
              <th className="px-4 py-2 font-medium">Verstuurd</th>
              <th className="px-4 py-2 font-medium">Geopend</th>
              <th className="px-4 py-2 font-medium">Gereageerd</th>
              <th className="px-4 py-2 font-medium">Percentage</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F0F3F1]">
            {repliesPerDoelgroep.map((d) => (
              <tr key={d.doelgroep}>
                <td className="px-4 py-2 text-primary font-medium">{d.label}</td>
                <td className="px-4 py-2 text-text-soft">{d.verstuurd}</td>
                <td className="px-4 py-2 text-text-soft">{d.geopend}</td>
                <td className="px-4 py-2 text-text-soft">{d.gereageerd}</td>
                <td className="px-4 py-2 text-text-muted">
                  {d.percentage === null ? "te weinig data" : `${d.percentage}%`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Blok 5: Trechter, klein */}
      <section className="card-base overflow-hidden px-4 py-3">
        <p className="text-sm text-text-soft">
          <span className="text-text-muted text-xs">30 dagen, indicatief:</span>{" "}
          <span className="font-medium text-primary">{trechter.bezoekers}</span> bezoekers{" "}
          → <span className="font-medium text-primary">{trechter.gestart}</span> gestart{" "}
          → <span className="font-medium text-primary">{trechter.voltooid}</span> voltooid{" "}
          → <span className="font-medium text-primary">{trechter.leads}</span> leads{" "}
          → <span className="font-medium text-primary">{trechter.aanmeldingen}</span> aanmeldingen{" "}
          → <span className="font-medium text-primary">{trechter.betaald}</span> betaald
        </p>
      </section>

      {/* Blok 6: Laatste activiteit */}
      <section className="card-base overflow-hidden">
        <div className="px-4 py-3 border-b border-[#F0F3F1]">
          <h2 className="font-body font-semibold text-primary text-sm">Laatste activiteit</h2>
        </div>
        {activiteit.length === 0 ? (
          <p className="px-4 py-3 text-sm text-text-muted">Nog geen activiteit.</p>
        ) : (
          <div className="divide-y divide-[#F0F3F1]">
            {activiteit.map((a, i) => (
              <div key={i} className="flex items-center justify-between px-4 py-2.5 text-sm">
                <span className="text-text-soft">{a.tekst}</span>
                <span className="text-text-muted text-xs whitespace-nowrap">{relatieveTijd(a.tijd)}</span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
