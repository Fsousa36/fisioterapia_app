FROM node:22-alpine AS base
WORKDIR /app
RUN corepack enable

FROM base AS deps
COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml turbo.json tsconfig.base.json ./
COPY apps/admin/package.json apps/admin/package.json
RUN pnpm install --filter @fisiobase/admin... --frozen-lockfile=false

FROM deps AS build
COPY apps/admin apps/admin
RUN pnpm --filter @fisiobase/admin build

FROM base AS runner
ENV NODE_ENV=production
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/apps/admin/.next ./apps/admin/.next
COPY --from=build /app/apps/admin/package.json ./apps/admin/package.json
COPY --from=build /app/apps/admin/public* ./apps/admin/public
WORKDIR /app/apps/admin
EXPOSE 3000
CMD ["pnpm", "start"]
