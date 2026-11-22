import type { CSSProperties, PointerEvent } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { ArrowRight, Scale } from "lucide-react";
import { AREAS, type Pessoa } from "@/data";
import { Badge } from "@/components/ui/badge";
import { Retrato } from "@/components/retrato";
import { anos, cor, nomeCurto } from "@/lib/pessoas";

export function CardPessoa({ p, aoAbrir }: { p: Pessoa; aoAbrir: (id: string) => void }) {
  const reduzir = useReducedMotion();
  const mx = useMotionValue(0.5), my = useMotionValue(0.5);
  const rotateY = useSpring(useTransform(mx, [0, 1], [-7, 7]), { stiffness: 200, damping: 20 });
  const rotateX = useSpring(useTransform(my, [0, 1], [7, -7]), { stiffness: 200, damping: 20 });

  const mover = (e: PointerEvent<HTMLButtonElement>) => {
    if (reduzir || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const sair = () => { mx.set(0.5); my.set(0.5); };

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
      style={{ "--c": cor(p), perspective: 900 } as CSSProperties}
    >
      <motion.button
        type="button"
        onClick={() => aoAbrir(p.id)}
        onPointerMove={mover}
        onPointerLeave={sair}
        style={{ rotateX, rotateY }}
        whileHover={{ y: -6 }}
        className="group relative flex size-full cursor-pointer flex-col gap-4 overflow-hidden rounded-2xl border border-border bg-card p-6 text-left shadow-[0_1px_2px_#0000000d,0_8px_24px_#0000000f] transition-shadow hover:shadow-[0_20px_40px_#0000001f]"
      >
        <span aria-hidden className="absolute inset-x-0 top-0 h-1 origin-left scale-x-[.15] bg-[var(--c)] transition-transform duration-500 group-hover:scale-x-100" />
        <div className="flex items-center gap-4">
          <Retrato p={p} className="size-16 text-xl" />
          <div className="min-w-0">
            {p.apelido && <div className="texto-area text-[0.7rem] font-semibold tracking-[0.12em] uppercase">{p.apelido}</div>}
            <h3 className="text-xl leading-tight font-bold">{nomeCurto(p)}</h3>
            <div className="mt-0.5 text-sm text-muted-foreground">{anos(p)} · {p.local.split(",")[0]}</div>
          </div>
        </div>
        <p className="flex-1 text-[0.98rem] text-muted-foreground">{p.resumo}</p>
        <div className="flex flex-wrap gap-1.5">
          {p.areas.map((a) => (
            <Badge key={a} style={{ "--c": AREAS[a].cor } as CSSProperties} className="texto-area fundo-area">{AREAS[a].nome}</Badge>
          ))}
          {p.verdade && (
            <Badge className="bg-foreground/5 text-muted-foreground"><Scale className="mr-1 size-3" />Mito × verdade</Badge>
          )}
        </div>
        <span className="texto-area inline-flex items-center gap-1.5 text-sm font-semibold">
          Ler a história <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </span>
      </motion.button>
    </motion.li>
  );
}
