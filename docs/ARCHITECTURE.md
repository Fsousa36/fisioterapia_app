# Arquitetura do Projeto

## Visao Geral

FisioBase Academy usa um monorepo Turborepo com pnpm workspaces.

```text
apps/
  api/      NestJS, Prisma, Redis, BullMQ, Swagger
  admin/    Next.js, Tailwind, ShadCN UI, React Query
  web/      Next.js publico para biblioteca e trilhas
  mobile/   Expo, Expo Router, Zustand, React Query
packages/
  database/ Prisma schema e client
  types/    contratos, enums e schemas Zod
  config/   configuracoes compartilhadas
infra/
  nginx/    reverse proxy
```

## Fluxo de Conteudo Cientifico

1. Importadores separados consultam PubMed, Europe PMC, SciELO, LILACS, PEDro, ClinicalTrials.gov e WHO.
2. Metadados, identificadores, licenca e fonte original sao persistidos.
3. Logs de importacao registram status, payload resumido e erros.
4. Conteudo fica em curadoria com status `DRAFT` ou `IN_REVIEW`.
5. Admin revisa e publica para o app.

## Dominios Principais

- Autenticacao e perfis.
- Biblioteca cientifica.
- Categorias e trilhas de aprendizagem.
- Progresso, quizzes e avaliacoes.
- Certificados com QR Code e pagina publica de validacao.
- Premium: IA academica, flashcards, simulados e offline.
