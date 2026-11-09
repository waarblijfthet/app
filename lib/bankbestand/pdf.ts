/**
 * Pdf naar tekst met posities, in de browser, met pdf.js uit /public/pdfjs (zelf geserveerd, geen CDN).
 * Wordt pas geladen als iemand een pdf kiest; de rest van de site merkt er niets van.
 */
import type { PdfPagina } from "./pdf-rabobank";

const PDFJS_URL = "/pdfjs/pdf.min.mjs";
const WORKER_URL = "/pdfjs/pdf.worker.min.mjs";

export function isPdf(bytes: Uint8Array): boolean {
  return bytes.length > 4 && bytes[0] === 0x25 && bytes[1] === 0x50 && bytes[2] === 0x44 && bytes[3] === 0x46;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function pdfNaarPaginas(bytes: Uint8Array, laadPdfjs?: () => Promise<any>): Promise<PdfPagina[]> {
  const url = PDFJS_URL;
  const pdfjs: any = laadPdfjs ? await laadPdfjs() : await import(/* webpackIgnore: true */ url);
  if (!laadPdfjs) pdfjs.GlobalWorkerOptions.workerSrc = WORKER_URL;
  const doc = await pdfjs.getDocument({ data: bytes, verbosity: 0 }).promise;
  const paginas: PdfPagina[] = [];
  for (let p = 1; p <= doc.numPages; p++) {
    const pagina = await doc.getPage(p);
    const hoogte: number = pagina.getViewport({ scale: 1 }).height;
    const inhoud = await pagina.getTextContent();
    paginas.push({
      items: (inhoud.items as any[])
        .filter((i) => typeof i.str === "string" && i.str.trim() !== "")
        .map((i) => ({ s: i.str as string, x: i.transform[4] as number, y: hoogte - (i.transform[5] as number) })),
    });
  }
  await doc.destroy();
  return paginas;
}
