FROM node:20-alpine AS base


FROM base AS builder
RUN apk add --no-cache libc6-compat
RUN apk update
# Set working directory
WORKDIR /app
RUN yarn global add turbo
COPY . .

# Generate a partial monorepo with a pruned lockfile for a target workspace.
RUN turbo prune --scope=@repo/api --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

# First install the dependencies (as they change less often)
COPY .gitignore .gitignore

# Build the project
COPY --from=builder /app/out/full/ .
RUN yarn install
RUN yarn generate
RUN yarn turbo run build --filter=api...

FROM base AS runner
WORKDIR /app
COPY --from=installer /app/ .

# Expose the port the app runs on
EXPOSE 8080
CMD [ "node", "apps/api/dist/main" ]
