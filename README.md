# Mentes do Brasil

As histórias dos brasileiros e brasileiras que, com coragem, ciência, arte e trabalho, construíram o país. Conhecer essas histórias é o primeiro passo para cuidarmos melhor dele.

## Stack

HTML, CSS e JavaScript puros, sem framework e sem etapa de build.

Para um site de conteúdo, essa é a escolha que dura: carrega rápido em qualquer celular, não tem dependência para atualizar e funciona igual daqui a dez anos.

| Recurso | Como foi feito |
|---|---|
| Céu animado com o Cruzeiro do Sul | `<canvas>`; pausa fora da tela |
| Animações de entrada | CSS + `IntersectionObserver` |
| Barra de progresso de leitura | CSS `animation-timeline: scroll()` (sem JS) |
| História completa de cada pessoa | `<dialog>` nativo, com link próprio (`#historia/machado-de-assis`) |
| Filtros por área e busca sem acento | JS, em `js/main.js` |
| Modo escuro | `prefers-color-scheme` |
| Acessibilidade | navegação por teclado, link "pular para o conteúdo", `prefers-reduced-motion` |

## Estrutura

```
index.html          página e estrutura das seções
css/styles.css      visual, temas e animações
js/data.js          conteúdo: todas as pessoas e áreas
js/main.js          filtros, cards, linha do tempo, histórias
js/stars.js         céu estrelado do topo
tests/              validação do conteúdo
```

## Rodar localmente

```bash
python3 -m http.server 8000
```

Depois abra http://localhost:8000.

## Adicionar uma pessoa

Inclua um objeto em `MENTES`, no arquivo `js/data.js`, seguindo o formato das outras pessoas. Depois rode o teste, que acusa campos faltando, datas invertidas ou áreas inválidas:

```bash
node --test
```

## Publicar (grátis)

No GitHub, vá em **Settings → Pages**, escolha a branch e a pasta `/ (root)`. O site fica em `https://<usuario>.github.io/brasil`.
