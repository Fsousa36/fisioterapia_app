FROM node:22-alpine AS base
WORKDIR /app
RUN corepack enable

FROM base AS deps
COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml turbo.json tsconfig.base.json ./
COPY apps/api/package.json apps/api/package.json
COPY packages/database/package.json packages/database/package.json
COPY packages/types/package.json packages/types/package.json
RUN pnpm install --filter @fisiobase/api... --frozen-lockfile=false

FROM deps AS build
COPY apps/api apps/api
COPY packages/database packages/database
COPY packages/types packages/types
RUN pnpm --filter @fisiobase/database db:generate
RUN pnpm --filter @fisiobase/api build

FROM base AS runner
ENV NODE_ENV=production
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/apps/api/dist ./apps/api/dist
COPY --from=build /app/apps/api/package.json ./apps/api/package.json
COPY --from=build /app/packages/database ./packages/database
WORKDIR /app/apps/api
EXPOSE 3333
CMD ["node", "dist/main.js"]
