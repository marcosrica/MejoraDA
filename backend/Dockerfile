# ---- Builder stage ----
FROM node:lts-trixie-slim AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci && npm cache clean --force

COPY . .

# Build TypeScript 
RUN npm run build

RUN echo "=== All files in /app ===" && ls -la /app
RUN echo "=== Searching for server.js ===" && find /app -name "server.js"

# ---- Production stage ----
FROM node:lts-trixie-slim AS production

WORKDIR /app

RUN addgroup --gid 1001 nodejs && \
    adduser --uid 1001 --gid 1001 --disabled-password --gecos "" nextjs

# Copy compiled code and production modules
COPY --from=builder --chown=nextjs:nodejs /app/dist ./dist
COPY --from=builder --chown=nextjs:nodejs /app/package*.json ./
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules

USER nextjs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"


CMD ["node", "dist/src/server.js"]