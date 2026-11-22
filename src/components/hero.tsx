import { motion } from "motion/react";
import { Shuffle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Ceu } from "@/components/ceu";

const PALAVRAS = ["As", "mentes", "que", "construíram"];
const subir = {
  oculto: { opacity: 0, y: "0.6em", rotate: 2, filter: "blur(6px)" },
  visivel: { opacity: 1, y: 0, rotate: 0, filter: "blur(0px)" },
};

export function Hero({ aoSortear }: { aoSortear: () => void }) {
  return (
    <section
      id="inicio"
      className="relative grid min-h-svh place-items-center overflow-hidden px-4 pt-28 pb-20 text-center text-white [background:radial-gradient(120%_90%_at_50%_110%,#0b5a30_0%,#062a1a_38%,#020a14_75%)]"
    >
      <Ceu className="absolute inset-0 size-full" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-background" />

      <motion.div
        className="relative z-10 max-w-5xl"
        initial="oculto"
        animate="visivel"
        transition={{ staggerChildren: 0.1, delayChildren: 0.1 }}
      >
        <motion.p variants={{ oculto: { opacity: 0 }, visivel: { opacity: 1 } }} className="mb-4 text-xs font-semibold tracking-[0.2em] text-amarelo uppercase">
          Quatro séculos de história, sem mitos
        </motion.p>
        <h1 className="text-[clamp(2.6rem,8.5vw,6rem)] leading-[1.05] font-extrabold tracking-tight">
          {PALAVRAS.map((p) => (
            <motion.span key={p} variants={subir} transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }} className="mr-[0.25em] inline-block">
              {p}
            </motion.span>
          ))}
          <motion.span variants={subir} transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }} className="brilho-ouro inline-block">
            o Brasil
          </motion.span>
        </h1>
        <motion.p variants={{ oculto: { opacity: 0, y: 12 }, visivel: { opacity: 1, y: 0 } }} transition={{ duration: 1 }} className="mx-auto mt-6 mb-9 max-w-2xl text-[clamp(1.05rem,2.2vw,1.3rem)] text-[#d6e4da]">
          Gente de carne e osso que, com coragem, ciência, arte e trabalho, fez deste país o que ele é. Com seus feitos e também com suas contradições.
        </motion.p>
        <motion.div variants={{ oculto: { opacity: 0, y: 12 }, visivel: { opacity: 1, y: 0 } }} transition={{ duration: 1 }} className="flex flex-wrap justify-center gap-3">
          <Button size="lg" onClick={() => document.getElementById("galeria")?.scrollIntoView()}>
            Conhecer as histórias
          </Button>
          <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10" onClick={aoSortear}>
            <Shuffle /> Uma história ao acaso
          </Button>
        </motion.div>
      </motion.div>

      <a href="#manifesto" aria-label="Rolar para baixo" className="absolute bottom-8 left-1/2 z-10 h-[46px] w-7 -translate-x-1/2 rounded-full border-2 border-white/50">
        <span className="absolute top-2 left-1/2 -ml-0.5 h-2 w-1 rounded-sm bg-white [animation:rolar_1.8s_infinite]" />
      </a>
    </section>
  );
}
