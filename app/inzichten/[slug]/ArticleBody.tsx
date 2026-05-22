import GoedsalarisTochKrap from "./content/goed-salaris-toch-krap";
import BoodschappenDuitslandVoordeel from "./content/boodschappen-duitsland-voordeel";
import SpaardoelenMaandelijkseInleg from "./content/spaardoelen-maandelijkse-inleg";
import SalarisverhoginBoven76000 from "./content/salarisverhoging-boven-76000-weinig-netto";
import VergelijkenBoodschappenNederlandDuitsland from "./content/vergelijken-boodschappen-nederland-duitsland";
import WatIsNormaalBedragBoodschappen from "./content/wat-is-normaal-bedrag-boodschappen-per-maand";
import Is4000EuroNettoGoedSalaris from "./content/is-4000-euro-netto-goed-salaris-nederland";
import HoeveeSpaarenPerMaandNormaal from "./content/hoeveel-sparen-per-maand-normaal-nederland";

const contentMap: Record<string, () => JSX.Element> = {
  "goed-salaris-toch-krap": GoedsalarisTochKrap,
  "boodschappen-duitsland-voordeel": BoodschappenDuitslandVoordeel,
  "spaardoelen-maandelijkse-inleg": SpaardoelenMaandelijkseInleg,
  "salarisverhoging-boven-76000-weinig-netto": SalarisverhoginBoven76000,
  "vergelijken-boodschappen-nederland-duitsland": VergelijkenBoodschappenNederlandDuitsland,
  "wat-is-normaal-bedrag-boodschappen-per-maand": WatIsNormaalBedragBoodschappen,
  "is-4000-euro-netto-goed-salaris-nederland": Is4000EuroNettoGoedSalaris,
  "hoeveel-sparen-per-maand-normaal-nederland": HoeveeSpaarenPerMaandNormaal,
};

export default function ArticleBody({ slug }: { slug: string }) {
  const Content = contentMap[slug];
  if (!Content) return null;
  return <Content />;
}
