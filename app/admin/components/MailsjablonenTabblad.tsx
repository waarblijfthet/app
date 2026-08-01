"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { DOELGROEP_LABEL, DOELGROEPEN } from "@/lib/outreach/labels";
import { alineaNaarHtml } from "@/lib/outreach/render";

type MailType = "eerste" | "fu1" | "fu2";

const TYPE_LABEL: Record<MailType, string> = {
  eerste: "Eerste mail",
  fu1: "Follow-up 1",
  fu2: "Follow-up 2",
};

// Altijd zichtbare (niet alleen bij hover) legende met de ondersteunde
// opmaak, met een title-tooltip erbij voor een voorbeeld. Jarno vroeg
// hiernaar (1-aug-2026) omdat de eerdere uitleg alleen een lopende zin was
// die makkelijk over het hoofd gezien wordt; dit staat nu direct boven elk
// bewerkveld waar opmaak werkt.
function OpmaakHulp() {
  const badge = "bg-white border border-[#D9DEDC] rounded px-1.5 py-0.5 cursor-help";
  return (
    <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#4A5A56]">
      <span className="text-[10px] uppercase tracking-wide text-[#8B958F]">Opmaak:</span>
      <span title={'Voorbeeld: **belangrijk** wordt "belangrijk" in vet.'} className={badge}>
        <strong>**vet**</strong>
      </span>
      <span title={'Voorbeeld: *nadruk* of _nadruk_ wordt "nadruk" cursief.'} className={badge}>
        <em>*cursief*</em>
      </span>
      <span
        title={"Voorbeeld: [bekijk mijn site](https://www.waarblijfthet.nl) wordt een klikbare link."}
        className={badge}
      >
        [linktekst](https://...)
      </span>
    </div>
  );
}

interface TemplateItem {
  doelgroep: string;
  type: MailType;
  subject: string | null;
  subjectNaamloos: string | null;
  regioZin: string | null;
  alineas: string[];
  aangepast: boolean;
  updatedAt: string | null;
}

// Zet het array van alineas om naar één bewerkbare tekst: paragrafen
// gescheiden door een lege regel, precies zoals naarText() ze ook weer
// samenvoegt (alineas.join("\n\n")). Enkele \n binnen een paragraaf (zoals
// de genummerde lijst in de FU1-mails) blijft behouden.
function alineasNaarTekst(alineas: string[]): string {
  return alineas.join("\n\n");
}
function tekstNaarAlineas(tekst: string): string[] {
  return tekst
    .split(/\n{2,}/)
    .map((a) => a.trim())
    .filter((a) => a.length > 0);
}

// Render van de tokens + de [tekst](url)-linksyntax voor het voorbeeld, met
// vaste voorbeeldnaam, plaats en ps-zin. De tokenlogica ({{GROET}} etc.) is
// hier bewust los gehouden van lib/outreach/mails.ts (puur illustratie in de
// browser), maar de link-omzetting (alineaNaarHtml) komt uit
// lib/outreach/render.ts, dezelfde functie die de echte mail ook gebruikt,
// zodat de preview daar nooit in afwijkt.
const VOORBEELD_GROET = "Beste Jan,";
const VOORBEELD_PS = "(voorbeeld: hier komt de losse ps-zin van dit contact te staan)";
function renderVoorbeeld(
  item: Pick<TemplateItem, "type" | "subject" | "subjectNaamloos" | "regioZin" | "alineas">,
  handtekening: string
): { subject: string; html: string } {
  const regio = item.regioZin ? item.regioZin.replace(/\{\{plaats\}\}/g, "Utrecht") : null;
  const regels = item.alineas
    .map((regelRuw) => {
      const regel = regelRuw.trim();
      if (regel === "{{GROET}}") return VOORBEELD_GROET;
      if (regel === "{{PS}}") return VOORBEELD_PS;
      if (regel === "{{REGIO}}") return regio ?? "";
      return regelRuw;
    })
    .filter((r) => r.length > 0);
  const subjectTemplate = item.subject ?? "";
  const subject =
    item.type === "eerste"
      ? subjectTemplate.replace(/\{\{voornaam\}\}/g, "Jan")
      : `Re: ${subjectTemplate.replace(/\{\{voornaam\}\}/g, "Jan")}`;
  const paragrafen = [...regels, handtekening].map((r) => `<p style="margin:0 0 14px 0;">${alineaNaarHtml(r)}</p>`);
  return { subject, html: paragrafen.join("\n") };
}

export default function MailsjablonenTabblad() {
  const [items, setItems] = useState<TemplateItem[]>([]);
  const [laden, setLaden] = useState(true);
  const [fout, setFout] = useState<string | null>(null);
  const [doelgroep, setDoelgroep] = useState<string>(DOELGROEPEN[0].value);
  const [type, setType] = useState<MailType>("eerste");

  // Bewerkveldjes, losstaand van "items" totdat opgeslagen (anders springt
  // de tekst terug bij elke re-render).
  const [subject, setSubject] = useState("");
  const [subjectNaamloos, setSubjectNaamloos] = useState("");
  const [regioZin, setRegioZin] = useState("");
  const [tekst, setTekst] = useState("");
  const [opslaanBezig, setOpslaanBezig] = useState(false);
  const [opslaanFout, setOpslaanFout] = useState<string | null>(null);
  const [zojuistOpgeslagen, setZojuistOpgeslagen] = useState(false);
  const [resetBevestigen, setResetBevestigen] = useState(false);

  // Handtekening, los van de sjablonen (geldt voor alle doelgroepen/mailtypen).
  const [handtekeningOrigineel, setHandtekeningOrigineel] = useState("");
  const [handtekeningAangepast, setHandtekeningAangepast] = useState(false);
  const [handtekening, setHandtekening] = useState("");
  const [handtekeningBezig, setHandtekeningBezig] = useState(false);
  const [handtekeningFout, setHandtekeningFout] = useState<string | null>(null);
  const [handtekeningOpgeslagen, setHandtekeningOpgeslagen] = useState(false);
  const [handtekeningResetBevestigen, setHandtekeningResetBevestigen] = useState(false);

  const laadTemplates = useCallback(async () => {
    setLaden(true);
    setFout(null);
    try {
      const [templatesRes, handtekeningRes] = await Promise.all([
        fetch("/api/admin/outreach/templates"),
        fetch("/api/admin/outreach/handtekening"),
      ]);
      const templatesData = await templatesRes.json();
      if (!templatesRes.ok) throw new Error(templatesData.error ?? `HTTP ${templatesRes.status}`);
      setItems(templatesData.items ?? []);

      const handtekeningData = await handtekeningRes.json();
      if (!handtekeningRes.ok) throw new Error(handtekeningData.error ?? `HTTP ${handtekeningRes.status}`);
      setHandtekeningOrigineel(handtekeningData.tekst ?? "");
      setHandtekening(handtekeningData.tekst ?? "");
      setHandtekeningAangepast(Boolean(handtekeningData.aangepast));
    } catch (err) {
      setFout(String(err));
    } finally {
      setLaden(false);
    }
  }, []);

  useEffect(() => {
    void laadTemplates();
  }, [laadTemplates]);

  const huidig = useMemo(
    () => items.find((i) => i.doelgroep === doelgroep && i.type === type) ?? null,
    [items, doelgroep, type]
  );

  // Bewerkvelden vullen zodra het huidige item verandert (na laden, of na
  // wisselen van doelgroep/mailtype).
  useEffect(() => {
    if (!huidig) return;
    setSubject(huidig.subject ?? "");
    setSubjectNaamloos(huidig.subjectNaamloos ?? "");
    setRegioZin(huidig.regioZin ?? "");
    setTekst(alineasNaarTekst(huidig.alineas));
    setOpslaanFout(null);
    setZojuistOpgeslagen(false);
    setResetBevestigen(false);
  }, [huidig]);

  const isVuil = useMemo(() => {
    if (!huidig) return false;
    if (huidig.type === "eerste") {
      if ((huidig.subject ?? "") !== subject) return true;
      if ((huidig.subjectNaamloos ?? "") !== subjectNaamloos) return true;
      if ((huidig.regioZin ?? "") !== regioZin) return true;
    }
    return alineasNaarTekst(huidig.alineas) !== tekst;
  }, [huidig, subject, subjectNaamloos, regioZin, tekst]);

  const handtekeningIsVuil = handtekening !== handtekeningOrigineel;

  async function opslaan() {
    setOpslaanBezig(true);
    setOpslaanFout(null);
    try {
      const res = await fetch("/api/admin/outreach/templates", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          doelgroep,
          type,
          subject: type === "eerste" ? subject : null,
          subjectNaamloos: type === "eerste" ? subjectNaamloos : null,
          regioZin: type === "eerste" ? regioZin : null,
          alineas: tekstNaarAlineas(tekst),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? `HTTP ${res.status}`);
      setZojuistOpgeslagen(true);
      await laadTemplates();
    } catch (err) {
      setOpslaanFout(String(err));
    } finally {
      setOpslaanBezig(false);
    }
  }

  async function terugNaarStandaard() {
    setOpslaanBezig(true);
    setOpslaanFout(null);
    try {
      const res = await fetch(
        `/api/admin/outreach/templates?doelgroep=${encodeURIComponent(doelgroep)}&type=${encodeURIComponent(type)}`,
        { method: "DELETE" }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? `HTTP ${res.status}`);
      setResetBevestigen(false);
      await laadTemplates();
    } catch (err) {
      setOpslaanFout(String(err));
    } finally {
      setOpslaanBezig(false);
    }
  }

  async function handtekeningOpslaan() {
    setHandtekeningBezig(true);
    setHandtekeningFout(null);
    try {
      const res = await fetch("/api/admin/outreach/handtekening", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tekst: handtekening }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? `HTTP ${res.status}`);
      setHandtekeningOpgeslagen(true);
      await laadTemplates();
    } catch (err) {
      setHandtekeningFout(String(err));
    } finally {
      setHandtekeningBezig(false);
    }
  }

  async function handtekeningTerugNaarStandaard() {
    setHandtekeningBezig(true);
    setHandtekeningFout(null);
    try {
      const res = await fetch("/api/admin/outreach/handtekening", { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? `HTTP ${res.status}`);
      setHandtekeningResetBevestigen(false);
      await laadTemplates();
    } catch (err) {
      setHandtekeningFout(String(err));
    } finally {
      setHandtekeningBezig(false);
    }
  }

  const voorbeeld = huidig
    ? renderVoorbeeld({ type, subject, subjectNaamloos, regioZin, alineas: tekstNaarAlineas(tekst) }, handtekening)
    : null;

  const pill = (actief: boolean) =>
    `text-sm px-3 py-1.5 rounded-lg font-medium transition-colors ${
      actief ? "bg-[#16211F] text-white" : "border border-[#D9DEDC] text-[#4A5A56] hover:bg-[#F7F8F7]"
    }`;

  if (laden) return <p className="text-sm text-[#4A5A56]">Laden…</p>;
  if (fout) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 text-red-800 text-sm px-4 py-3">{fout}</div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-light text-[#16211F]">Mailsjablonen</h1>
        <p className="text-sm text-[#4A5A56] mt-1">
          De teksten die de outreach-mails gebruiken, per doelgroep en per moment in de reeks. Wijzigingen
          gelden meteen voor nieuwe verzendingen (handmatig en via de automatische follow-up-cron). Overal
          waar je tekst kunt bewerken (de sjablonen en de handtekening) werkt dezelfde lichte opmaak: vet,
          cursief en een klikbare link. Het legendaatje boven elk tekstveld laat de syntax zien; hover erover
          voor een voorbeeld. In de platte-tekstversie van de mail (voor mailprogramma&apos;s zonder html)
          verdwijnen vet/cursief-markers en wordt een link &quot;tekst (url)&quot;.
        </p>
      </div>

      {/* Handtekening, geldt voor alle doelgroepen en mailtypen */}
      <div className="rounded-xl border border-[#E6E9E7] p-4 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <h2 className="font-display text-base font-medium text-[#16211F]">Handtekening</h2>
          {handtekeningAangepast && <span className="text-[10px] text-[#8B958F]">aangepast</span>}
        </div>
        <p className="text-xs text-[#8B958F]">
          Staat onderaan elke mail (eerste mail en beide follow-ups). Een lege regel = nieuwe regel.
        </p>
        <OpmaakHulp />
        <textarea
          className="w-full rounded-lg border border-[#D9DEDC] px-3 py-2 text-sm font-mono"
          rows={4}
          value={handtekening}
          onChange={(e) => setHandtekening(e.target.value)}
        />
        {handtekeningFout && (
          <div className="rounded-lg border border-red-200 bg-red-50 text-red-800 text-sm px-3 py-2">
            {handtekeningFout}
          </div>
        )}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => void handtekeningOpslaan()}
            disabled={!handtekeningIsVuil || handtekeningBezig}
            className="text-sm px-4 py-2 rounded-lg font-medium bg-[#16211F] text-white disabled:opacity-40"
          >
            {handtekeningBezig ? "Bezig…" : "Opslaan"}
          </button>
          {handtekeningOpgeslagen && !handtekeningIsVuil && (
            <span className="text-xs text-[#0B7A6E]">Opgeslagen</span>
          )}
          {handtekeningAangepast &&
            (handtekeningResetBevestigen ? (
              <span className="text-xs text-[#4A5A56] flex items-center gap-2">
                Zeker weten? Dit verwijdert de aanpassing.
                <button
                  type="button"
                  onClick={() => void handtekeningTerugNaarStandaard()}
                  className="underline text-red-700"
                >
                  Ja, terug naar standaard
                </button>
                <button type="button" onClick={() => setHandtekeningResetBevestigen(false)} className="underline">
                  Annuleren
                </button>
              </span>
            ) : (
              <button
                type="button"
                onClick={() => setHandtekeningResetBevestigen(true)}
                className="text-xs px-3 py-2 rounded-lg text-[#4A5A56] hover:bg-[#F7F8F7]"
              >
                Terug naar standaardtekst
              </button>
            ))}
        </div>
      </div>

      {/* Doelgroep-keuze */}
      <div className="flex flex-wrap gap-2">
        {DOELGROEPEN.map((d) => (
          <button key={d.value} type="button" className={pill(doelgroep === d.value)} onClick={() => setDoelgroep(d.value)}>
            {DOELGROEP_LABEL[d.value] ?? d.value}
          </button>
        ))}
      </div>

      {/* Mailtype-keuze */}
      <div className="flex flex-wrap gap-2">
        {(["eerste", "fu1", "fu2"] as MailType[]).map((t) => {
          const item = items.find((i) => i.doelgroep === doelgroep && i.type === t);
          return (
            <button key={t} type="button" className={pill(type === t)} onClick={() => setType(t)}>
              {TYPE_LABEL[t]}
              {item?.aangepast && <span className="ml-1.5 text-[10px] opacity-70">·aangepast</span>}
            </button>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Bewerkformulier */}
        <div className="space-y-4 rounded-xl border border-[#E6E9E7] p-4">
          <div className="text-xs text-[#8B958F] leading-relaxed">
            De regels <code className="bg-[#F7F8F7] px-1 rounded">{"{{GROET}}"}</code>,{" "}
            <code className="bg-[#F7F8F7] px-1 rounded">{"{{PS}}"}</code> en{" "}
            <code className="bg-[#F7F8F7] px-1 rounded">{"{{REGIO}}"}</code> zijn dynamisch: ze worden bij
            het versturen vervangen (of overgeslagen als er niets is, zoals bij een contact zonder
            plaats). Laat ze op hun eigen regel staan, verplaats ze gerust, maar typ er zelf niets in.
            {type === "eerste" && (
              <>
                {" "}
                In het onderwerp mag <code className="bg-[#F7F8F7] px-1 rounded">{"{{voornaam}}"}</code>{" "}
                gebruikt worden.
              </>
            )}
          </div>
          <OpmaakHulp />

          {type === "eerste" && (
            <>
              <label className="block">
                <span className="text-xs font-medium text-[#16211F]">Onderwerp (bij een betrouwbare naam)</span>
                <input
                  className="mt-1 w-full rounded-lg border border-[#D9DEDC] px-3 py-2 text-sm"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </label>
              <label className="block">
                <span className="text-xs font-medium text-[#16211F]">Onderwerp zonder betrouwbare naam</span>
                <input
                  className="mt-1 w-full rounded-lg border border-[#D9DEDC] px-3 py-2 text-sm"
                  value={subjectNaamloos}
                  onChange={(e) => setSubjectNaamloos(e.target.value)}
                />
              </label>
              <label className="block">
                <span className="text-xs font-medium text-[#16211F]">Regio-zin (alleen bij bekende plaats)</span>
                <input
                  className="mt-1 w-full rounded-lg border border-[#D9DEDC] px-3 py-2 text-sm"
                  value={regioZin}
                  onChange={(e) => setRegioZin(e.target.value)}
                  placeholder="Ik zoek bewust iemand in de regio {{plaats}}; ..."
                />
              </label>
            </>
          )}

          <label className="block">
            <span className="text-xs font-medium text-[#16211F]">Tekst (een lege regel = nieuwe alinea)</span>
            <textarea
              className="mt-1 w-full rounded-lg border border-[#D9DEDC] px-3 py-2 text-sm font-mono"
              rows={16}
              value={tekst}
              onChange={(e) => setTekst(e.target.value)}
            />
          </label>

          {opslaanFout && (
            <div className="rounded-lg border border-red-200 bg-red-50 text-red-800 text-sm px-3 py-2">
              {opslaanFout}
            </div>
          )}

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => void opslaan()}
              disabled={!isVuil || opslaanBezig}
              className="text-sm px-4 py-2 rounded-lg font-medium bg-[#16211F] text-white disabled:opacity-40"
            >
              {opslaanBezig ? "Bezig…" : "Opslaan"}
            </button>
            {zojuistOpgeslagen && !isVuil && <span className="text-xs text-[#0B7A6E]">Opgeslagen</span>}
            {huidig?.aangepast && (
              resetBevestigen ? (
                <span className="text-xs text-[#4A5A56] flex items-center gap-2">
                  Zeker weten? Dit verwijdert de aanpassing.
                  <button type="button" onClick={() => void terugNaarStandaard()} className="underline text-red-700">
                    Ja, terug naar standaard
                  </button>
                  <button type="button" onClick={() => setResetBevestigen(false)} className="underline">
                    Annuleren
                  </button>
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => setResetBevestigen(true)}
                  className="text-xs px-3 py-2 rounded-lg text-[#4A5A56] hover:bg-[#F7F8F7]"
                >
                  Terug naar standaardtekst
                </button>
              )
            )}
          </div>
          {huidig && !huidig.aangepast && (
            <p className="text-xs text-[#8B958F]">
              Nog niet aangepast: dit is de standaardtekst uit de code. Opslaan maakt er een eigen versie van.
            </p>
          )}
        </div>

        {/* Voorbeeld, gerenderd zoals de html-mail (inclusief handtekening en klikbare links) */}
        <div className="space-y-2 rounded-xl border border-[#E6E9E7] p-4 bg-[#F7F8F7]">
          <p className="text-xs font-medium text-[#8B958F] uppercase tracking-wide">
            Voorbeeld (Jan, Utrecht{type === "eerste" ? ", met een ps-zin" : ""})
          </p>
          {type !== "eerste" && (
            <p className="text-xs text-[#8B958F]">
              Onderwerp is altijd &quot;Re: &quot; + het onderwerp van de eerste mail aan dit contact.
            </p>
          )}
          {voorbeeld && (
            <div className="rounded-lg bg-white border border-[#E6E9E7] p-4 text-sm text-[#16211F]">
              <p className="font-medium mb-3">{voorbeeld.subject}</p>
              {/* eslint-disable-next-line react/no-danger */}
              <div dangerouslySetInnerHTML={{ __html: voorbeeld.html }} />
            </div>
          )}
          <p className="text-xs text-[#8B958F]">
            Zo ziet de html-mail eruit; links zijn hier al klikbaar. In de platte-tekstversie (voor
            mailprogramma&apos;s zonder html) staat een link als &quot;linktekst (url)&quot;.
          </p>
        </div>
      </div>
    </div>
  );
}
