import GoedsalarisTochKrap from "./content/goed-salaris-toch-krap";
import BoodschappenDuitslandVoordeel from "./content/boodschappen-duitsland-voordeel";
import SpaardoelenMaandelijkseInleg from "./content/spaardoelen-maandelijkse-inleg";
import SalarisverhoginBoven76000 from "./content/salarisverhoging-boven-76000-weinig-netto";
import VergelijkenBoodschappenNederlandDuitsland from "./content/vergelijken-boodschappen-nederland-duitsland";
import WatIsNormaalBedragBoodschappen from "./content/wat-is-normaal-bedrag-boodschappen-per-maand";
import Is4000EuroNettoGoedSalaris from "./content/is-4000-euro-netto-goed-salaris-nederland";
import HoeveeSpaarenPerMaandNormaal from "./content/hoeveel-sparen-per-maand-normaal-nederland";
import WatZijnNormaleVasteLastenGezin from "./content/wat-zijn-normale-vaste-lasten-gezin";
import PotjesmethodeGezinHoeWerktHet from "./content/potjesmethode-gezin-hoe-werkt-het";
import GeldStressRelatieNederland from "./content/geld-stress-relatie-nederland";
import HoeBespaarJeOpBoodschappen from "./content/hoe-bespaar-je-op-boodschappen";
import NibudBoodschappenVersusWerkelijkheid from "./content/nibud-boodschappen-versus-werkelijkheid";
import KostenLevensonderhoudAlleenstaande2026 from "./content/kosten-levensonderhoud-alleenstaande-2026";
import LifestyleInflatieMeerVerdienenMeerUitgeven from "./content/lifestyle-inflatie-meer-verdienen-meer-uitgeven";
import TweeverdienersTochKrap from "./content/tweeverdieners-toch-krap";
import VijftigDertigTwintigRegelHogerInkomen from "./content/50-30-20-regel-hoger-inkomen";

const contentMap: Record<string, () => JSX.Element> = {
  "goed-salaris-toch-krap": GoedsalarisTochKrap,
  "boodschappen-duitsland-voordeel": BoodschappenDuitslandVoordeel,
  "spaardoelen-maandelijkse-inleg": SpaardoelenMaandelijkseInleg,
  "salarisverhoging-boven-76000-weinig-netto": SalarisverhoginBoven76000,
  "vergelijken-boodschappen-nederland-duitsland": VergelijkenBoodschappenNederlandDuitsland,
  "wat-is-normaal-bedrag-boodschappen-per-maand": WatIsNormaalBedragBoodschappen,
  "is-4000-euro-netto-goed-salaris-nederland": Is4000EuroNettoGoedSalaris,
  "hoeveel-sparen-per-maand-normaal-nederland": HoeveeSpaarenPerMaandNormaal,
  "wat-zijn-normale-vaste-lasten-gezin": WatZijnNormaleVasteLastenGezin,
  "potjesmethode-gezin-hoe-werkt-het": PotjesmethodeGezinHoeWerktHet,
  "geld-stress-relatie-nederland": GeldStressRelatieNederland,
  "hoe-bespaar-je-op-boodschappen": HoeBespaarJeOpBoodschappen,
  "nibud-boodschappen-versus-werkelijkheid": NibudBoodschappenVersusWerkelijkheid,
  "kosten-levensonderhoud-alleenstaande-2026": KostenLevensonderhoudAlleenstaande2026,
  "lifestyle-inflatie-meer-verdienen-meer-uitgeven": LifestyleInflatieMeerVerdienenMeerUitgeven,
  "tweeverdieners-toch-krap": TweeverdienersTochKrap,
  "50-30-20-regel-hoger-inkomen": VijftigDertigTwintigRegelHogerInkomen,
};

export default function ArticleBody({ slug }: { slug: string }) {
  const Content = contentMap[slug];
  if (!Content) return null;
  return <Content />;
}
