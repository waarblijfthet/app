"use client";

/**
 * De uitgavenscan (9-nov-2026): bankafschrift kiezen, in de browser lezen, een paar vragen, zien waar
 * het geld heen gaat, een gratis voorlopig advies, en de Geldscan aanvragen. Ontwerp: canvas
 * "Uitgavenscan schermen". Plan: docs/plan-uitgavenscan-bankbestand-09-nov-2026.md.
 *
 * Privacy: het afschrift en alle boekingen blijven in het geheugen van deze pagina. Naar de server
 * gaan alleen (1) opgeschoonde bedrijfsnamen om in te delen, als de bezoeker dat toestaat, en (2) de
 * samenvatting zonder namen en rekeningnummers voor het advies en de aanvraag. Niets in localStorage.
 * Meten per scherm via meet() (lib/uitgavenscan/meet.ts), zonder bedragen.
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { leesBankbestandAsync, leesCsvMetKeuze, voegSamen, type KolomKeuze, type LeesResultaat, type Transactie } from "@/lib/bankbestand";
import {
  CATEGORIEEN,
  alleTegenpartijen,
  eigenIbansUitBestanden,
  groteAfwijkingen,
  inkomenKandidaten,
  maakOverzicht,
  maakSamenvatting,
  onbekendeBedrijfsnamen,
  rekeningKandidaten,
  volledigeMaanden,
  vragenOverOnbekend,
  type Aard,
  type CategorieId,
  type GroteAfwijking,
  type Keuzes,
  type OnbekendePost,
} from "@/lib/uitgaven";
import { bewaakIndeling } from "@/lib/uitgaven/advies/indelen-ai";
import type { VoorlopigAdvies } from "@/lib/uitgaven/advies/valideer-advies";
import { meet } from "@/lib/uitgavenscan/meet";
import type { SchermId } from "@/lib/uitgavenscan/meting";
import { DOELEN, JAARKOSTEN, WIE_REGELT } from "@/lib/uitgavenscan/aanvraag";
import { BANK_LIJST, bankInfo, stappen, type BankSleutel, type Plek } from "./banken";
import { Kaart, Keuze, Knop, Kop, Melding, Slot, TekstKnop, Teller, Titel, euro, euroHeel, maandNaam } from "./ui";

type Bestand = { naam: string; aantal: number; formaat: string };
type KolomVraag = { naam: string; bytes: Uint8Array; heeftKopregel: boolean; koppen: string[]; voorbeeld: string[][]; keuze: Partial<KolomKeuze> };
type AdviesStatus = "bezig" | "klaar" | "te_onvolledig" | "mislukt" | "te_druk";

const MAX_BESTAND = 15 * 1024 * 1024;

const VRAAG_CATEGORIEEN: CategorieId[] = ["boodschappen", "huis", "kleding", "kinderen", "vervoer", "vakantie", "zorg", "abonnementen", "horeca", "webwinkels", "sport", "goededoelen"];

const STAP_VAN: Record<SchermId, { stap: number; titel: string; voortgang: number }> = {
  start: { stap: 1, titel: "Je afschrift", voortgang: 4 },
  bank: { stap: 1, titel: "Je afschrift", voortgang: 8 },
  apparaat: { stap: 1, titel: "Je afschrift", voortgang: 12 },
  downloaden: { stap: 1, titel: "Je afschrift", voortgang: 16 },
  gelezen: { stap: 1, titel: "Je afschrift", voortgang: 20 },
  eigen_rekeningen: { stap: 2, titel: "Eigen rekeningen", voortgang: 40 },
  inkomen: { stap: 3, titel: "Inkomen", voortgang: 55 },
  wat_is_dit: { stap: 3, titel: "Een paar posten", voortgang: 62 },
  alles_nalopen: { stap: 3, titel: "Alles nalopen", voortgang: 66 },
  grote_bedragen: { stap: 3, titel: "Grote bedragen", voortgang: 72 },
  overzicht: { stap: 4, titel: "Waar het heen gaat", voortgang: 80 },
  voorlopig_advies: { stap: 5, titel: "Voorlopig advies", voortgang: 100 },
  geldscan_aanvragen: { stap: 5, titel: "Geldscan aanvragen", voortgang: 100 },
  aanvraag_verzonden: { stap: 5, titel: "Aangevraagd", voortgang: 100 },
};

function leesfoutCode(r: Extract<LeesResultaat, { status: "niet-ondersteund" }>): "onbekend_formaat" | "geen_transacties" | "kapot" {
  if (/geen boekingen|leeg/i.test(r.reden)) return "geen_transacties";
  if (/niet openen/i.test(r.reden)) return "kapot";
  return "onbekend_formaat";
}

function formaatMeting(f: string): "csv" | "pdf" | "camt053" | "anders" {
  return f === "csv" || f === "pdf" || f === "camt053" ? f : "anders";
}

export default function UitgavenscanClient() {
  const [scherm, setScherm] = useState<SchermId>("start");
  const [historie, setHistorie] = useState<SchermId[]>([]);
  const [bank, setBank] = useState<BankSleutel | null>(null);
  const [plek, setPlek] = useState<Plek | null>(null);
  const [bestanden, setBestanden] = useState<Bestand[]>([]);
  const [transactieLijsten, setTransactieLijsten] = useState<Transactie[][]>([]);
  const [leesBezig, setLeesBezig] = useState(false);
  const [leesFout, setLeesFout] = useState<string | null>(null);
  const [kolomVraag, setKolomVraag] = useState<KolomVraag | null>(null);
  const [eigenKeuze, setEigenKeuze] = useState<Record<string, boolean>>({});
  const [inkomenKeuze, setInkomenKeuze] = useState<Record<string, boolean>>({});
  const [aiToestaan, setAiToestaan] = useState(true);
  const [aiBezig, setAiBezig] = useState(false);
  const [categorieKeuzes, setCategorieKeuzes] = useState<Record<string, CategorieId>>({});
  const [aiGroepen, setAiGroepen] = useState<Record<string, boolean>>({});
  const [vragen, setVragen] = useState<OnbekendePost[]>([]);
  const [vraagIndex, setVraagIndex] = useState(0);
  const [afwijkingen, setAfwijkingen] = useState<GroteAfwijking[]>([]);
  const [afwijkingIndex, setAfwijkingIndex] = useState(0);
  const [afwijkingKeuzes, setAfwijkingKeuzes] = useState<Record<string, Aard>>({});
  const [gekozenAard, setGekozenAard] = useState<Aard | null>(null);
  const [toonSamenvatting, setToonSamenvatting] = useState(false);
  const [toonVast, setToonVast] = useState(false);
  const [nalopenFilter, setNalopenFilter] = useState<"alles" | "onbekend">("alles");
  const [nalopenAantal, setNalopenAantal] = useState(25);
  const [advies, setAdvies] = useState<VoorlopigAdvies | null>(null);
  const [adviesStatus, setAdviesStatus] = useState<AdviesStatus | null>(null);
  // Aanvraag
  const [doelen, setDoelen] = useState<string[]>([]);
  const [wieRegelt, setWieRegelt] = useState<string | null>(null);
  const [krapst, setKrapst] = useState("");
  const [jaarAan, setJaarAan] = useState<Record<string, boolean>>({});
  const [jaarBedrag, setJaarBedrag] = useState<Record<string, string>>({});
  const [extraJaar, setExtraJaar] = useState<{ label: string; bedrag: string }[]>([]);
  const [naam, setNaam] = useState("");
  const [email, setEmail] = useState("");
  const [aanvraagBezig, setAanvraagBezig] = useState(false);
  const [aanvraagFout, setAanvraagFout] = useState<string | null>(null);
  const bovenkant = useRef<HTMLDivElement>(null);

  // ---------- afgeleide gegevens (alles lokaal) ----------
  const tx = useMemo(() => voegSamen(transactieLijsten), [transactieLijsten]);
  const maanden = useMemo(() => volledigeMaanden(tx), [tx]);
  // Kandidaten alleen uit volledige maanden, anders telt een halve maand mee in het gemiddelde inkomen.
  const txVol = useMemo(() => {
    const m = new Set(maanden);
    return tx.filter((t) => m.has(t.datum.slice(0, 7)));
  }, [tx, maanden]);
  const rekeningen = useMemo(() => rekeningKandidaten(txVol, 6), [txVol]);
  const eigenIbans = useMemo(() => Object.keys(eigenKeuze).filter((i) => eigenKeuze[i]), [eigenKeuze]);
  const inkomens = useMemo(() => {
    const alle = eigenIbansUitBestanden(tx);
    eigenIbans.forEach((i) => alle.add(i));
    return inkomenKandidaten(txVol, alle, Math.max(1, maanden.length));
  }, [tx, txVol, eigenIbans, maanden.length]);
  const keuzes: Keuzes = useMemo(
    () => ({
      eigenIbans: eigenIbans,
      inkomenSleutels: inkomens.filter((k) => (k.sleutel in inkomenKeuze ? inkomenKeuze[k.sleutel] : k.voorgesteld)).map((k) => k.sleutel),
      categorieKeuzes: categorieKeuzes,
      afwijkingen: afwijkingKeuzes,
    }),
    [eigenIbans, inkomens, inkomenKeuze, categorieKeuzes, afwijkingKeuzes]
  );
  const overzicht = useMemo(() => (maanden.length ? maakOverzicht(tx, keuzes) : null), [tx, keuzes, maanden.length]);
  const samenvatting = useMemo(() => (overzicht ? maakSamenvatting(overzicht) : null), [overzicht]);

  // ---------- navigatie en meting ----------
  useEffect(() => {
    meet(scherm);
    if (bovenkant.current) bovenkant.current.scrollIntoView({ block: "start" });
  }, [scherm]);

  function naar(s: SchermId) {
    setHistorie((h) => [...h, scherm]);
    setScherm(s);
  }
  function vorige() {
    setHistorie((h) => {
      const kopie = h.slice();
      const laatste = kopie.pop();
      if (laatste) setScherm(laatste);
      return kopie;
    });
  }
  function stoppen() {
    if (typeof window !== "undefined" && !window.confirm("Stoppen? Wat je hebt ingelezen wordt gewist.")) return;
    window.location.href = "/";
  }

  // ---------- stap 1: bestand lezen ----------
  async function leesBestanden(lijst: FileList | null) {
    if (!lijst || lijst.length === 0) return;
    setLeesBezig(true);
    setLeesFout(null);
    const nieuw: Transactie[][] = [];
    const nieuweBestanden: Bestand[] = [];
    try {
      for (const f of Array.from(lijst).slice(0, 10)) {
        if (f.size > MAX_BESTAND) {
          setLeesFout(f.name + " is te groot (meer dan 15 MB). Kies een kortere periode.");
          meet("downloaden", { leesfout: "te_groot" });
          continue;
        }
        const bytes = new Uint8Array(await f.arrayBuffer());
        const r = await leesBankbestandAsync(f.name, bytes);
        if (r.status === "gelezen") {
          if (r.transacties.length === 0) {
            setLeesFout("In " + f.name + " vond ik geen boekingen.");
            meet("downloaden", { leesfout: "geen_transacties" });
          } else {
            nieuw.push(r.transacties);
            nieuweBestanden.push({ naam: f.name, aantal: r.transacties.length, formaat: r.formaat });
          }
        } else if (r.status === "kolommen-kiezen") {
          setKolomVraag({ naam: f.name, bytes: bytes, heeftKopregel: r.heeftKopregel, koppen: r.koppen, voorbeeld: r.voorbeeld, keuze: r.voorstel });
        } else {
          setLeesFout(f.name + ": " + r.reden);
          meet("downloaden", { leesfout: leesfoutCode(r), formaat: formaatMeting(r.formaat) });
        }
      }
    } catch {
      setLeesFout("Dit bestand kon ik niet lezen.");
      meet("downloaden", { leesfout: "kapot" });
    }
    setLeesBezig(false);
    if (nieuw.length) klaarMetLezen(nieuw, nieuweBestanden);
  }

  function klaarMetLezen(nieuw: Transactie[][], nieuweBestanden: Bestand[]) {
    const lijsten = [...transactieLijsten, ...nieuw];
    const alleBestanden = [...bestanden, ...nieuweBestanden];
    setTransactieLijsten(lijsten);
    setBestanden(alleBestanden);
    const alleTx = voegSamen(lijsten);
    const m = volledigeMaanden(alleTx);
    // Eigen rekeningen alvast voorstellen.
    const voorstel: Record<string, boolean> = {};
    const vol = new Set(m);
    rekeningKandidaten(alleTx.filter((t) => vol.has(t.datum.slice(0, 7))), 6).forEach((k) => {
      voorstel[k.iban] = k.iban in eigenKeuze ? eigenKeuze[k.iban] : k.waarschijnlijkEigen;
    });
    setEigenKeuze(voorstel);
    meet("gelezen", { formaat: formaatMeting(nieuweBestanden[0].formaat), aantalBestanden: Math.min(20, alleBestanden.length), aantalMaanden: Math.min(36, m.length) });
    if (m.length === 0) meet("gelezen", { leesfout: "te_kort" });
    naar("gelezen");
  }

  function leesMetKolommen() {
    if (!kolomVraag) return;
    const k = kolomVraag.keuze;
    if (k.datum === undefined || k.bedrag === undefined || k.omschrijving === undefined) return;
    const r = leesCsvMetKeuze(kolomVraag.naam, kolomVraag.bytes, { datum: k.datum, bedrag: k.bedrag, omschrijving: k.omschrijving, tegenpartij: k.tegenpartij, afBij: k.afBij }, kolomVraag.heeftKopregel);
    setKolomVraag(null);
    if (r.status === "gelezen" && r.transacties.length > 0) klaarMetLezen([r.transacties], [{ naam: kolomVraag.naam, aantal: r.transacties.length, formaat: "csv" }]);
    else {
      setLeesFout("Met deze kolommen vond ik geen boekingen. Kies de kolommen opnieuw.");
      meet("downloaden", { leesfout: "geen_transacties", formaat: "csv" });
    }
  }

  // ---------- stap 3: indelen en vragen ----------
  async function naInkomen() {
    let nieuweKeuzes = categorieKeuzes;
    if (aiToestaan && overzicht) {
      const namen = onbekendeBedrijfsnamen(overzicht);
      if (namen.length) {
        setAiBezig(true);
        try {
          const res = await fetch("/api/uitgavenscan/indelen", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ namen: namen.map((n) => n.naam) }) });
          const d = (await res.json()) as { ok: boolean; categorieen?: (CategorieId | null)[] };
          if (d.ok && d.categorieen) {
            const kopie: Record<string, CategorieId> = { ...categorieKeuzes };
            const ai: Record<string, boolean> = {};
            namen.forEach((n, i) => {
              const c = bewaakIndeling(d.categorieen ? d.categorieen[i] ?? null : null, n.gemiddeldCent);
              if (c && !(n.groep in categorieKeuzes)) {
                kopie[n.groep] = c;
                ai[n.groep] = true;
              }
            });
            nieuweKeuzes = kopie;
            setCategorieKeuzes(kopie);
            setAiGroepen(ai);
          }
        } catch {
          // Lukt het indelen niet, dan stellen we gewoon meer vragen.
        }
        setAiBezig(false);
      }
    }
    meet("inkomen", { aiIndeling: aiToestaan });
    const o = maakOverzicht(tx, { ...keuzes, categorieKeuzes: nieuweKeuzes });
    const v = vragenOverOnbekend(o, 8, 0.8);
    setVragen(v);
    setVraagIndex(0);
    if (v.length) {
      meet("wat_is_dit", { aantalVragen: v.length });
      naar("wat_is_dit");
    } else naVragen(nieuweKeuzes);
  }

  function beantwoord(groep: string, c: CategorieId | null) {
    const kopie = { ...categorieKeuzes };
    if (c) kopie[groep] = c;
    setCategorieKeuzes(kopie);
    if (vraagIndex + 1 < vragen.length) setVraagIndex(vraagIndex + 1);
    else naVragen(kopie);
  }

  function naVragen(cat: Record<string, CategorieId> = categorieKeuzes) {
    const o = maakOverzicht(tx, { ...keuzes, categorieKeuzes: cat });
    const a = groteAfwijkingen(o, 6);
    setAfwijkingen(a);
    setAfwijkingIndex(0);
    setGekozenAard(a.length ? a[0].aard ?? a[0].voorstel : null);
    if (a.length) {
      meet("grote_bedragen", { groteBedragen: a.length });
      naar("grote_bedragen");
    } else naar("overzicht");
  }

  function volgendeAfwijking(aard: Aard | null) {
    const huidig = afwijkingen[afwijkingIndex];
    if (huidig && aard) setAfwijkingKeuzes((k) => ({ ...k, [huidig.sleutel]: aard }));
    if (afwijkingIndex + 1 < afwijkingen.length) {
      const volgende = afwijkingen[afwijkingIndex + 1];
      setAfwijkingIndex(afwijkingIndex + 1);
      setGekozenAard(volgende.aard ?? volgende.voorstel);
    } else naar("overzicht");
  }

  // ---------- stap 5: advies ----------
  async function maakAdvies() {
    if (!samenvatting) return;
    naar("voorlopig_advies");
    setAdvies(null);
    setAdviesStatus("bezig");
    try {
      const res = await fetch("/api/uitgavenscan/advies", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ samenvatting: samenvatting }) });
      const d = (await res.json()) as { ok: boolean; advies?: VoorlopigAdvies; status?: AdviesStatus };
      if (d.ok && d.advies) {
        setAdvies(d.advies);
        setAdviesStatus("klaar");
        meet("voorlopig_advies", { adviesStatus: "gemaakt" });
      } else {
        const s = d.status === "te_onvolledig" || d.status === "te_druk" ? d.status : "mislukt";
        setAdviesStatus(s);
        meet("voorlopig_advies", { adviesStatus: s });
      }
    } catch {
      setAdviesStatus("mislukt");
      meet("voorlopig_advies", { adviesStatus: "mislukt" });
    }
  }

  // ---------- aanvraag ----------
  async function verstuurAanvraag() {
    if (!samenvatting) return;
    setAanvraagBezig(true);
    setAanvraagFout(null);
    const bedrag = (s: string | undefined) => {
      const n = parseInt((s || "").replace(/[^0-9]/g, ""), 10);
      return Number.isFinite(n) && n > 0 ? n : null;
    };
    const jaarkosten = [
      ...JAARKOSTEN.filter((j) => jaarAan[j.sleutel]).map((j) => ({ sleutel: j.sleutel, label: j.label, bedrag: bedrag(jaarBedrag[j.sleutel]) })),
      ...extraJaar.filter((e) => e.label.trim()).map((e) => ({ sleutel: "anders", label: e.label.trim(), bedrag: bedrag(e.bedrag) })),
    ];
    try {
      const res = await fetch("/api/uitgavenscan/aanvraag", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ naam: naam, email: email, doelen: doelen, wieRegelt: wieRegelt, krapst: krapst, jaarkosten: jaarkosten, samenvatting: samenvatting }),
      });
      const d = (await res.json()) as { ok: boolean; fout?: string };
      if (d.ok) naar("aanvraag_verzonden");
      else setAanvraagFout(d.fout || "Versturen lukte niet. Probeer het nog eens.");
    } catch {
      setAanvraagFout("Versturen lukte niet. Controleer je verbinding en probeer het nog eens.");
    }
    setAanvraagBezig(false);
  }

  // ---------- weergave ----------
  const info = STAP_VAN[scherm];
  const kop = scherm === "start" || scherm === "aanvraag_verzonden" ? null : (
    <Kop stap={info.stap} titel={info.titel} voortgang={info.voortgang} onVorige={historie.length ? vorige : undefined} onStoppen={stoppen} />
  );
  const breed = scherm === "overzicht" || scherm === "voorlopig_advies" || scherm === "alles_nalopen";

  return (
    <div ref={bovenkant} className={`mx-auto flex flex-col gap-6 md:gap-7 ${breed ? "max-w-[920px]" : "max-w-[600px]"}`}>
      {kop}
      {scherm === "start" && renderStart()}
      {scherm === "bank" && renderBank()}
      {scherm === "apparaat" && renderApparaat()}
      {scherm === "downloaden" && renderDownloaden()}
      {scherm === "gelezen" && renderGelezen()}
      {scherm === "eigen_rekeningen" && renderEigen()}
      {scherm === "inkomen" && renderInkomen()}
      {scherm === "wat_is_dit" && renderWatIsDit()}
      {scherm === "alles_nalopen" && renderNalopen()}
      {scherm === "grote_bedragen" && renderGroteBedragen()}
      {scherm === "overzicht" && renderOverzicht()}
      {scherm === "voorlopig_advies" && renderAdvies()}
      {scherm === "geldscan_aanvragen" && renderAanvragen()}
      {scherm === "aanvraag_verzonden" && renderVerzonden()}
    </div>
  );

  function renderStart() {
    return (
      <>
        <div className="flex flex-col gap-4">
          <p className="m-0 text-sm font-semibold text-accent">Gratis · ongeveer 5 minuten</p>
          <h1 className="font-display font-light text-[34px] md:text-[46px] leading-[1.1] text-primary m-0">Waar blijft je geld? Zie het uit je eigen afschrift.</h1>
          <p className="m-0 text-base md:text-lg leading-relaxed text-text-soft">
            Je kiest een afschrift uit je bankapp of internetbankieren. Je ziet per maand wat er binnenkomt, wat vastligt en wat er onderweg verdwijnt, met een kort voorlopig advies. Daarna kun je een plan met potjes en jullie eigen bedragen aanvragen.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <Knop onClick={() => naar("bank")}>Kies je afschrift</Knop>
          <a href="/analyse" className="text-[15px] font-medium text-accent">Geen afschrift bij de hand? Doe de analyse met schattingen</a>
        </div>
        <Slot />
        <Kaart className="p-6 md:p-7">
          <p className="m-0 mb-4 font-semibold text-primary">Zo werkt het</p>
          <ol className="m-0 p-0 list-none flex flex-col gap-4">
            {[
              ["Kies je afschrift", "CSV of pdf, de laatste drie maanden of meer. Meer rekeningen mag."],
              ["Twee korte vragen", "Welke rekeningen van jullie zelf zijn, en wat jullie inkomen is."],
              ["Zien waar het heen gaat", "Vaste lasten, kosten die niet elke maand komen, en wat er overblijft."],
              ["Een voorlopig advies", "Gratis. Wil je daarna je plan met potjes en bedragen, dan vraag je de Geldscan aan."],
            ].map(([t, u], i) => (
              <li key={t} className="flex gap-3">
                <span className="flex-none w-7 h-7 rounded-full bg-[#E4F1EE] text-accent text-sm font-semibold flex items-center justify-center">{i + 1}</span>
                <span>
                  <span className="block font-semibold text-primary">{t}</span>
                  <span className="block text-sm text-text-soft mt-0.5">{u}</span>
                </span>
              </li>
            ))}
          </ol>
        </Kaart>
      </>
    );
  }

  function renderBank() {
    return (
      <>
        <Titel sub="Dan laat ik je zien waar je je afschrift vindt.">Bij welke bank zit je?</Titel>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {BANK_LIJST.map((b) => (
            <button
              key={b.sleutel}
              type="button"
              onClick={() => {
                setBank(b.sleutel);
                meet("apparaat", { bank: b.sleutel });
                naar("apparaat");
              }}
              className="flex items-center gap-3 min-h-[60px] px-4 rounded-[14px] border-[1.5px] border-[#C7CFCB] bg-white text-left hover:border-accent"
            >
              <span className="flex-none w-9 h-9 rounded-full bg-[#EEF1EF] text-text-soft text-xs font-bold flex items-center justify-center">{b.initialen}</span>
              <span className="flex-1 font-semibold text-primary">{b.naam}</span>
              <span aria-hidden="true" className="text-text-muted">›</span>
            </button>
          ))}
        </div>
      </>
    );
  }

  function renderApparaat() {
    const b = bankInfo(bank);
    return (
      <>
        <div className="flex items-center gap-3">
          <span className="w-9 h-9 rounded-full bg-[#EEF1EF] text-text-soft text-xs font-bold flex items-center justify-center">{b.initialen}</span>
          <span className="font-semibold text-primary">{b.naam}</span>
          <TekstKnop onClick={vorige}>wijzig</TekstKnop>
        </div>
        <Titel>Waar download je je afschrift?</Titel>
        <div className="flex flex-col gap-2.5">
          {(
            [
              ["computer", "Op een computer", "Via internetbankieren, als CSV" + (b.pdf ? " of pdf" : "")],
              ["app", "Op mijn telefoon", b.pdf ? "In de app, als pdf" : "In de app lukt het vaak alleen als pdf"],
            ] as [Plek, string, string][]
          ).map(([p, t, u]) => (
            <button
              key={p}
              type="button"
              onClick={() => {
                setPlek(p);
                meet("downloaden", { downloadPlek: p });
                naar("downloaden");
              }}
              className="flex items-center gap-3 min-h-[72px] px-5 py-3 rounded-[16px] border-[1.5px] border-[#C7CFCB] bg-white text-left hover:border-accent"
            >
              <span className="flex-1">
                <span className="block font-semibold text-primary">{t}</span>
                <span className="block text-sm text-text-soft mt-0.5">{u}</span>
              </span>
              <span aria-hidden="true" className="text-text-muted">›</span>
            </button>
          ))}
        </div>
        <TekstKnop
          zacht
          onClick={() => {
            meet("downloaden", { downloadPlek: "weet_niet" });
            setPlek("computer");
            naar("downloaden");
          }}
        >
          Ik heb het bestand al
        </TekstKnop>
      </>
    );
  }

  function renderDownloaden() {
    const b = bankInfo(bank);
    if (kolomVraag) return renderKolommen();
    return (
      <>
        <div className="flex items-center gap-3">
          <span className="w-9 h-9 rounded-full bg-[#EEF1EF] text-text-soft text-xs font-bold flex items-center justify-center">{b.initialen}</span>
          <span className="font-semibold text-primary">
            {b.naam} · {plek === "app" ? "op je telefoon" : "op de computer"}
          </span>
        </div>
        <Titel>{bestanden.length ? "Nog een afschrift toevoegen" : "Zo download je je afschrift"}</Titel>
        <Kaart className="p-6">
          <ol className="m-0 p-0 list-none flex flex-col gap-3.5">
            {stappen(bank, plek ?? "computer").map((s, i) => (
              <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-primary">
                <span className="flex-none w-6 h-6 rounded-full bg-[#E4F1EE] text-accent text-xs font-semibold flex items-center justify-center mt-0.5">{i + 1}</span>
                <span>{s}</span>
              </li>
            ))}
          </ol>
          <p className="m-0 mt-4 text-sm text-text-muted">Kom je er niet uit? Mail naar hallo@waarblijfthet.nl welke bank je hebt, dan zoek ik het uit.</p>
        </Kaart>
        <label className={`flex flex-col items-center justify-center gap-2 min-h-[140px] rounded-[20px] border-2 border-dashed border-[#9FB3AC] bg-white px-6 text-center cursor-pointer hover:border-accent ${leesBezig ? "opacity-60" : ""}`}>
          <span className="font-semibold text-primary">{leesBezig ? "Bezig met lezen..." : "Kies het bestand"}</span>
          <span className="text-sm text-text-soft">CSV, pdf of XML. Meer bestanden tegelijk mag.</span>
          <input
            type="file"
            multiple
            accept=".csv,.txt,.pdf,.xml,text/csv,application/pdf,application/xml,text/xml"
            className="sr-only"
            disabled={leesBezig}
            onChange={(e) => {
              void leesBestanden(e.target.files);
              e.target.value = "";
            }}
          />
        </label>
        {leesFout && <Melding soort="fout">{leesFout}</Melding>}
        <Slot />
        {bestanden.length > 0 && <TekstKnop onClick={() => naar("gelezen")}>Terug naar wat al gelezen is</TekstKnop>}
      </>
    );
  }

  function renderKolommen() {
    if (!kolomVraag) return null;
    const velden: [keyof KolomKeuze, string, boolean][] = [
      ["datum", "Datum", true],
      ["bedrag", "Bedrag", true],
      ["omschrijving", "Omschrijving", true],
      ["tegenpartij", "Naam tegenpartij", false],
      ["afBij", "Af of bij (als het bedrag geen min heeft)", false],
    ];
    const zet = (veld: keyof KolomKeuze, waarde: string) =>
      setKolomVraag({ ...kolomVraag, keuze: { ...kolomVraag.keuze, [veld]: waarde === "" ? undefined : Number(waarde) } });
    const k = kolomVraag.keuze;
    return (
      <>
        <Titel sub={"Dit bestand (" + kolomVraag.naam + ") herken ik niet. Wijs aan welke kolom wat is."}>Welke kolom is wat?</Titel>
        <Kaart className="p-6 flex flex-col gap-4">
          {velden.map(([veld, label, nodig]) => (
            <label key={veld} className="flex flex-col gap-1.5 text-sm font-semibold text-primary">
              {label}
              {!nodig && <span className="font-normal text-text-muted"> (mag leeg)</span>}
              <select
                value={k[veld] === undefined ? "" : String(k[veld])}
                onChange={(e) => zet(veld, e.target.value)}
                className="min-h-[44px] border-[1.5px] border-[#C7CFCB] rounded-xl px-2.5 bg-white font-normal"
              >
                <option value="">{nodig ? "Kies een kolom" : "Geen"}</option>
                {kolomVraag.koppen.map((kp, i) => (
                  <option key={i} value={i}>
                    {kp} {kolomVraag.voorbeeld[0] && kolomVraag.voorbeeld[0][i] ? "(bijv. " + kolomVraag.voorbeeld[0][i].slice(0, 24) + ")" : ""}
                  </option>
                ))}
              </select>
            </label>
          ))}
        </Kaart>
        <div className="flex items-center justify-between gap-4">
          <TekstKnop zacht onClick={() => setKolomVraag(null)}>
            Ander bestand kiezen
          </TekstKnop>
          <Knop onClick={leesMetKolommen} uit={k.datum === undefined || k.bedrag === undefined || k.omschrijving === undefined}>
            Lees het bestand
          </Knop>
        </div>
      </>
    );
  }

  function renderGelezen() {
    const eerste = tx.length ? tx[0].datum : "";
    const laatste = tx.length ? tx[tx.length - 1].datum : "";
    const datum = (d: string) => (d ? Number(d.slice(8, 10)) + " " + maandNaam(d) : "");
    return (
      <>
        <Titel>Gelezen</Titel>
        <Kaart className="p-6 flex flex-col gap-3">
          {bestanden.map((b, i) => (
            <div key={i} className="flex justify-between gap-3 text-[15px]">
              <span className="text-primary font-semibold break-all">{b.naam}</span>
              <span className="text-text-soft whitespace-nowrap">{b.aantal} boekingen</span>
            </div>
          ))}
          <p className="m-0 text-sm text-text-soft">
            Samen {tx.length} boekingen, van {datum(eerste)} tot en met {datum(laatste)}. {maanden.length} volledige {maanden.length === 1 ? "maand" : "maanden"}: {maanden.map(maandNaam).join(", ")}.
          </p>
        </Kaart>
        {maanden.length === 0 && <Melding soort="fout">Er zit nog geen volledige maand in. Download de laatste drie volledige maanden of meer.</Melding>}
        {maanden.length > 0 && maanden.length < 3 && <Melding>Met drie maanden of meer wordt het beeld een stuk beter. Voeg gerust nog een periode toe.</Melding>}
        <p className="m-0 text-[15px] text-text-soft leading-relaxed">Heeft je partner een eigen rekening, of zit je ook bij een andere bank? Voeg die toe, dan zie je het hele huishouden.</p>
        <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-4">
          <TekstKnop onClick={() => naar("downloaden")}>+ Nog een rekening toevoegen</TekstKnop>
          <Knop uit={maanden.length === 0} onClick={() => naar(rekeningen.length ? "eigen_rekeningen" : "inkomen")}>
            Verder
          </Knop>
        </div>
      </>
    );
  }

  function renderEigen() {
    return (
      <>
        <Titel sub="Geld naar je eigen spaarrekening of naar je partner is geen uitgave. Zo tel ik het niet dubbel.">Zijn dit jullie eigen rekeningen?</Titel>
        <Kaart className="px-5 md:px-6 py-2">
          {rekeningen.map((r, i) => (
            <div key={r.iban} className={`flex items-center gap-3 py-4 ${i < rekeningen.length - 1 ? "border-b border-[#EDF0EE]" : ""}`}>
              <div className="flex-1 min-w-0">
                <p className="m-0 font-semibold text-primary truncate">{r.label}</p>
                <p className="m-0 mt-0.5 text-[13px] text-text-soft">
                  •••• {r.eindigtOp} · {r.aantal} keer{r.heenCent ? " · " + euro(r.heenCent) + " heen" : ""}
                  {r.terugCent ? " · " + euro(r.terugCent) + " terug" : ""}
                </p>
              </div>
              <div className="flex gap-1.5" role="group" aria-label={"Eigen rekening: " + r.label}>
                {[true, false].map((ja) => (
                  <button
                    key={String(ja)}
                    type="button"
                    onClick={() => setEigenKeuze({ ...eigenKeuze, [r.iban]: ja })}
                    aria-pressed={eigenKeuze[r.iban] === ja}
                    className={`min-w-[52px] min-h-[44px] px-3 rounded-full border-[1.5px] text-sm font-semibold ${eigenKeuze[r.iban] === ja ? "border-accent bg-[#E4F1EE] text-[#0B5F56]" : "border-[#C7CFCB] bg-white text-primary"}`}
                  >
                    {ja ? "Ja" : "Nee"}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </Kaart>
        <p className="m-0 text-sm text-text-soft">Ja betekent: van jullie zelf, of van je partner. Dit geld telt niet mee als uitgave of inkomen.</p>
        <div className="flex justify-end">
          <Knop onClick={() => naar("inkomen")}>Verder</Knop>
        </div>
      </>
    );
  }

  function renderInkomen() {
    const aan = (k: (typeof inkomens)[number]) => (k.sleutel in inkomenKeuze ? inkomenKeuze[k.sleutel] : k.voorgesteld);
    const totaal = inkomens.filter(aan).reduce((s, k) => s + k.gemiddeldPerMaandCent, 0);
    return (
      <>
        <Titel sub="Deze bedragen komen regelmatig binnen. Vink aan wat inkomen is.">Klopt dit als jullie inkomen?</Titel>
        <Kaart className="px-5 md:px-6 py-2">
          {inkomens.length === 0 && <p className="py-4 m-0 text-text-soft">Ik vond geen bedragen die regelmatig binnenkomen.</p>}
          {inkomens.slice(0, 8).map((k, i) => (
            <label key={k.sleutel} className={`flex items-center gap-4 py-4 cursor-pointer ${i < Math.min(8, inkomens.length) - 1 ? "border-b border-[#EDF0EE]" : ""}`}>
              <input type="checkbox" className="w-[22px] h-[22px] accent-accent flex-none" checked={aan(k)} onChange={(e) => setInkomenKeuze({ ...inkomenKeuze, [k.sleutel]: e.target.checked })} />
              <span className="flex-1 min-w-0">
                <span className="block font-semibold text-primary truncate">{k.label}</span>
                <span className="block mt-0.5 text-[13px] text-text-soft">
                  {k.soort === "salaris" ? "Salaris" : k.soort === "uitkering" ? "Uitkering" : k.soort === "toeslag" ? "Toeslag" : "Komt regelmatig binnen"} · {k.aantal} keer
                </span>
              </span>
              <span className={`font-semibold ${aan(k) ? "text-primary" : "text-text-soft"}`}>{euro(k.gemiddeldPerMaandCent)}</span>
            </label>
          ))}
        </Kaart>
        <div className="flex items-baseline justify-between px-1">
          <p className="m-0 text-[15px] md:text-[17px] text-text-soft">Inkomen per maand, gemiddeld</p>
          <p className="m-0 font-display text-[28px] md:text-[34px]">{euro(totaal)}</p>
        </div>
        <p className="m-0 text-sm leading-relaxed text-text-soft">
          {aiToestaan
            ? "Hierna deel ik winkels en bedrijven die ik niet ken automatisch in. Daarvoor gaan alleen hun namen naar een AI-dienst, zonder bedragen en zonder namen van personen. "
            : "Je koos ervoor om geen namen naar een AI-dienst te sturen. Dan stel ik iets meer vragen. "}
          <TekstKnop onClick={() => setAiToestaan(!aiToestaan)}>{aiToestaan ? "Liever niet" : "Toch automatisch indelen"}</TekstKnop>
        </p>
        <div className="flex justify-end">
          <Knop uit={aiBezig} onClick={() => void naInkomen()}>
            {aiBezig ? "Bezig met indelen..." : "Verder"}
          </Knop>
        </div>
      </>
    );
  }

  function renderWatIsDit() {
    const v = vragen[vraagIndex];
    if (!v) return null;
    const ingedeeld = overzicht ? overzicht.posten.filter((p) => p.bron === "merk" || p.bron === "keuze" || p.bron === "regel").length : 0;
    return (
      <>
        <div className="flex flex-col gap-2.5">
          <span className="self-start">
            <Teller>
              {vraagIndex + 1} van {vragen.length}
            </Teller>
          </span>
          <Titel sub={vraagIndex === 0 ? ingedeeld + " boekingen heb ik al ingedeeld. Deze herken ik niet; met jouw antwoord klopt je overzicht beter." : undefined}>Wat is dit?</Titel>
        </div>
        <Kaart className="px-6 py-5 flex justify-between items-center gap-4">
          <div className="min-w-0">
            <p className="m-0 font-semibold text-lg text-primary break-words">{v.label}</p>
            <p className="m-0 mt-1 text-sm text-text-soft">
              {v.aantal} keer · {v.isBedrijf ? "betaling" : "overboeking"}
            </p>
          </div>
          <p className="m-0 font-display text-2xl md:text-[28px] whitespace-nowrap">{euro(v.totaalCent)}</p>
        </Kaart>
        <div className="grid grid-cols-2 gap-2.5">
          {VRAAG_CATEGORIEEN.map((c) => (
            <Keuze key={c} onClick={() => beantwoord(v.groep, c)}>
              {CATEGORIEEN[c].label}
            </Keuze>
          ))}
          <Keuze onClick={() => beantwoord(v.groep, null)}>Iets anders</Keuze>
        </div>
        <div className="flex justify-between items-center">
          <TekstKnop onClick={() => beantwoord(v.groep, null)}>Weet ik niet, volgende</TekstKnop>
          <TekstKnop zacht onClick={() => naVragen()}>
            Sla de rest over
          </TekstKnop>
        </div>
        <div className="border-t border-[#DCE2DF] pt-4">
          <TekstKnop onClick={() => naar("alles_nalopen")}>Wil je het precies? Loop alle posten zelf na</TekstKnop>
        </div>
      </>
    );
  }

  function renderNalopen() {
    if (!overzicht) return null;
    const alle = alleTegenpartijen(overzicht);
    const lijst = alle.filter((t) => nalopenFilter === "alles" || t.bron === "onbekend");
    const bronLabel = (t: (typeof alle)[number]) =>
      aiGroepen[t.groep] ? ["Automatisch", "bg-[#E8EEF8] text-[#2D4A7A]"] : t.bron === "keuze" ? ["Door jou", "bg-[#E4F1EE] text-[#0B5F56]"] : t.bron === "onbekend" ? ["Onbekend", "bg-[#FFF4D6] text-[#7A5300]"] : ["Herkend", "bg-[#EEF1EF] text-text-soft"];
    return (
      <>
        <Titel sub="Alle winkels, bedrijven en overboekingen, de grootste bovenaan. Pas aan wat niet klopt; de rest laat je staan.">Klopt de indeling?</Titel>
        <div className="flex gap-2 flex-wrap">
          {(["alles", "onbekend"] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setNalopenFilter(f)}
              className={`min-h-[40px] px-3.5 rounded-full border-[1.5px] text-sm font-semibold ${nalopenFilter === f ? "border-accent bg-[#E4F1EE] text-[#0B5F56]" : "border-[#C7CFCB] bg-white text-primary"}`}
            >
              {f === "alles" ? "Alles · " + alle.length : "Onbekend · " + alle.filter((t) => t.bron === "onbekend").length}
            </button>
          ))}
        </div>
        <Kaart className="px-5 md:px-6 py-1">
          {lijst.slice(0, nalopenAantal).map((t, i) => {
            const [bl, bk] = bronLabel(t);
            return (
              <div key={t.groep} className={`flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3.5 py-3.5 ${i < Math.min(nalopenAantal, lijst.length) - 1 ? "border-b border-[#EDF0EE]" : ""}`}>
                <div className="flex-1 min-w-0">
                  <p className="m-0 font-semibold text-primary break-words">{t.label}</p>
                  <p className="m-0 mt-1 text-[13px] text-text-soft">
                    {t.aantal} keer · {euro(t.totaalCent)} <span className={`ml-1 inline-flex items-center min-h-[22px] px-2 rounded-full text-xs font-semibold ${bk}`}>{bl}</span>
                  </p>
                </div>
                <label className="sr-only" htmlFor={"cat-" + i}>
                  Categorie {t.label}
                </label>
                <select
                  id={"cat-" + i}
                  value={t.categorie === "overig" || t.categorie === "overboeking" ? "" : t.categorie}
                  onChange={(e) => {
                    const c = e.target.value as CategorieId;
                    if (c) setCategorieKeuzes({ ...categorieKeuzes, [t.groep]: c });
                  }}
                  className="min-h-[44px] border-[1.5px] border-[#C7CFCB] rounded-xl px-2.5 bg-white text-sm"
                >
                  <option value="">Kies een categorie</option>
                  {(Object.keys(CATEGORIEEN) as CategorieId[])
                    .filter((c) => c !== "overig" && c !== "overboeking")
                    .map((c) => (
                      <option key={c} value={c}>
                        {CATEGORIEEN[c].label}
                      </option>
                    ))}
                </select>
              </div>
            );
          })}
        </Kaart>
        {lijst.length > nalopenAantal && <TekstKnop onClick={() => setNalopenAantal(nalopenAantal + 50)}>Toon meer ({lijst.length - nalopenAantal})</TekstKnop>}
        <div className="flex items-center justify-between gap-4">
          <p className="m-0 text-sm text-text-soft">Je keuzes gelden alleen voor deze scan.</p>
          <Knop onClick={() => naVragen()}>Klaar</Knop>
        </div>
      </>
    );
  }

  function renderGroteBedragen() {
    const a = afwijkingen[afwijkingIndex];
    if (!a) return null;
    const opties: [Aard, string, string][] = [
      ["aflossing", "Extra aflossing", "Een schuld in één keer of extra afgelost. Telt niet als uitgave, net als sparen."],
      ["eenmalig", "Eenmalige aankoop", "Bijvoorbeeld een wasmachine of verbouwing. Komt niet terug."],
      ["jaarlijks", "Komt elk jaar terug", "Zoals een jaarpremie of een aanslag. Hoort in een potje voor jaarkosten."],
    ];
    return (
      <>
        <div className="flex flex-col gap-2.5">
          <span className="self-start">
            <Teller>
              {afwijkingIndex + 1} van {afwijkingen.length}
            </Teller>
          </span>
          <Titel sub="Eén groot bedrag kan een hele maand er slechter laten uitzien dan hij is. Zeg wat het was, dan reken ik er goed mee.">Wat was dit?</Titel>
        </div>
        <Kaart className="px-6 py-5 flex justify-between items-center gap-4">
          <div className="min-w-0">
            <p className="m-0 font-semibold text-lg text-primary break-words">{a.label}</p>
            <p className="m-0 mt-1 text-sm text-text-soft">{maandNaam(a.maand).replace(/^./, (c) => c.toUpperCase())}</p>
          </div>
          <p className="m-0 font-display text-2xl md:text-[28px] whitespace-nowrap">{euro(a.bedragCent)}</p>
        </Kaart>
        <div className="flex flex-col gap-2.5" role="radiogroup" aria-label="Wat was dit?">
          {opties.map(([aard, t, u]) => (
            <label key={aard} className={`flex gap-3.5 items-start px-4 py-4 rounded-[14px] border-[1.5px] bg-white cursor-pointer ${gekozenAard === aard ? "border-accent bg-[#E4F1EE]" : "border-[#C7CFCB]"}`}>
              <input type="radio" name="aard" className="w-5 h-5 mt-0.5 accent-accent flex-none" checked={gekozenAard === aard} onChange={() => setGekozenAard(aard)} />
              <span>
                <span className="block font-semibold text-primary">
                  {t}
                  {a.voorstel === aard && <span className="ml-1.5 inline-flex items-center min-h-[22px] px-2 rounded-full bg-accent text-white text-xs font-semibold">Voorstel</span>}
                </span>
                <span className="block mt-1 text-[13px] leading-snug text-text-soft">{u}</span>
              </span>
            </label>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <TekstKnop onClick={() => volgendeAfwijking(null)}>Weet ik niet, volgende</TekstKnop>
          <Knop onClick={() => volgendeAfwijking(gekozenAard)}>Volgende</Knop>
        </div>
      </>
    );
  }

  function renderOverzicht() {
    if (!overzicht || !samenvatting) return null;
    const n = Math.max(1, overzicht.maanden.length);
    const som = (k: "inkomenCent" | "ontvangstCent" | "vastCent" | "nietMaandelijksCent" | "dagelijksCent" | "aflossingCent" | "overCent") => overzicht.perMaand.reduce((s, m) => s + m[k], 0);
    const inkomen = (som("inkomenCent") + som("ontvangstCent")) / n;
    const vast = som("vastCent") / n;
    const nm = som("nietMaandelijksCent") / n;
    const dag = som("dagelijksCent") / n;
    const over = som("overCent") / n;
    const aflossing = som("aflossingCent");
    const balk: [string, number, string][] = [
      ["Vaste lasten", vast, "#0B7A6E"],
      ["Niet elke maand", nm, "#B4532F"],
      ["Dagelijks", dag, "#7FB5AB"],
      ["Over", Math.max(0, over), "#D6E7E2"],
    ];
    const nmTotaal = som("nietMaandelijksCent");
    const nmPosten = overzicht.nietMaandelijks.slice(0, 5);
    const dagelijks = overzicht.categorieTotalen
      .filter((c) => c.bak === "dagelijks")
      .map((c) => ({ label: CATEGORIEEN[c.categorie].label, cent: (c.totaalCent - c.losseGroteCent) / n }))
      .filter((c) => c.cent > 0)
      .sort((a, b) => b.cent - a.cent)
      .slice(0, 6);
    const gewoon = samenvatting.gemiddeldPerMaand.overGewoneMaand;
    return (
      <>
        <Titel sub={"Gemiddeld per maand, over " + overzicht.maanden.map(maandNaam).join(", ") + "."}>Hier blijft jullie geld</Titel>
        <Kaart className="p-6 md:p-8 flex flex-col gap-5">
          <div className="flex justify-between items-baseline">
            <p className="m-0 text-[15px] md:text-[17px] text-text-soft">Er komt binnen</p>
            <p className="m-0 font-display text-[26px] md:text-[32px]">{euro(inkomen)}</p>
          </div>
          <div role="img" aria-label={balk.map(([l, c]) => l + " " + euro(c)).join(", ")} className="flex h-5 rounded-full overflow-hidden gap-[3px]">
            {balk.map(([l, c, k]) => (c > 0 ? <div key={l} style={{ flex: Math.max(1, Math.round(c)), background: k }} /> : null))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {balk.map(([l, c, k], i) => (
              <div key={l}>
                <p className="m-0 flex gap-2 items-center text-sm text-text-soft">
                  <span className="w-3 h-3 rounded-[3px]" style={{ background: k, border: i === 3 ? "1px solid #9FB3AC" : undefined }} />
                  {l}
                </p>
                <p className="m-0 mt-1.5 text-xl md:text-[22px] font-semibold">{i === 3 ? euro(over) : euro(c)}</p>
              </div>
            ))}
          </div>
          {Math.abs(gewoon * 100 - over) >= 10000 && (
            <p className="m-0 text-sm text-text-soft">Zonder grote losse bedragen die niet terugkomen, blijft er in een gewone maand {euroHeel(gewoon)} over.</p>
          )}
          {aflossing > 0 && <p className="m-0 text-sm text-text-soft">Daarnaast losten jullie in deze periode {euro(aflossing)} extra af. Dat telt hier niet als uitgave.</p>}
        </Kaart>

        <div className="grid md:grid-cols-[1.4fr_1fr] gap-5 md:gap-6">
          {nmTotaal > 0 ? (
            <div className="bg-[#FBEFE9] rounded-[20px] p-6 md:p-8 flex flex-col gap-3">
              <p className="m-0 text-sm font-semibold text-[#9A4426]">Wat het meest opvalt</p>
              <p className="m-0 font-display text-[32px] md:text-[42px] leading-none">
                {euro(nmTotaal)} in {n === 1 ? "één maand" : n + " maanden"}
              </p>
              <p className="m-0 text-base leading-relaxed">aan kosten die niet elke maand komen. Elke keer ging het af van wat er die maand overbleef.</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {nmPosten.map((p, i) => (
                  <span key={i} className="inline-flex items-center min-h-[32px] px-3 rounded-full bg-white border border-[#E8C9BA] text-sm">
                    {p.label} · {euro(p.bedragCent)}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <Kaart className="p-6 md:p-8">
              <p className="m-0 text-sm font-semibold text-accent">Kosten die niet elke maand komen</p>
              <p className="m-0 mt-2 text-base leading-relaxed">In deze maanden zag ik geen grote losse kosten. Die komen meestal wel: jaarpremies, belastingen, vakantie.</p>
            </Kaart>
          )}
          <Kaart className="p-6 md:p-7 flex flex-col gap-2.5">
            <p className="m-0 text-sm font-semibold text-accent">Wat overblijft per maand</p>
            {overzicht.perMaand.map((m) => (
              <div key={m.maand} className="flex justify-between text-[15px]">
                <span className="text-text-soft">{maandNaam(m.maand).replace(/^./, (c) => c.toUpperCase())}</span>
                <strong className={m.overCent < 0 ? "text-[#9A4426]" : ""}>{euro(m.overCent)}</strong>
              </div>
            ))}
            {samenvatting.sparen.nettoPerMaand !== 0 && (
              <p className="m-0 mt-1 text-sm text-text-soft leading-snug">
                {samenvatting.sparen.nettoPerMaand > 0
                  ? "Er ging gemiddeld " + euroHeel(samenvatting.sparen.nettoPerMaand) + " per maand naar jullie eigen potjes."
                  : "Er kwam gemiddeld " + euroHeel(-samenvatting.sparen.nettoPerMaand) + " per maand meer uit jullie eigen potjes dan erin ging."}
              </p>
            )}
          </Kaart>
        </div>

        <Kaart className="px-6 md:px-8 py-6">
          <p className="m-0 mb-1.5 font-semibold">Dagelijks, per maand</p>
          {dagelijks.map((d) => (
            <div key={d.label} className="flex justify-between py-2.5 border-b border-[#EDF0EE] text-[15px]">
              <span>{d.label}</span>
              <strong>{euro(d.cent)}</strong>
            </div>
          ))}
          <div className="pt-3">
            <TekstKnop onClick={() => setToonVast(!toonVast)}>
              {toonVast ? "Verberg de vaste lasten" : "Bekijk de vaste lasten (" + overzicht.vasteLasten.length + " posten)"}
            </TekstKnop>
          </div>
          {toonVast &&
            overzicht.vasteLasten.map((v) => (
              <div key={v.groep} className="flex justify-between py-2 border-b border-[#EDF0EE] text-[15px]">
                <span>{v.label}</span>
                <strong>{euro(v.perMaandCent)}</strong>
              </div>
            ))}
        </Kaart>

        {samenvatting.kwaliteit.aandeelOnbekend >= 20 && (
          <Melding>
            {samenvatting.kwaliteit.aandeelOnbekend} procent van de uitgaven is nog niet ingedeeld. Je advies wordt beter als je die eerst nakijkt.{" "}
            <TekstKnop onClick={() => naar("alles_nalopen")}>Nu nalopen</TekstKnop>
          </Melding>
        )}

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="text-sm text-text-soft leading-relaxed">
            Berekend op je apparaat. Voor je voorlopig advies gaat een samenvatting zonder namen en rekeningnummers naar een AI-dienst.{" "}
            <TekstKnop onClick={() => setToonSamenvatting(!toonSamenvatting)}>{toonSamenvatting ? "Verberg" : "Bekijk wat"}</TekstKnop>
          </div>
          <Knop onClick={() => void maakAdvies()}>Maak mijn voorlopig advies</Knop>
        </div>
        {toonSamenvatting && <pre className="m-0 max-h-[360px] overflow-auto bg-white rounded-xl p-4 text-xs leading-relaxed border border-[#DCE2DF]">{JSON.stringify(samenvatting, null, 2)}</pre>}
      </>
    );
  }

  function renderAdvies() {
    const periode = overzicht ? overzicht.maanden.map(maandNaam).join(", ") : "";
    if (adviesStatus === "bezig")
      return (
        <Kaart className="p-8 flex flex-col gap-3 items-start">
          <p className="m-0 font-display text-2xl">Je voorlopig advies wordt gemaakt</p>
          <p className="m-0 text-text-soft">Dit duurt ongeveer twintig seconden. Sluit deze pagina niet.</p>
          <div className="h-1.5 w-full rounded-full bg-[#E6E9E7] overflow-hidden">
            <div className="h-1.5 w-1/3 rounded-full bg-accent animate-pulse" />
          </div>
        </Kaart>
      );
    if (adviesStatus !== "klaar" || !advies)
      return (
        <>
          <Melding soort="fout">
            {adviesStatus === "te_onvolledig"
              ? "Een te groot deel van de uitgaven is nog niet ingedeeld om er iets zinnigs over te zeggen. Loop de onbekende posten even na."
              : adviesStatus === "te_druk"
              ? "Het is nu even te druk. Probeer het over een paar minuten nog eens."
              : "Het voorlopig advies lukte niet. Probeer het nog eens."}
          </Melding>
          <div className="flex gap-4 items-center">
            {adviesStatus === "te_onvolledig" ? <Knop onClick={() => naar("alles_nalopen")}>Posten nalopen</Knop> : <Knop onClick={() => void maakAdvies()}>Opnieuw proberen</Knop>}
            <TekstKnop onClick={vorige}>Terug naar het overzicht</TekstKnop>
          </div>
        </>
      );
    return (
      <>
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-3 items-center">
            <span className="inline-flex items-center min-h-[30px] px-3 rounded-full bg-[#E4F1EE] text-accent text-sm font-semibold">Voorlopig advies · gratis</span>
            <span className="text-sm text-text-soft">Automatisch opgesteld uit je eigen cijfers · {periode}</span>
          </div>
          <h1 className="font-display font-light text-[30px] md:text-[44px] leading-[1.15] m-0">{advies.kern}</h1>
          <p className="m-0 text-base md:text-lg leading-relaxed text-text-soft">{advies.toelichting}</p>
        </div>
        <div className="flex flex-col gap-4">
          <p className="m-0 text-sm font-semibold text-accent">Drie dingen die opvallen</p>
          <div className="grid md:grid-cols-3 gap-4 md:gap-5">
            {advies.opvallend.map((o, i) => (
              <Kaart key={i} className="p-6 flex flex-col gap-2">
                <p className="m-0 font-display text-[26px]">{o.getal}</p>
                <p className="m-0 font-semibold">{o.titel}</p>
                <p className="m-0 text-[15px] leading-relaxed text-text-soft">{o.uitleg}</p>
              </Kaart>
            ))}
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-5 md:gap-6">
          <Kaart className="p-6 md:p-7">
            <p className="m-0 font-semibold">Wat goed gaat</p>
            <p className="m-0 mt-2 text-[15px] leading-relaxed text-text-soft">{advies.watGoedGaat}</p>
          </Kaart>
          <div className="bg-primary text-white rounded-[20px] p-6 md:p-7">
            <p className="m-0 text-sm font-semibold text-[#9FD3C9]">Wat je vanavond al kunt doen</p>
            <p className="m-0 mt-2 text-base leading-relaxed">{advies.eersteStap}</p>
          </div>
        </div>
        <Kaart className="p-6 md:p-9 border-[1.5px] border-accent grid md:grid-cols-[1.25fr_1fr] gap-6 md:gap-9">
          <div className="flex flex-col gap-3.5">
            <p className="m-0 text-sm font-semibold text-accent">Geldscan</p>
            <p className="m-0 font-display font-light text-[26px] md:text-[32px] leading-tight">Je plan op maat, binnen 24 uur na betaling</p>
            <p className="m-0 text-base leading-relaxed text-text-soft">Wat je volledige plan voor jullie regelt:</p>
            <ul className="m-0 pl-5 flex flex-col gap-2 text-[15px] leading-relaxed">
              {advies.inHetPlan.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
            <p className="m-0 text-sm leading-relaxed text-text-soft">
              <strong className="text-primary">Jarno</strong>, ik maak het plan met jullie cijfers en kijk het zelf na voordat je het krijgt. Ik verdien zelf goed en heb jarenlang niet begrepen waarom het nooit klopte.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            {["Potjes en bedragen, afgestemd op jullie doel", "Welke overboekingen je instelt, op welke dag", "Wanneer de kosten komen die niet elke maand komen", "Na 6 weken een check of het werkt"].map((t) => (
              <p key={t} className="m-0 flex gap-2.5 items-start text-[15px] leading-snug">
                <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0B7A6E" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="flex-none mt-0.5">
                  <path d="M5 12l5 5 9-10" />
                </svg>
                {t}
              </p>
            ))}
            <div className="flex items-baseline gap-2.5 mt-1">
              <p className="m-0 font-display text-[40px]">€ 49</p>
              <p className="m-0 text-sm text-text-soft">eenmalig · geen abonnement</p>
            </div>
            <Knop breed onClick={() => naar("geldscan_aanvragen")}>
              Vraag je plan op maat aan
            </Knop>
            <p className="m-0 text-sm text-text-soft text-center">Je samenvatting gaat mee. Je hoeft niets opnieuw aan te leveren.</p>
          </div>
        </Kaart>
      </>
    );
  }

  function renderAanvragen() {
    return (
      <div className="grid md:grid-cols-[1fr_300px] gap-8 items-start">
        <form
          className="flex flex-col gap-7"
          onSubmit={(e) => {
            e.preventDefault();
            void verstuurAanvraag();
          }}
        >
          <Titel sub="Je cijfers heb ik al. Wat ik niet uit een afschrift haal, is waar jullie naartoe willen en wat er eens per jaar komt.">Nog vier vragen, dan maak ik je plan</Titel>
          <fieldset className="border-0 m-0 p-0 flex flex-col gap-3">
            <legend className="font-semibold text-[17px] mb-3">
              1. Waar willen jullie naartoe? <span className="font-normal text-text-soft text-[15px]">Meer kiezen mag</span>
            </legend>
            <div className="flex flex-wrap gap-2.5">
              {DOELEN.map((d) => {
                const aan = doelen.includes(d.sleutel);
                return (
                  <label key={d.sleutel} className={`inline-flex items-center gap-2 min-h-[46px] px-4 rounded-[14px] border-[1.5px] bg-white text-[15px] font-medium cursor-pointer ${aan ? "border-accent bg-[#E4F1EE]" : "border-[#C7CFCB]"}`}>
                    <input type="checkbox" className="w-[18px] h-[18px] accent-accent" checked={aan} onChange={() => setDoelen(aan ? doelen.filter((x) => x !== d.sleutel) : [...doelen, d.sleutel])} />
                    {d.label}
                  </label>
                );
              })}
            </div>
          </fieldset>
          <fieldset className="border-0 m-0 p-0">
            <legend className="font-semibold text-[17px] mb-3">2. Wie regelt het geld bij jullie?</legend>
            <div className="flex flex-wrap gap-2.5">
              {WIE_REGELT.map((w) => (
                <label key={w.sleutel} className={`inline-flex items-center gap-2 min-h-[46px] px-4 rounded-[14px] border-[1.5px] bg-white text-[15px] font-medium cursor-pointer ${wieRegelt === w.sleutel ? "border-accent bg-[#E4F1EE]" : "border-[#C7CFCB]"}`}>
                  <input type="radio" name="wie" className="w-[18px] h-[18px] accent-accent" checked={wieRegelt === w.sleutel} onChange={() => setWieRegelt(w.sleutel)} />
                  {w.label}
                </label>
              ))}
            </div>
          </fieldset>
          <label className="flex flex-col gap-2">
            <span className="font-semibold text-[17px]">
              3. Wat voelt nu het krapst? <span className="font-normal text-text-soft text-[15px]">Mag leeg</span>
            </span>
            <textarea rows={3} maxLength={600} value={krapst} onChange={(e) => setKrapst(e.target.value)} placeholder="Bijvoorbeeld: de laatste week voor het salaris" className="border-[1.5px] border-[#C7CFCB] rounded-xl p-3.5 text-base bg-white" />
          </label>
          <fieldset className="border-0 m-0 p-0 flex flex-col gap-1.5">
            <legend className="font-semibold text-[17px] mb-1">
              4. Welke kosten komen nog? <span className="font-normal text-text-soft text-[15px]">Mag leeg</span>
            </legend>
            <p className="m-0 mb-1 text-[15px] leading-relaxed text-text-soft">In een paar maanden afschrift zie ik niet alles wat eens per jaar komt. Vink aan wat bij jullie speelt. Bedrag niet bekend? Laat het leeg, dan schat ik het.</p>
            {JAARKOSTEN.map((j) => (
              <div key={j.sleutel} className="grid grid-cols-[22px_minmax(0,1fr)_110px] gap-3 items-center py-2.5 border-b border-[#EDF0EE]">
                <input type="checkbox" id={"jk-" + j.sleutel} className="w-5 h-5 accent-accent" checked={!!jaarAan[j.sleutel]} onChange={(e) => setJaarAan({ ...jaarAan, [j.sleutel]: e.target.checked })} />
                <label htmlFor={"jk-" + j.sleutel}>
                  <span className="block font-semibold text-[15px]">{j.label}</span>
                  <span className="block text-[13px] text-text-soft">Meestal in {j.maand}</span>
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  aria-label={"Bedrag " + j.label}
                  placeholder="€ weet niet"
                  value={jaarBedrag[j.sleutel] ?? ""}
                  onChange={(e) => {
                    setJaarBedrag({ ...jaarBedrag, [j.sleutel]: e.target.value });
                    if (e.target.value) setJaarAan({ ...jaarAan, [j.sleutel]: true });
                  }}
                  className="min-h-[42px] border-[1.5px] border-[#C7CFCB] rounded-[10px] px-2.5 text-right bg-white text-[15px]"
                />
              </div>
            ))}
            {extraJaar.map((x, i) => (
              <div key={i} className="grid grid-cols-[minmax(0,1fr)_110px] gap-3 items-center py-2.5 border-b border-[#EDF0EE]">
                <input
                  type="text"
                  maxLength={60}
                  aria-label="Wat"
                  placeholder="Wat komt er nog?"
                  value={x.label}
                  onChange={(e) => setExtraJaar(extraJaar.map((y, k) => (k === i ? { label: e.target.value, bedrag: y.bedrag } : y)))}
                  className="min-h-[42px] border-[1.5px] border-[#C7CFCB] rounded-[10px] px-2.5 bg-white text-[15px]"
                />
                <input
                  type="text"
                  inputMode="numeric"
                  aria-label="Bedrag"
                  placeholder="€"
                  value={x.bedrag}
                  onChange={(e) => setExtraJaar(extraJaar.map((y, k) => (k === i ? { label: y.label, bedrag: e.target.value } : y)))}
                  className="min-h-[42px] border-[1.5px] border-[#C7CFCB] rounded-[10px] px-2.5 text-right bg-white text-[15px]"
                />
              </div>
            ))}
            {extraJaar.length < 5 && (
              <div className="pt-2">
                <TekstKnop onClick={() => setExtraJaar([...extraJaar, { label: "", bedrag: "" }])}>+ Iets anders toevoegen</TekstKnop>
              </div>
            )}
          </fieldset>
          <div className="grid sm:grid-cols-2 gap-4">
            <label className="flex flex-col gap-1.5 text-sm font-semibold">
              Voornaam
              <input type="text" required maxLength={60} autoComplete="given-name" value={naam} onChange={(e) => setNaam(e.target.value)} className="min-h-[48px] border-[1.5px] border-[#C7CFCB] rounded-xl px-3.5 text-base bg-white font-normal" />
            </label>
            <label className="flex flex-col gap-1.5 text-sm font-semibold">
              E-mailadres
              <input type="email" required maxLength={200} autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className="min-h-[48px] border-[1.5px] border-[#C7CFCB] rounded-xl px-3.5 text-base bg-white font-normal" />
            </label>
          </div>
          <p className="m-0 text-sm leading-relaxed text-text-soft">Je samenvatting gaat mee met je aanvraag: maandtotalen en categorieën, zonder namen of rekeningnummers. Ik verwijder hem nadat je plan verstuurd is.</p>
          {aanvraagFout && <Melding soort="fout">{aanvraagFout}</Melding>}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <Knop type="submit" uit={aanvraagBezig || !naam.trim() || !email.trim()}>
              {aanvraagBezig ? "Bezig met versturen..." : "Vraag mijn plan aan"}
            </Knop>
            <span className="text-sm text-text-soft">Je betaalt pas na het betaalverzoek in je mail</span>
          </div>
        </form>
        <Kaart className="p-6 flex flex-col gap-3 md:sticky md:top-24">
          <p className="m-0 font-display text-xl">Je Geldscan</p>
          <div className="flex items-baseline gap-2">
            <p className="m-0 font-display text-[34px]">€ 49</p>
            <p className="m-0 text-sm text-text-soft">eenmalig</p>
          </div>
          {["Binnen 24 uur na betaling in je mail", "Door mij nagekeken voordat je het krijgt", "Na 6 weken een check of het werkt", "Betaalverzoek: Tikkie of overboeking"].map((t) => (
            <p key={t} className="m-0 flex gap-2 text-sm leading-snug">
              <span aria-hidden="true" className="text-accent">✓</span>
              {t}
            </p>
          ))}
          <p className="m-0 pt-3 border-t border-[#EDF0EE] text-xs text-text-soft">Gebaseerd op je afschrift · {overzicht ? overzicht.maanden.map(maandNaam).join(", ") : ""}</p>
        </Kaart>
      </div>
    );
  }

  function renderVerzonden() {
    return (
      <>
        <Titel sub="Zo gaat het verder.">Je aanvraag is binnen{naam.trim() ? ", " + naam.trim() : ""}</Titel>
        <Kaart className="p-6 md:p-7">
          <ol className="m-0 p-0 list-none flex flex-col gap-5">
            {[
              ["Betaalverzoek in je mail", "Tikkie of overboeking, € 49. Kijk ook even in je ongewenste mail."],
              ["Ik stel je plan op en kijk het na", "Met jullie cijfers en jullie antwoorden."],
              ["Binnen 24 uur na betaling in je mail", "Als pdf en als Excel. Vragen kun je gewoon op die mail beantwoorden."],
              ["Je samenvatting wordt verwijderd", "Nadat je plan verstuurd is."],
            ].map(([t, u], i) => (
              <li key={t} className="flex gap-3">
                <span className="flex-none w-7 h-7 rounded-full bg-[#E4F1EE] text-accent text-sm font-semibold flex items-center justify-center">{i + 1}</span>
                <span>
                  <span className="block font-semibold">{t}</span>
                  <span className="block text-sm text-text-soft mt-0.5">{u}</span>
                </span>
              </li>
            ))}
          </ol>
        </Kaart>
        {advies && (
          <div className="bg-primary text-white rounded-[20px] p-6">
            <p className="m-0 text-sm font-semibold text-[#9FD3C9]">Wil je alvast beginnen?</p>
            <p className="m-0 mt-2 leading-relaxed">{advies.eersteStap}</p>
          </div>
        )}
      </>
    );
  }
}
