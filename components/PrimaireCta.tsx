import CtaLink from "@/components/CtaLink";
import {
  ANALYSE_UITWIJK_LABEL,
  ANALYSE_UITWIJK_VRAAG,
  PRIMAIRE_CTA_LABEL,
  PRIMAIRE_CTA_SUB,
  PRIMAIRE_ROUTE,
  analyseHref,
} from "@/lib/cta";

/**
 * De primaire knop van de site (sinds 9-nov-2026: de uitgavenscan, zie lib/cta.ts).
 * De styling komt van buiten via className en style, net als bij CtaLink.
 */
export default function PrimaireCta({
  locatie,
  className = "btn-primary",
  style,
}: {
  locatie: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <CtaLink doel="uitgavenscan" href={PRIMAIRE_ROUTE} locatie={locatie} className={className} style={style}>
      {PRIMAIRE_CTA_LABEL} <span aria-hidden="true">&rarr;</span>
    </CtaLink>
  );
}

/** De regel onder de knop. */
export function PrimaireCtaSub({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <p className={("font-body text-sm text-text-soft m-0 " + className).trim()} style={style}>
      {PRIMAIRE_CTA_SUB}
    </p>
  );
}

/**
 * De uitwijk naar de analyse, als tekstlink. Nooit als tweede knop: de bezoeker
 * hoeft niet te kiezen voordat hij weet wat het verschil is.
 */
export function AnalyseUitwijk({
  locatie,
  href,
  className = "",
  donker = false,
}: {
  locatie: string;
  href?: string;
  className?: string;
  donker?: boolean;
}) {
  return (
    <p className={("font-body text-sm m-0 " + className).trim()} style={{ color: donker ? "rgba(255,255,255,0.7)" : "#4A5A56" }}>
      {ANALYSE_UITWIJK_VRAAG}{" "}
      <CtaLink
        doel="analyse"
        href={href ?? analyseHref()}
        locatie={locatie + "-uitwijk"}
        className="font-medium underline underline-offset-2 hover:opacity-80"
        style={{ color: donker ? "#FFFFFF" : "#0B7A6E" }}
      >
        {ANALYSE_UITWIJK_LABEL}
      </CtaLink>{" "}
      (3 minuten, zonder bankbestand).
    </p>
  );
}
