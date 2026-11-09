/**
 * Gedeeld model voor ingelezen bankbestanden.
 * Alles hier draait in de browser: transacties verlaten het apparaat van de bezoeker niet.
 */

export type Formaat = "camt053" | "csv" | "mt940" | "onbekend";
export type BankId = "rabobank" | "ing" | "abnamro" | "sns" | "onbekend";

export type Transactie = {
  /** Sleutel om dubbele regels over meerdere bestanden te herkennen. */
  sleutel: string;
  /** JJJJ-MM-DD, boekdatum. */
  datum: string;
  /** In centen, negatief is af. */
  bedragCent: number;
  eigenIban: string | null;
  tegenIban: string | null;
  tegenpartij: string;
  omschrijving: string;
  code: string | null;
  bron: { bank: BankId; formaat: Formaat; bestand: string; rij: number };
};

/** Kolomnummers (vanaf 0) die de bezoeker zelf aanwijst als het bestand niet herkend wordt. */
export type KolomKeuze = {
  datum: number;
  bedrag: number;
  omschrijving: number;
  tegenpartij?: number;
  /** Kolom met "Af"/"Bij" of "D"/"C" als het bedrag zelf geen teken heeft. */
  afBij?: number;
};

export type LeesResultaat =
  | {
      status: "gelezen";
      bank: BankId;
      formaat: Formaat;
      transacties: Transactie[];
      waarschuwingen: string[];
    }
  | {
      status: "kolommen-kiezen";
      formaat: "csv";
      heeftKopregel: boolean;
      koppen: string[];
      voorbeeld: string[][];
      voorstel: Partial<KolomKeuze>;
    }
  | { status: "niet-ondersteund"; formaat: Formaat; reden: string };
