import { useDeferredValue, useMemo, useState, type CSSProperties } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Search } from "lucide-react";
import { AREAS, MENTES, type AreaId } from "@/data";
import { Input } from "@/components/ui/input";
import { CardPessoa } from "@/components/card-pessoa";
import { SecaoCabeca } from "@/components/secao-cabeca";
import { normalizar, ordenadas, textoBusca } from "@/lib/pessoas";
import { cn } from "@/lib/utils";

const INDICE = new Map(ordenadas.map((p) => [p.id, textoBusca(p)]));

export function Galeria({ aoAbrir }: { aoAbrir: (id: string) => void }) {
  const [area, setArea] = useState<AreaId | "todas">("todas");
  const [busca, setBusca] = useState("");
  const termo = normalizar(useDeferredValue(busca).trim());

  const lista = useMemo(
    () => ordenadas.filter((p) => (area === "todas" || p.areas.includes(area)) && (!termo || INDICE.get(p.id)!.includes(termo))),
    [area, termo],
  );

  const chips: [AreaId | "todas", string, string][] = [
    ["todas", "Todas", "var(--destaque)"],
    ...Object.entries(AREAS).map(([id, a]) => [id as AreaId, a.nome, a.cor] as [AreaId, string, string]),
  ];

  return (
    <section id="galeria" aria-labelledby="titulo-galeria" className="bg-background-2 px-4 py-24 sm:px-10 sm:py-32">
      <SecaoCabeca id="titulo-galeria" sobre="Personagens" titulo="Quem construiu o Brasil">
        Escolha uma área ou procure por um nome. Clique em um card para ler a história completa, com os feitos e as contradições.
      </SecaoCabeca>

      <div className="mx-auto mb-4 grid max-w-6xl justify-items-center gap-4">
        <label className="relative w-full max-w-lg">
          <span className="sr-only">Buscar por nome, lugar ou feito</span>
          <Search aria-hidden className="pointer-events-none absolute top-1/2 left-5 size-5 -translate-y-1/2 text-muted-foreground" />
          <Input type="search" value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Buscar por nome, lugar ou feito…" className="pl-12" />
        </label>
        <div role="group" aria-label="Filtrar por área" className="flex flex-wrap justify-center gap-2">
          {chips.map(([id, nome, c]) => (
            <button
              key={id}
              type="button"
              aria-pressed={area === id}
              onClick={() => setArea(id)}
              style={{ "--c": c } as CSSProperties}
              className={cn(
                "relative cursor-pointer rounded-full border-[1.5px] border-border bg-card px-4 py-1.5 text-sm font-medium transition-colors hover:border-[var(--c)]",
                area === id && "border-transparent text-white",
              )}
            >
              {area === id && <motion.span layoutId="chip-ativo" className="absolute inset-0 rounded-full bg-[var(--c)]" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
              <span className="relative">{nome}</span>
            </button>
          ))}
        </div>
      </div>

      <p aria-live="polite" className="mb-8 text-center text-sm text-muted-foreground">
        Mostrando {lista.length} de {MENTES.length} histórias
      </p>

      <motion.ul layout className="mx-auto grid max-w-6xl grid-cols-[repeat(auto-fill,minmax(min(100%,19rem),1fr))] gap-5">
        <AnimatePresence mode="popLayout">
          {lista.map((p) => <CardPessoa key={p.id} p={p} aoAbrir={aoAbrir} />)}
        </AnimatePresence>
      </motion.ul>
      {lista.length === 0 && <p className="text-center text-muted-foreground">Ninguém encontrado. Tente outro termo.</p>}
    </section>
  );
}
