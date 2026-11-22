# Mentes do Brasil

As histórias reais de quem construiu o Brasil: os feitos e também as contradições. A verdade vem antes do mito.

## Stack

React 19 + TypeScript + Vite, Tailwind CSS v4, componentes shadcn/ui (Radix) e Motion para animações.

## Rodar

```bash
npm install
```

```bash
npm run dev
```

```bash
npm test
```

```bash
npm run build
```

## Estrutura

```
src/data.ts                 conteúdo: pessoas, áreas e a seção "Mito × verdade"
src/fotos.ts                fotos do Wikimedia Commons com autor e licença
src/components/             seções da página (hero, galeria, linha do tempo…)
src/components/ui/          componentes shadcn/ui
src/hooks/                  história aberta sincronizada com a URL (#historia/<id>)
tests/data.test.ts          validação do conteúdo
```

## Adicionar uma pessoa

Inclua um objeto em `MENTES` (`src/data.ts`) e rode `npm test`. Fatos incômodos e documentados vão no campo `verdade`.

## Publicar na Vercel

Importe o repositório em vercel.com → Add New → Project. O preset Vite é detectado sozinho. Cada pull request ganha um link de prévia.
