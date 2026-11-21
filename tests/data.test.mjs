// Valida o conteúdo de js/data.js. Rode com: node --test
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";

const src = readFileSync(new URL("../js/data.js", import.meta.url), "utf8");
// JSON evita diferenças de protótipo entre o contexto do vm e o do teste
const { MENTES, AREAS } = JSON.parse(vm.runInNewContext(`${src}; JSON.stringify({ MENTES, AREAS })`));

test("ids únicos e próprios para URL", () => {
  const ids = MENTES.map((p) => p.id);
  assert.equal(new Set(ids).size, ids.length);
  for (const id of ids) assert.match(id, /^[a-z0-9-]+$/);
});

test("cada pessoa tem conteúdo completo e coerente", () => {
  for (const p of MENTES) {
    for (const k of ["nome", "local", "resumo", "legado"]) assert.ok(p[k]?.trim(), `${p.id}: ${k} vazio`);
    assert.ok(p.nascimento < p.morte, `${p.id}: datas invertidas`);
    assert.ok(p.areas.length && p.areas.every((a) => a in AREAS), `${p.id}: área inválida`);
    assert.ok(p.historia.length >= 2, `${p.id}: história curta`);
    assert.ok(p.marcos.length >= 2, `${p.id}: poucos marcos`);
    const anos = p.marcos.map((m) => m.ano);
    assert.deepEqual(anos, [...anos].sort((a, b) => a - b), `${p.id}: marcos fora de ordem`);
    assert.equal(anos[0], p.nascimento, `${p.id}: primeiro marco deve ser o nascimento`);
    if (p.citacao) assert.ok(p.citacao.texto && p.citacao.fonte, `${p.id}: citação sem fonte`);
  }
});
