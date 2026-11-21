import type { CSSProperties } from "react";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, Scale } from "lucide-react";
import { AREAS, type Pessoa } from "@/data";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Retrato } from "@/components/retrato";
import { anos, cor, foto, nomeExibido, ordenadas, porId } from "@/lib/pessoas";

const AVISO_IMAGEM = {
  pintura: "Pintura de época",
  imaginada: "Representação artística: não existe retrato autêntico",
  foto: "",
};

type Props = { id: string | null; aoTrocar: (id: string) => void; aoFechar: () => void };

export function HistoriaDialog({ id, aoTrocar, aoFechar }: Props) {
  const p = id ? porId.get(id) : undefined;
  return (
    <Dialog open={!!p} onOpenChange={(aberto) => !aberto && aoFechar()}>
      {p && (
        <DialogContent
          style={{ "--c": cor(p) } as CSSProperties}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") aoTrocar(vizinho(p, 1).id);
            if (e.key === "ArrowLeft") aoTrocar(vizinho(p, -1).id);
          }}
        >
          <Conteudo key={p.id} p={p} aoTrocar={aoTrocar} />
        </DialogContent>
      )}
    </Dialog>
  );
}

const vizinho = (p: Pessoa, d: number) => ordenadas[(ordenadas.indexOf(p) + d + ordenadas.length) % ordenadas.length];

function Conteudo({ p, aoTrocar }: { p: Pessoa; aoTrocar: (id: string) => void }) {
  const f = foto(p);
  const ant = vizinho(p, -1), prox = vizinho(p, 1);
  const aviso = AVISO_IMAGEM[p.imagem ?? "foto"];

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="relative px-6 pt-8 pb-8 sm:px-12 sm:pt-12"
    >
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-64 [background:radial-gradient(120%_100%_at_0_0,color-mix(in_srgb,var(--c)_22%,transparent),transparent_70%)]" />

      <header className="relative mb-7 flex flex-col gap-5 sm:flex-row sm:items-center">
        {f ? (
          <figure className="shrink-0">
            <img src={f.src} alt={`Retrato de ${nomeExibido(p)}`} className="h-44 w-36 rounded-2xl object-cover object-top shadow-xl ring-4 ring-card" />
            {aviso && <figcaption className="mt-1.5 max-w-36 text-[0.7rem] leading-tight text-muted-foreground">{aviso}</figcaption>}
          </figure>
        ) : (
          <Retrato p={p} className="size-24 text-3xl" />
        )}
        <div>
          {p.apelido && <p className="texto-area mb-1 text-xs font-semibold tracking-[0.14em] uppercase">{p.apelido}</p>}
          <DialogTitle className="text-[clamp(1.7rem,4.5vw,2.4rem)] leading-tight font-extrabold">{p.nome}</DialogTitle>
          <DialogDescription className="mt-1.5 mb-2.5 text-sm text-muted-foreground">{anos(p)} · {p.local}</DialogDescription>
          <div className="flex flex-wrap gap-1.5">
            {p.areas.map((a) => (
              <Badge key={a} style={{ "--c": AREAS[a].cor } as CSSProperties} className="texto-area fundo-area">{AREAS[a].nome}</Badge>
            ))}
          </div>
        </div>
      </header>

      {p.citacao && (
        <blockquote className="mb-7 rounded-r-xl border-l-4 border-[var(--c)] bg-[color-mix(in_srgb,var(--c)_7%,transparent)] px-5 py-4 font-serif text-xl leading-snug font-semibold italic">
          “{p.citacao.texto}”
          <cite className="mt-1.5 block font-sans text-sm font-normal not-italic text-muted-foreground">{p.citacao.fonte}</cite>
        </blockquote>
      )}

      <div className="space-y-4 leading-relaxed [&>p:first-child]:first-letter:float-left [&>p:first-child]:first-letter:mt-1 [&>p:first-child]:first-letter:mr-2 [&>p:first-child]:first-letter:font-serif [&>p:first-child]:first-letter:text-6xl [&>p:first-child]:first-letter:leading-[.85] [&>p:first-child]:first-letter:font-extrabold [&>p:first-child]:first-letter:text-[var(--c)]">
        {p.historia.map((t) => <p key={t}>{t}</p>)}
      </div>

      {p.verdade && (
        <section className="mt-8 rounded-2xl border border-amber-500/30 bg-amber-500/[0.07] p-5 sm:p-6">
          <h3 className="mb-3 flex items-center gap-2 text-lg font-bold"><Scale className="size-5 text-amber-600 dark:text-amber-400" /> Mito × verdade</h3>
          <ul className="space-y-2.5 text-[0.97rem] leading-relaxed">
            {p.verdade.map((t) => (
              <li key={t} className="relative pl-5 before:absolute before:top-[0.6em] before:left-0 before:size-2 before:rounded-full before:bg-amber-500">{t}</li>
            ))}
          </ul>
        </section>
      )}

      <h3 className="mt-8 mb-4 text-lg font-bold">Marcos</h3>
      <ol className="ml-1 border-l-2 border-[color-mix(in_srgb,var(--c)_40%,var(--border))] pl-5">
        {p.marcos.map((m, i) => (
          <motion.li
            key={m.ano + m.texto}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.06 }}
            className="relative pb-3.5 before:absolute before:top-2 before:-left-[27px] before:size-2.5 before:rounded-full before:bg-[var(--c)]"
          >
            <b className="texto-area mr-2 font-serif">{m.ano}</b>{m.texto}
          </motion.li>
        ))}
      </ol>

      <div className="mt-6 rounded-2xl bg-gradient-to-br from-[#00270f] to-azul p-6 text-white">
        <h3 className="mb-1.5 text-lg font-bold text-amarelo">Legado</h3>
        <p>{p.legado}</p>
      </div>

      {f && (
        <p className="mt-5 text-xs text-muted-foreground">
          Imagem: {f.autor} · {f.licenca} · <a className="underline" href={f.fonte} target="_blank" rel="noreferrer">Wikimedia Commons</a>
        </p>
      )}

      <nav aria-label="Outras histórias" className="mt-8 flex justify-between gap-3">
        <Button variant="outline" onClick={() => aoTrocar(ant.id)}><ArrowLeft /> {nomeExibido(ant)}</Button>
        <Button variant="outline" onClick={() => aoTrocar(prox.id)}>{nomeExibido(prox)} <ArrowRight /></Button>
      </nav>
    </motion.article>
  );
}
