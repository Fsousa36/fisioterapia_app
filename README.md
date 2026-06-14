# FisioBase Academy

Plataforma mobile para estudantes e profissionais de fisioterapia baseada em evidencias cientificas.

## Arquitetura

- `apps/mobile`: aplicativo React Native com Expo Router, Zustand e React Query.
- `apps/web`: app web publico Next.js para biblioteca, trilhas, premium e estudo no navegador.
- `apps/api`: backend NestJS com Prisma, PostgreSQL, Redis, BullMQ e Swagger.
- `apps/admin`: painel administrativo Next.js com Tailwind, ShadCN UI e React Query.
- `packages/database`: schema Prisma e client compartilhado.
- `packages/types`: contratos TypeScript e schemas Zod compartilhados.
- `infra`: Docker, Nginx e arquivos de deploy.

## Primeiros comandos

```bash
pnpm install
cp .env.example .env
pnpm docker:up
pnpm db:generate
pnpm db:migrate
pnpm db:seed
pnpm dev
```

## Portas locais

- API: `http://localhost:3333`
- Swagger: `http://localhost:3333/docs`
- Admin: `http://localhost:3000`
- Web: `http://localhost:3001`
- Mobile Expo: `npx pnpm --filter @fisiobase/mobile dev`
- Meilisearch: `http://localhost:7700`

## Regras editoriais

- Salvar sempre fonte original, DOI, PMID, PMCID ou URL publica quando disponivel.
- Nao copiar conteudo fechado ou protegido por copyright sem permissao.
- Priorizar abstracts, metadados, links oficiais e conteudo open access.
- Todo conteudo importado entra como `DRAFT` e precisa de curadoria antes da publicacao.

## Visualizar o mobile

```bash
npx pnpm --filter @fisiobase/mobile dev
```

Depois:

- Pressione `a` para abrir no emulador Android.
- Pressione `i` para abrir no simulador iOS, se estiver em macOS.
- Leia o QR Code com o Expo Go no celular.

Se o app mobile for testar API local pelo celular fisico, troque `EXPO_PUBLIC_API_URL` para o IP da sua maquina na rede, por exemplo `http://192.168.0.10:3333`.
