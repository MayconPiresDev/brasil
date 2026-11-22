// Gera src/fotos.json: foto principal de cada pessoa na Wikipédia em português,
// com autor e licença do Wikimedia Commons. Rode com: npm run fotos
// As imagens não ficam no repositório: o navegador as carrega direto do Wikimedia.
import { writeFileSync } from "node:fs";

const TITULOS = {
  "zumbi-dos-palmares": "Zumbi dos Palmares", aleijadinho: "Aleijadinho", tiradentes: "Tiradentes",
  "jose-bonifacio": "José Bonifácio de Andrada e Silva", "dom-pedro-ii": "Pedro II do Brasil",
  "luiz-gama": "Luís Gama", "andre-reboucas": "André Rebouças", "dragao-do-mar": "Francisco José do Nascimento",
  "machado-de-assis": "Machado de Assis", "princesa-isabel": "Isabel, Princesa Imperial do Brasil",
  "chiquinha-gonzaga": "Chiquinha Gonzaga", "joaquim-nabuco": "Joaquim Nabuco", "vital-brazil": "Vital Brazil",
  "marechal-rondon": "Cândido Rondon", "nilo-pecanha": "Nilo Peçanha", "oswaldo-cruz": "Oswaldo Cruz",
  "santos-dumont": "Santos Dumont", "carlos-chagas": "Carlos Chagas", "villa-lobos": "Heitor Villa-Lobos",
  "bertha-lutz": "Bertha Lutz", "nise-da-silveira": "Nise da Silveira",
  "carolina-maria-de-jesus": "Carolina Maria de Jesus", "paulo-freire": "Paulo Freire",
  "cesar-lattes": "César Lattes", "milton-santos": "Milton Santos",
  // maria-firmina-dos-reis fica de fora: o "retrato" que circula dela é de outra pessoa.
};

const UA = { "User-Agent": "MentesDoBrasil/1.0 (educational static site)" };
const api = async (host, params) => {
  const url = `https://${host}/w/api.php?` + new URLSearchParams({ action: "query", format: "json", ...params });
  const r = await fetch(url, { headers: UA });
  if (!r.ok) throw new Error(`${host}: HTTP ${r.status}`);
  return (await r.json()).query;
};
const limpar = (html = "") => html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();

// 1) Qual é a imagem principal de cada artigo
const wiki = await api("pt.wikipedia.org", { redirects: "1", prop: "pageimages", piprop: "name", titles: Object.values(TITULOS).join("|") });
const destino = new Map([...(wiki.normalized ?? []), ...(wiki.redirects ?? [])].map((x) => [x.from, x.to]));
const final = (t) => destino.get(destino.get(t) ?? t) ?? destino.get(t) ?? t;
const imagemDe = new Map(Object.values(wiki.pages).map((p) => [p.title, p.pageimage]));

const arquivos = {};
for (const [id, titulo] of Object.entries(TITULOS)) {
  const img = imagemDe.get(final(titulo));
  if (img) arquivos[`File:${img}`] = id;
  else console.warn("sem imagem:", id);
}

// 2) URL em tamanho reduzido, autor e licença
const commons = await api("commons.wikimedia.org", { prop: "imageinfo", iiprop: "extmetadata|url", iiurlwidth: "480", titles: Object.keys(arquivos).join("|") });
const norm = new Map((commons.normalized ?? []).map((x) => [x.to, x.from]));

const fotos = {};
for (const p of Object.values(commons.pages)) {
  const id = arquivos[norm.get(p.title) ?? p.title];
  const ii = p.imageinfo?.[0];
  if (!id || !ii) { console.warn("fora do Commons:", p.title); continue; }
  const md = ii.extmetadata ?? {};
  fotos[id] = {
    src: ii.thumburl,
    autor: limpar(md.Artist?.value).slice(0, 80) || "Autor desconhecido",
    licenca: limpar(md.LicenseShortName?.value) || "ver página",
    fonte: ii.descriptionurl,
  };
}

const ordenado = Object.fromEntries(Object.entries(fotos).sort(([a], [b]) => a.localeCompare(b)));
writeFileSync(new URL("../src/fotos.json", import.meta.url), JSON.stringify(ordenado, null, 2) + "\n");
console.log(`${Object.keys(fotos).length} fotos gravadas em src/fotos.json`);
