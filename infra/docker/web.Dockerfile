FROM node:22-alpine AS base
WORKDIR /app
RUN corepack enable && pnpm config set store-dir /app/.pnpm-store

# ---- Install deps ----
FROM base AS deps
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json turbo.json tsconfig.base.json ./
COPY apps/web/package.json apps/web/package.json
COPY packages/types/package.json packages/types/package.json
RUN pnpm install --frozen-lockfile=false

# ---- Build types ----
FROM deps AS build-types
COPY packages/types packages/types
RUN pnpm --filter @fisiobase/types build

# ---- Build web ----
FROM build-types AS build-web
COPY apps/web apps/web
RUN pnpm --filter @fisiobase/web build

# ---- Runner (Next.js standalone) ----
FROM base AS runner
ENV NODE_ENV=production
ENV PORT=3001

# Next.js standalone output structure:
# .next/standalone/ contains the server and its dependencies
COPY --from=build-web /app/apps/web/.next/standalone /app/apps/web/
COPY --from=build-web /app/apps/web/.next/static /app/apps/web/.next/static
COPY --from=build-web /app/apps/web/public /app/apps/web/public

# Copy built types package
COPY --from=build-types /app/packages/types/dist /app/packages/types/dist
COPY --from=build-types /app/packages/types/package.json /app/packages/types/package.json

WORKDIR /app/apps/web
EXPOSE 3001
CMD ["node", "server.js"]
