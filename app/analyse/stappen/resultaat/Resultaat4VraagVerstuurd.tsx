import CtaLink from "@/components/CtaLink";
import { geldscanHref } from "@/lib/cta";
import { RAPPORTEN, AANTAL_ZONDER_LEK } from "@/lib/rapporten-data";
import ToestemmingDataAsset from "./ToestemmingDataAsset";

interface Props {
  email: string;
  uiterlijk: string;
}

/**
 * Resultaatstap 4 na een verstuurde vraag (23-sep-2026). De Geldscan staat er
 * rustig bij als tekstlink met prijs, niet als grote knop: wie net een vraag
 * stelde, wacht eerst op het antwoord. De bewijsregel telt de echte rapporten.
 */
export default function Resultaat4VraagVerstuurd({ email, uiterlijk }: Props) {
  return (
    <div className="max-w-xl">
      <div className="card-base border border-[#A6D8CD] bg-green-light mb-8">
        <p className="font-display font-light text-primary text-2xl sm:text-3xl mb-2">Je vraag is binnen.</p>
        <p className="font-body text-sm text-text-soft leading-relaxed">
          Ik lees hem met je uitkomst erbij en je hoort uiterlijk {uiterlijk} van me op{" "}
          <strong className="text-primary">{email}</strong>. Je uitkomst staat ook in je mail, zodat je hem kunt
          terugzien.
        </p>
      </div>

      <p className="section-eyebrow mb-2">Wil je niet wachten?</p>
      <p className="font-body text-sm text-text-soft leading-relaxed mb-3">
        Bij de Geldscan kijk ik met je afschriften erbij waar het geld echt heen gaat. Persoonlijk geschreven, binnen 2
        werkdagen.
      </p>
      <CtaLink
        doel="geldscan"
        href={geldscanHref()}
        locatie="analyse-vraag-bevestiging"
        className="font-body text-sm text-accent underline underline-offset-2"
      >
        Vraag de Geldscan aan, €49 →
      </CtaLink>

      <p className="font-body text-sm text-text-soft border-t border-[#E6E9E7] pt-4 mt-8">
        Ik schreef er inmiddels {RAPPORTEN.length} uit. Bij {AANTAL_ZONDER_LEK} daarvan bleek er geen lek te zitten, en
        dat schreef ik er ook zo in.
      </p>

      <ToestemmingDataAsset />
    </div>
  );
}
