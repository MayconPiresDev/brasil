// Gerado por `npm run fotos` (scripts/fotos.mjs). As imagens são carregadas direto do Wikimedia Commons.
import dados from "./fotos.json";

export interface Foto { src: string; autor: string; licenca: string; fonte: string }
export const FOTOS: Record<string, Foto | undefined> = dados;
