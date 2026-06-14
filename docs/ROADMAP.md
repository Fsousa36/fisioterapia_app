# Roadmap de Producao

## Fase 1 - Base executavel

- Instalar dependencias com pnpm.
- Subir PostgreSQL, Redis e Meilisearch.
- Rodar Prisma generate, migrate e seed.
- Validar API, Admin, Web e Expo.

## Fase 2 - Autenticacao

- Registro por email com bcrypt.
- Login Google e Apple.
- Guards JWT e roles para admin/curador.
- SecureStore no mobile.

## Fase 3 - Conteudo Cientifico

- Implementar importadores separados por fonte.
- Persistir identificadores DOI, PMID, PMCID e URL publica.
- Criar tela de curadoria com aprovacao/rejeicao.
- Indexar artigos aprovados no Meilisearch.

## Fase 4 - Aprendizagem

- CRUD de trilhas, modulos, licoes, quizzes e avaliacao final.
- Controle de progresso por usuario.
- Certificados com PDF, QR Code e validacao publica.

## Fase 5 - Premium e distribuicao

- RevenueCat no mobile.
- IA academica, flashcards, simulados e offline.
- Builds Android/iOS com EAS.
- Deploy Dokploy com Nginx.
