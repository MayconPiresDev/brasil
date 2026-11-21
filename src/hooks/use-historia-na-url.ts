import { useCallback, useEffect, useState } from "react";

const ler = () => location.hash.match(/^#historia\/([\w-]+)$/)?.[1] ?? null;

/** A história aberta fica na URL (#historia/<id>), então dá para compartilhar o link e usar o "voltar". */
export function useHistoriaNaUrl() {
  const [id, setId] = useState(ler);

  useEffect(() => {
    const aoMudar = () => setId(ler());
    addEventListener("hashchange", aoMudar);
    return () => removeEventListener("hashchange", aoMudar);
  }, []);

  const abrir = useCallback((novo: string) => { location.hash = `historia/${novo}`; }, []);
  const trocar = useCallback((novo: string) => { history.replaceState(null, "", `#historia/${novo}`); setId(novo); }, []);
  const fechar = useCallback(() => { history.replaceState(null, "", location.pathname + location.search); setId(null); }, []);

  return { id, abrir, trocar, fechar };
}
