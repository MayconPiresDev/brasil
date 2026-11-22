import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { cn } from "@/lib/utils";

export function Topo() {
  const { scrollY, scrollYProgress } = useScroll();
  const [solido, setSolido] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setSolido(y > innerHeight - 80));

  return (
    <>
      <motion.div
        aria-hidden
        style={{ scaleX: scrollYProgress }}
        className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-verde via-amarelo to-azul"
      />
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 flex items-center justify-between gap-4 px-4 py-3.5 text-white transition-all duration-300 sm:px-10",
          solido && "bg-background/80 text-foreground shadow-[0_1px_0_var(--border)] backdrop-blur-xl",
        )}
      >
        <a href="#inicio" className="flex items-center gap-2.5 font-serif text-lg font-bold whitespace-nowrap">
          <span aria-hidden className="relative size-[22px] bg-amarelo [clip-path:polygon(50%_0,100%_50%,50%_100%,0_50%)]">
            <span className="absolute inset-1.5 rounded-full bg-azul" />
          </span>
          Mentes do Brasil
        </a>
        <nav aria-label="Seções" className="flex gap-5 text-sm font-medium sm:gap-8">
          <a className="opacity-85 hover:opacity-100" href="#galeria">Personagens</a>
          <a className="hidden opacity-85 hover:opacity-100 sm:inline" href="#linha-do-tempo">Linha do tempo</a>
          <a className="hidden opacity-85 hover:opacity-100 sm:inline" href="#seu-papel">Seu papel</a>
        </nav>
      </header>
    </>
  );
}
