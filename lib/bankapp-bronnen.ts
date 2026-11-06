/**
 * Bronnen voor het artikel huishoudboekje-bankapp-rabobank-ing-abn-amro.
 * Elke URL is op BANKAPP_BRONNEN_DATUM geopend; de feiten in het artikel
 * staan op deze pagina's. Bankapps veranderen vaak: bij een update elke URL
 * opnieuw openen, deze datum bijwerken en `gewijzigd` zetten op het artikel.
 */
export const BANKAPP_BRONNEN_DATUM = "6 november 2026";

export const BANKAPP_BRONNEN = {
  raboInzicht: {
    label: "Rabobank: veelgestelde vragen over Inzicht en Budgets",
    url: "https://www.rabobank.nl/particulieren/online-bankieren/inzicht/veelgestelde-vragen",
  },
  raboPotjes: {
    label: "Rabobank: zo maak je een spaarpotje in je Rabo SpaarRekening",
    url: "https://www.rabobank.nl/particulieren/service/sparen/spaarpotjes",
  },
  raboExcel: {
    label: "Rabobank: gratis huishoudboekje in Excel",
    url: "https://www.rabobank.nl/particulieren/financieel-gezond/inkomsten-en-uitgaven/huishoudboekje-downloaden",
  },
  ingInzicht: {
    label: "ING: Inzicht, weten waar je geld naartoe gaat",
    url: "https://www.ing.nl/particulier/digitaal-bankieren/jouw-app/inzicht/inzicht",
  },
  ingBudgetten: {
    label: "ING: budgetteren in de ING App",
    url: "https://nieuws.ing.nl/nl-NL/242045-ing-budgetteren-zorgt-voor-meer-grip-op-je-geld/",
  },
  ingSpaardoelen: {
    label: "ING: Spaardoelen",
    url: "https://www.ing.nl/particulier/sparen/spaardoelen",
  },
  abnInzicht: {
    label: "ABN AMRO: inzicht in je geldzaken met de app",
    url: "https://www.abnamro.nl/nl/prive/themas/overzicht-en-inzicht/inzicht-met-de-app.html",
  },
  abnSpaardoelen: {
    label: "ABN AMRO: spaardoelen en Direct Sparen",
    url: "https://www.abnamro.nl/nl/prive/sparen/mijn-spaarrekening/doelsparen-bij-abn-amro.html",
  },
} as const;
