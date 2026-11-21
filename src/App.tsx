import { MotionConfig } from "motion/react";
import { Topo } from "@/components/topo";
import { Hero } from "@/components/hero";
import { Manifesto } from "@/components/manifesto";
import { Galeria } from "@/components/galeria";
import { LinhaDoTempo } from "@/components/linha-do-tempo";
import { SeuPapel } from "@/components/seu-papel";
import { HistoriaDialog } from "@/components/historia-dialog";
import { useHistoriaNaUrl } from "@/hooks/use-historia-na-url";
import { ordenadas } from "@/lib/pessoas";

export default function App() {
  const { id, abrir, trocar, fechar } = useHistoriaNaUrl();
  const sortear = () => abrir(ordenadas[Math.floor(Math.random() * ordenadas.length)].id);

  return (
    // reducedMotion="user": quem pede menos movimento no sistema não recebe animações de deslocamento
    <MotionConfig reducedMotion="user">
      <a href="#conteudo" className="fixed -top-16 left-4 z-[100] rounded-lg bg-amarelo px-4 py-2 text-black transition-all focus:top-4">
        Pular para o conteúdo
      </a>
      <Topo />
      <Hero aoSortear={sortear} />
      <main id="conteudo">
        <Manifesto />
        <Galeria aoAbrir={abrir} />
        <LinhaDoTempo aoAbrir={abrir} />
        <SeuPapel />
      </main>
      <footer className="border-t border-border px-4 pt-12 pb-16 text-center text-sm text-muted-foreground">
        <p><strong className="text-foreground">Mentes do Brasil</strong>: um projeto aberto de memória, que coloca a verdade antes do mito.</p>
        <p className="mt-1">Imagens do Wikimedia Commons, com autoria e licença indicadas em cada história. Encontrou um erro? Contribua no repositório.</p>
      </footer>
      <HistoriaDialog id={id} aoTrocar={trocar} aoFechar={fechar} />
    </MotionConfig>
  );
}
