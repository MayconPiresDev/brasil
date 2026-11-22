import { motion } from "motion/react";
import { SecaoCabeca } from "@/components/secao-cabeca";

const ACOES = [
  ["Conheça", "Leia, visite museus, pergunte aos mais velhos. Quem conhece a história não aceita qualquer versão dela, nem a que transforma pessoas em santos ou vilões."],
  ["Valorize a escola e a ciência", "De Nilo Peçanha a Paulo Freire, de Oswaldo Cruz a Lattes, o Brasil avançou quando investiu em conhecimento."],
  ["Participe", "Vote com consciência, acompanhe quem você elegeu, envolva-se na sua comunidade. Bertha Lutz lutou anos pelo direito de votar."],
  ["Cuide do que é de todos", "Praças, escolas, patrimônio histórico, rios e florestas. O que é público é nosso."],
  ["Não se cale diante da injustiça", "Luiz Gama, o Dragão do Mar e Nise da Silveira mostraram que a mudança começa quando alguém diz \"não\"."],
] as const;

export function SeuPapel() {
  return (
    <section id="seu-papel" aria-labelledby="titulo-papel" className="bg-gradient-to-b from-background to-[color-mix(in_srgb,var(--verde)_10%,var(--background))] px-4 py-24 sm:px-10 sm:py-32">
      <SecaoCabeca id="titulo-papel" sobre="E agora?" titulo="A história continua com você">
        Nenhuma dessas pessoas esperou o país ficar pronto. Elas fizeram a sua parte, com acertos e erros. A nossa começa por coisas simples:
      </SecaoCabeca>
      <ol className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {ACOES.map(([titulo, texto], i) => (
          <motion.li
            key={titulo}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            className="rounded-2xl border border-border bg-card p-6 shadow-sm"
          >
            <span className="mb-2 block font-serif text-4xl font-extrabold text-verde/40">0{i + 1}</span>
            <h3 className="mb-2 text-xl font-bold">{titulo}</h3>
            <p className="text-[0.95rem] text-muted-foreground">{texto}</p>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
