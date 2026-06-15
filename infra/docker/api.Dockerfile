FROM node:22-alpine AS base
WORKDIR /app
RUN corepack enable && pnpm config set store-dir /app/.pnpm-store

# ---- Install deps ----
FROM base AS deps
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json turbo.json tsconfig.base.json ./
COPY apps/api/package.json apps/api/package.json
COPY packages/database/package.json packages/database/package.json
COPY packages/types/package.json packages/types/package.json
RUN pnpm install --frozen-lockfile=false

# ---- Build packages ----
FROM deps AS build-packages
COPY packages/database packages/database
COPY packages/types packages/types
# Generate Prisma client
RUN pnpm --filter @fisiobase/database exec prisma generate
# Build shared packages
RUN pnpm --filter @fisiobase/types build
RUN pnpm --filter @fisiobase/database build

# ---- Build API ----
FROM build-packages AS build-api
COPY apps/api apps/api
RUN pnpm --filter @fisiobase/api build

# ---- Runner ----
FROM base AS runner
ENV NODE_ENV=production
ENV PORT=3333

# Copy built packages
COPY --from=build-api /app/packages/types/dist /app/packages/types/dist
COPY --from=build-api /app/packages/types/package.json /app/packages/types/package.json
COPY --from=build-api /app/packages/database/dist /app/packages/database/dist
COPY --from=build-api /app/packages/database/package.json /app/packages/database/package.json
COPY --from=build-api /app/packages/database/prisma /app/packages/database/prisma

# Copy API dist
COPY --from=build-api /app/apps/api/dist /app/apps/api/dist
COPY --from=build-api /app/apps/api/package.json /app/apps/api/package.json

# Copy node_modules from the build stage after Prisma Client generation
COPY --from=build-api /app/node_modules /app/node_modules
COPY --from=build-api /app/apps/api/node_modules /app/apps/api/node_modules
COPY --from=build-api /app/packages/database/node_modules /app/packages/database/node_modules
COPY --from=deps /app/pnpm-lock.yaml /app/pnpm-lock.yaml

WORKDIR /app/apps/api
EXPOSE 3333
CMD ["node", "dist/main.js"]
