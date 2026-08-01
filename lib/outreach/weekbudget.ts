// Vervangen door lib/outreach/dagbudget.ts (1-aug-2026, verzendbudget
// omgezet van wekelijks naar dagelijks op verzoek van Jarno). Dit bestand
// kon niet verwijderd worden (permissiefout op deze mount, zie CLAUDE.md
// technische les 4/5), dus staat als dun compatibiliteitsschijf. Let op:
// berekenWeekbudget wijst nu naar de dagelijkse berekening (dat is precies
// wat er veranderd is); maandagGrens blijft echt weekgrens, voor de
// kalenderweek-rapportage op het Vandaag-dashboard. Nieuwe code moet
// lib/outreach/dagbudget.ts gebruiken, niet dit bestand.
export { berekenDagbudget as berekenWeekbudget, maandagGrens } from "@/lib/outreach/dagbudget";
export type { DagBudgetResultaat as WeekBudgetResultaat } from "@/lib/outreach/dagbudget";
