import { Fragment, useRef, type CSSProperties } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { SecaoCabeca } from "@/components/secao-cabeca";
import { Retrato } from "@/components/retrato";
import { cor, nomeExibido, ordenadas, romano, seculo } from "@/lib/pessoas";
import { cn } from "@/lib/utils";

export function LinhaDoTempo({ aoAbrir }: { aoAbrir: (id: string) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  // a linha "cresce" conforme a pessoa rola a página
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const escala = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="linha-do-tempo" aria-labelledby="titulo-linha" className="px-4 py-24 sm:px-10 sm:py-32">
      <SecaoCabeca id="titulo-linha" sobre="Linha do tempo" titulo="De Palmares ao século XXI">
        Cada ponto é uma vida. Juntas, elas contam a história do país.
      </SecaoCabeca>
      <div ref={ref} className="relative mx-auto max-w-4xl">
        <div aria-hidden className="absolute inset-y-0 left-2 w-0.5 bg-border md:left-1/2 md:-translate-x-px" />
        <motion.div aria-hidden style={{ scaleY: escala }} className="absolute inset-y-0 left-2 w-0.5 origin-top bg-gradient-to-b from-verde via-amarelo to-azul md:left-1/2 md:-translate-x-px" />
        <ol>
        {ordenadas.map((p, i) => {
          const novoSeculo = i === 0 || seculo(p.nascimento) !== seculo(ordenadas[i - 1].nascimento);
          const direita = i % 2 === 1;
          return (
            <Fragment key={p.id}>
              {novoSeculo && (
                <li aria-hidden className="relative z-10 my-10 md:text-center">
                  <span className="inline-block rounded-full border-[1.5px] border-border bg-background px-4 py-1 text-sm font-bold tracking-widest text-ouro">
                    Século {romano(seculo(p.nascimento))}
                  </span>
                </li>
              )}
              <motion.li
                initial={{ opacity: 0, x: direita ? 40 : -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
                style={{ "--c": cor(p) } as CSSProperties}
                className={cn(
                  "relative pb-8 pl-9 md:w-1/2",
                  direita ? "md:ml-auto md:pl-10" : "md:pr-10 md:pl-0 md:text-right",
                )}
              >
                <span aria-hidden className={cn("absolute top-2 left-0 size-4 rounded-full bg-[var(--c)] shadow-[0_0_0_4px_var(--background),0_0_0_6px_color-mix(in_srgb,var(--c)_35%,transparent)]", direita ? "md:-left-2" : "md:right-[-8px] md:left-auto")} />
                <button type="button" onClick={() => aoAbrir(p.id)} className={cn("group inline-flex cursor-pointer items-start gap-3 text-left", !direita && "md:flex-row-reverse md:text-right")}>
                  <Retrato p={p} className="size-12 text-sm" />
                  <span>
                    <span className="texto-area block font-serif text-2xl font-extrabold">{p.nascimento}</span>
                    <span className="block font-semibold group-hover:underline">{nomeExibido(p)}</span>
                    <span className="block max-w-sm text-sm text-muted-foreground">{p.resumo}</span>
                  </span>
                </button>
              </motion.li>
            </Fragment>
          );
        })}
        </ol>
      </div>
    </section>
  );
}
