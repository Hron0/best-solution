FROM node:22.1.0-alpine3.19 AS base
WORKDIR /app

# Dependencies stage - install all dependencies including dev dependencies
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed
RUN apk add --no-cache libc6-compat

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci

# Builder stage - build the application
FROM base AS builder
WORKDIR /app

# Copy dependencies
COPY --from=deps /app/node_modules ./node_modules

# Copy all project files
COPY . .

# Set build-time environment variables (NEXT_PUBLIC_* variables)
ARG DATABASE_URL

ARG NEXT_PUBLIC_URL

COPY .env.production.sample .env
COPY .env.production.sample .env.production
COPY .env.production.sample .env.runtime

# Build the application
RUN npm run build

# Runner stage - run the application
FROM base AS runner
WORKDIR /app

# Set environment to production
ENV NODE_ENV=production

# Create a non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy only necessary files from the builder stage
COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Copy standalone output from .next/standalone
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch to non-root user
USER nextjs

# Expose the port the app runs on
EXPOSE 3000

ENV DATABASE_URL=""
ENV BLOB_READ_WRITE_TOKEN=""
ENV NEXTAUTH_SECRET=""
ENV RESEND_KEY=""

# Start the application
CMD ["node", "server.js"]