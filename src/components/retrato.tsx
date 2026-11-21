import type { CSSProperties } from "react";
import type { Pessoa } from "@/data";
import { cn } from "@/lib/utils";
import { cor, foto, iniciais } from "@/lib/pessoas";

/** Foto quando existe; senão, as iniciais. */
export function Retrato({ p, className }: { p: Pessoa; className?: string }) {
  const f = foto(p);
  const estilo = { "--c": cor(p) } as CSSProperties;
  const base = "shrink-0 overflow-hidden rounded-full ring-[3px] ring-card shadow-[0_0_0_5px_color-mix(in_srgb,var(--c)_40%,transparent)]";
  if (f) {
    return <img src={f.src} alt="" loading="lazy" decoding="async" style={estilo} className={cn(base, "bg-muted-foreground/20 object-cover object-top", className)} />;
  }
  return (
    <div aria-hidden style={estilo} className={cn(base, "grid place-items-center font-serif font-bold text-white [background:radial-gradient(circle_at_30%_25%,color-mix(in_srgb,var(--c)_60%,#fff),var(--c)_70%)]", className)}>
      {iniciais(p)}
    </div>
  );
}
