import "server-only";
/**
 * Alleen voor server-routes. De sleutel komt uit ANTHROPIC_API_KEY (Vercel of .env.local)
 * en verlaat de server nooit (beveiligingseis 1 en 2).
 */
import Anthropic from "@anthropic-ai/sdk";
import { maakVoorlopigAdvies, type AdviesResultaat } from "./kern";
import { deelNamenInMetAI } from "./indelen-ai";

let client: Anthropic | null = null;

function haalClient(): Anthropic {
  if (!process.env.ANTHROPIC_API_KEY) throw new Error("ANTHROPIC_API_KEY ontbreekt");
  if (!client) client = new Anthropic({ maxRetries: 2, timeout: 55000 });
  return client;
}

export async function voorlopigAdviesOpServer(invoer: unknown): Promise<AdviesResultaat> {
  return maakVoorlopigAdvies(haalClient(), invoer);
}

export async function deelNamenInOpServer(invoer: unknown) {
  return deelNamenInMetAI(haalClient(), invoer);
}

