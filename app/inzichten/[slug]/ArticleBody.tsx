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
import VergetenAbonnementenOpzeggen from "./content/vergeten-abonnementen-opzeggen";
import WatKostDecemberFeestdagenGezin from "./content/wat-kost-december-feestdagen-gezin";
import AutoKopenOfLeasenKostenPerMaand from "./content/auto-kopen-of-leasen-kosten-per-maand";
import WaarBlijftHetBijSanneEnJoost from "./content/waar-blijft-het-bij-sanne-en-joost";
import WaarBlijftHetBijMarkEnLisa from "./content/waar-blijft-het-bij-mark-en-lisa";
import WaarBlijftHetBijFatima from "./content/waar-blijft-het-bij-fatima";
import WaarBlijftHetBijDavidEnTom from "./content/waar-blijft-het-bij-david-en-tom";
import SeizoensKostenkalenderPerMaand from "./content/seizoens-kostenkalender-per-maand";
import WatKostEenZomervakantieGezin from "./content/wat-kost-een-zomervakantie-gezin";
import ZonnepanelenTerugverdientijd from "./content/zonnepanelen-terugverdientijd";
import GeldmythesDieJeArmHouden from "./content/geldmythes-die-je-arm-houden";
import WatKostEenKindPerMaand from "./content/wat-kost-een-kind-per-maand";
import SchoolkostenPerJaarGezin from "./content/schoolkosten-per-jaar-gezin";
import HogereHypotheekWatKostHetPerMaand from "./content/hogere-hypotheek-wat-kost-het-per-maand";
import VerbouwenFinancieleValkuilen from "./content/verbouwen-financiele-valkuilen";
import ModaalInkomen2026 from "./content/modaal-inkomen-2026";
import OnsBoodschappenbudgetMislukte from "./content/ons-boodschappenbudget-mislukte-tot-we-dit-deden";
import KerstpotVerjaardagspotZoBouwdenWeDie from "./content/kerstpot-en-verjaardagspot-zo-bouwden-we-die";
import BsoKostenTweedeInkomen from "./content/bso-kosten-tweede-inkomen-zo-draaiden-we-het-om";
import PensioenAanvullenHoeveel from "./content/pensioen-aanvullen-hoeveel-heb-je-nodig";
import FinancieelOnafhankelijkWordenRealistisch from "./content/financieel-onafhankelijk-worden-realistisch";
import StudieschuldAflossenOfSparen from "./content/studieschuld-aflossen-of-sparen";
import GezamenlijkeRekeningVoorEnNadelen from "./content/gezamenlijke-rekening-voor-en-nadelen";
import TweedeInkomenLoonNietTweeverdieners from "./content/tweede-inkomen-loont-niet-tweeverdieners";

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
  "vergeten-abonnementen-opzeggen": VergetenAbonnementenOpzeggen,
  "wat-kost-december-feestdagen-gezin": WatKostDecemberFeestdagenGezin,
  "auto-kopen-of-leasen-kosten-per-maand": AutoKopenOfLeasenKostenPerMaand,
  "waar-blijft-het-bij-sanne-en-joost": WaarBlijftHetBijSanneEnJoost,
  "waar-blijft-het-bij-mark-en-lisa": WaarBlijftHetBijMarkEnLisa,
  "waar-blijft-het-bij-fatima": WaarBlijftHetBijFatima,
  "waar-blijft-het-bij-david-en-tom": WaarBlijftHetBijDavidEnTom,
  "seizoens-kostenkalender-per-maand": SeizoensKostenkalenderPerMaand,
  "wat-kost-een-zomervakantie-gezin": WatKostEenZomervakantieGezin,
  "zonnepanelen-terugverdientijd": ZonnepanelenTerugverdientijd,
  "geldmythes-die-je-arm-houden": GeldmythesDieJeArmHouden,
  "wat-kost-een-kind-per-maand": WatKostEenKindPerMaand,
  "schoolkosten-per-jaar-gezin": SchoolkostenPerJaarGezin,
  "hogere-hypotheek-wat-kost-het-per-maand": HogereHypotheekWatKostHetPerMaand,
  "verbouwen-financiele-valkuilen": VerbouwenFinancieleValkuilen,
  "modaal-inkomen-2026": ModaalInkomen2026,
  "ons-boodschappenbudget-mislukte-tot-we-dit-deden": OnsBoodschappenbudgetMislukte,
  "kerstpot-en-verjaardagspot-zo-bouwden-we-die": KerstpotVerjaardagspotZoBouwdenWeDie,
  "bso-kosten-tweede-inkomen-zo-draaiden-we-het-om": BsoKostenTweedeInkomen,
  "pensioen-aanvullen-hoeveel-heb-je-nodig": PensioenAanvullenHoeveel,
  "financieel-onafhankelijk-worden-realistisch": FinancieelOnafhankelijkWordenRealistisch,
  "studieschuld-aflossen-of-sparen": StudieschuldAflossenOfSparen,
  "gezamenlijke-rekening-voor-en-nadelen": GezamenlijkeRekeningVoorEnNadelen,
  "tweede-inkomen-loont-niet-tweeverdieners": TweedeInkomenLoonNietTweeverdieners,
};

export default function ArticleBody({ slug }: { slug: string }) {
  const Content = contentMap[slug];
  if (!Content) return null;
  return <Content />;
}
