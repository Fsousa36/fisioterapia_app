Crie um aplicativo chamado FisioBase Academy.

Objetivo:
Plataforma mobile para estudantes e profissionais de fisioterapia baseada em evidências científicas.

Stack:

* React Native Expo
* TypeScript
* Expo Router
* Zustand
* React Query
* NestJS
* PostgreSQL
* Prisma
* Redis
* Docker
* Next.js Admin
* Tailwind
* ShadCN UI

Funcionalidades:

1. Login

* Email
* Google
* Apple

2. Biblioteca Científica

* PubMed
* Europe PMC
* SciELO
* LILACS

3. Categorias

* Ortopedia
* Neurologia
* Cardiorrespiratória
* Pediatria
* Geriatria
* Esportiva
* Saúde da Mulher
* Terapia Manual

4. Trilhas de Aprendizagem

* Módulos
* Lições
* Artigos
* Quiz
* Avaliação Final

5. Controle de Progresso

* Tempo estudado
* Conteúdo concluído
* Nota
* Barra de progresso

6. Certificados

* PDF
* QR Code
* Código único
* Página pública de validação

7. Premium

* IA acadêmica
* Flashcards
* Simulados
* Download offline

8. Admin

* Usuários
* Artigos
* Trilhas
* Certificados

Crie primeiro:

* Arquitetura do projeto
* Estrutura de pastas
* Schema Prisma
* Banco de dados
* Backend NestJS
* Frontend React Native
* Painel Admin Next.js

Projeto preparado para Android, iPhone, Play Store e App Store.

BIBLIOTECAS E INTEGRAÇÕES OBRIGATÓRIAS

Mobile React Native / Expo:

* expo-router
* expo-secure-store
* expo-file-system
* expo-sharing
* expo-notifications
* expo-image-picker
* expo-splash-screen
* expo-linking
* react-native-reanimated
* react-native-gesture-handler
* react-native-safe-area-context
* react-native-svg
* react-native-paper ou tamagui
* zustand
* @tanstack/react-query
* react-hook-form
* zod
* axios
* dayjs
* i18next
* revenuecat/purchases-expo

Backend NestJS:

* @nestjs/config
* @nestjs/jwt
* @nestjs/passport
* passport-jwt
* bcrypt
* prisma
* @prisma/client
* class-validator
* class-transformer
* @nestjs/swagger
* @nestjs/throttler
* helmet
* cors
* bullmq
* ioredis
* axios
* pdf-lib ou puppeteer
* qrcode
* sharp
* winston ou pino

Admin Next.js:

* next
* react
* typescript
* tailwindcss
* shadcn/ui
* lucide-react
* @tanstack/react-query
* react-hook-form
* zod
* recharts
* axios

Banco e infraestrutura:

* PostgreSQL
* Redis
* Meilisearch
* Docker
* Docker Compose
* Nginx
* Dokploy

Bases científicas e fontes de dados:

* PubMed / NCBI E-utilities
* Europe PMC REST API
* PubMed Central
* PEDro Physiotherapy Evidence Database
* Cochrane Library, quando permitido por acesso/licença
* SciELO, para artigos científicos em português e América Latina
* BVS / LILACS, para literatura científica em saúde da América Latina
* ClinicalTrials.gov, para estudos clínicos
* WHO / OMS, para documentos e diretrizes públicas

Regras importantes:

* Sempre salvar a fonte original do artigo.
* Sempre salvar DOI, PMID, PMCID ou URL pública quando disponível.
* Nunca copiar conteúdo fechado ou protegido por copyright sem permissão.
* Priorizar abstracts, metadados, links oficiais e conteúdo open access.
* Criar campo de licença/fonte para cada conteúdo.
* Criar importadores separados para cada base científica.
* Criar logs de importação.
* Criar sistema de curadoria antes de publicar conteúdo no app.
