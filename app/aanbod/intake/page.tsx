import type { Metadata } from "next";
import { IntakeForm } from "./IntakeForm";

export function generateMetadata(): Metadata {
  return {
    title: "Aanmelding | Waar blijft het",
    robots: { index: false, follow: false },
  };
}

export default function IntakePage({
  searchParams,
}: {
  searchParams: { pakket?: string };
}) {
  const pakket =
    searchParams.pakket === "intensief"
      ? "intensief"
      : searchParams.pakket === "geldscan"
      ? "geldscan"
      : "gesprek";
  return <IntakeForm pakket={pakket} />;
}
