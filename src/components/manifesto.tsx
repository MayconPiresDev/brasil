import { useEffect, useRef } from "react";
import { animate, motion, useInView } from "motion/react";
import { AREAS, MENTES } from "@/data";
import { ordenadas } from "@/lib/pessoas";

function Contador({ ate }: { ate: number }) {
  const ref = useRef<HTMLElement>(null);
  const visto = useInView(ref, { once: true });
  useEffect(() => {
    if (!visto) return;
    const ctrl = animate(0, ate, { duration: 1.4, ease: "easeOut", onUpdate: (v) => { ref.current!.textContent = String(Math.round(v)); } });
    return () => ctrl.stop();
  }, [visto, ate]);
  return <strong ref={ref} className="block font-serif text-[clamp(2.8rem,7vw,4rem)] leading-none font-extrabold text-destaque tabular-nums">0</strong>;
}

const NUMEROS = [
  { n: MENTES.length, rotulo: "brasileiros e brasileiras" },
  { n: Math.ceil((new Date().getFullYear() - ordenadas[0].nascimento) / 100), rotulo: "séculos de história" },
  { n: Object.keys(AREAS).length, rotulo: "áreas em que mudaram o país" },
];

export function Manifesto() {
  return (
    <section id="manifesto" className="px-4 py-24 text-center sm:py-32">
      <motion.blockquote
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8 }}
        className="mx-auto max-w-4xl font-serif text-[clamp(1.6rem,4.2vw,2.8rem)] leading-tight font-semibold tracking-tight"
      >
        <span aria-hidden className="mb-4 block text-7xl leading-[0.6] text-ouro">“</span>
        Um povo que não conhece a própria história não sabe o que tem a perder.
      </motion.blockquote>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mx-auto mt-6 max-w-2xl text-muted-foreground"
      >
        Heróis de verdade não são estátuas. Aqui você encontra o que cada um fez de grande e também o que o mito costuma esconder.
      </motion.p>
      <div className="mx-auto mt-16 grid max-w-4xl gap-6 sm:grid-cols-3">
        {NUMEROS.map((x, i) => (
          <motion.div
            key={x.rotulo}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.12 }}
            className="border-t-[3px] border-verde p-6"
          >
            <Contador ate={x.n} />
            <span className="text-muted-foreground">{x.rotulo}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
