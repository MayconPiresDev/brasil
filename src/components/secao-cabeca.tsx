import type { ReactNode } from "react";
import { motion } from "motion/react";

export function SecaoCabeca({ id, sobre, titulo, children }: { id: string; sobre: string; titulo: string; children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
      className="mx-auto mb-12 max-w-2xl text-center"
    >
      <p className="mb-3 text-xs font-semibold tracking-[0.18em] text-ouro uppercase">{sobre}</p>
      <h2 id={id} className="text-[clamp(2rem,5vw,3rem)] leading-tight font-extrabold tracking-tight">{titulo}</h2>
      <p className="mt-4 text-muted-foreground">{children}</p>
    </motion.div>
  );
}
