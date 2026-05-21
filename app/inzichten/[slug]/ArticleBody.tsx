import GoedsalarisTochKrap from "./content/goed-salaris-toch-krap";
import BoodschappenDuitslandVoordeel from "./content/boodschappen-duitsland-voordeel";
import SpaardoelenMaandelijkseInleg from "./content/spaardoelen-maandelijkse-inleg";
import SalarisverhoginBoven76000 from "./content/salarisverhoging-boven-76000-weinig-netto";

const contentMap: Record<string, () => JSX.Element> = {
  "goed-salaris-toch-krap": GoedsalarisTochKrap,
  "boodschappen-duitsland-voordeel": BoodschappenDuitslandVoordeel,
  "spaardoelen-maandelijkse-inleg": SpaardoelenMaandelijkseInleg,
  "salarisverhoging-boven-76000-weinig-netto": SalarisverhoginBoven76000,
};

export default function ArticleBody({ slug }: { slug: string }) {
  const Content = contentMap[slug];
  if (!Content) return null;
  return <Content />;
}
