FROM node:22-alpine AS base
WORKDIR /app
RUN corepack enable

FROM base AS deps
COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml turbo.json tsconfig.base.json ./
COPY apps/web/package.json apps/web/package.json
RUN pnpm install --filter @fisiobase/web... --frozen-lockfile=false

FROM deps AS build
COPY apps/web apps/web
RUN pnpm --filter @fisiobase/web build

FROM base AS runner
ENV NODE_ENV=production
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/apps/web/.next ./apps/web/.next
COPY --from=build /app/apps/web/package.json ./apps/web/package.json
COPY --from=build /app/apps/web/public* ./apps/web/public
WORKDIR /app/apps/web
EXPOSE 3001
CMD ["pnpm", "start"]
