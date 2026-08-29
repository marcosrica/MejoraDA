# ---- Builder stage ----
FROM node:lts-trixie-slim AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci && npm cache clean --force
COPY . .
RUN npm run build

# ---- Production stage (Nginx) ----
FROM nginx:alpine AS production

# Copy your custom Nginx config into the container
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built static files
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

# Healthcheck uses wget (built into alpine/nginx)
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1