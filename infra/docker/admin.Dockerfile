FROM node:22-alpine AS base
WORKDIR /app
RUN corepack enable && pnpm config set store-dir /app/.pnpm-store

# ---- Install deps ----
FROM base AS deps
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json turbo.json tsconfig.base.json ./
COPY apps/admin/package.json apps/admin/package.json
RUN pnpm install --frozen-lockfile=false

# ---- Build admin ----
FROM deps AS build-admin
ENV API_INTERNAL_URL=http://api:3333
ENV NEXT_PUBLIC_API_URL=/api
ENV NEXT_STANDALONE=true
COPY apps/admin apps/admin
RUN pnpm --filter @fisiobase/admin build

# ---- Runner (Next.js standalone) ----
FROM base AS runner
ENV NODE_ENV=production
ENV PORT=3000

# Next.js standalone output
COPY --from=build-admin /app/apps/admin/.next/standalone /app/
COPY --from=build-admin /app/apps/admin/.next/static /app/apps/admin/.next/static
COPY --from=build-admin /app/apps/admin/public /app/apps/admin/public

WORKDIR /app/apps/admin
EXPOSE 3000
CMD ["node", "server.js"]
