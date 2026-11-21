import { AREAS, MENTES, type Pessoa } from "@/data";
import { FOTOS } from "@/fotos";

export const ordenadas = [...MENTES].sort((a, b) => a.nascimento - b.nascimento);
export const porId = new Map(ordenadas.map((p) => [p.id, p]));

export const cor = (p: Pessoa) => AREAS[p.areas[0]].cor;
export const anos = (p: Pessoa) => `${p.nascimento} – ${p.morte}`;
export const nomeExibido = (p: Pessoa) => p.apelido ?? p.nome;
/** "Joaquim José da Silva Xavier" -> "Joaquim Xavier" quando a pessoa já tem apelido */
export const nomeCurto = (p: Pessoa) => (p.apelido ? p.nome.replace(/^(\S+).*\s(\S+)$/, "$1 $2") : p.nome);
export const iniciais = (p: Pessoa) =>
  nomeExibido(p)
    .split(/\s+/)
    .filter((w) => !/^(d[aeo]s?|e)$/i.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
export const foto = (p: Pessoa) => FOTOS[p.id];

export const normalizar = (s: string) => s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
export const textoBusca = (p: Pessoa) => normalizar([p.nome, p.apelido, p.local, p.resumo, ...p.historia].join(" "));

export const romano = (n: number) => ({ 17: "XVII", 18: "XVIII", 19: "XIX", 20: "XX", 21: "XXI" })[n] ?? String(n);
export const seculo = (ano: number) => Math.floor((ano - 1) / 100) + 1;
