# Use Node.js 18 alpine image for smaller size
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package*.json pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./

# Copy packages directory
COPY packages/app-landing/package.json packages/app-landing/
COPY packages/ui/package.json packages/ui/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY packages/app-landing/ packages/app-landing/
COPY packages/ui/ packages/ui/
COPY tsconfig.base.json ./

# Build the application
WORKDIR /app/packages/app-landing
RUN pnpm build

# Expose port
EXPOSE 3001

# Start the application in preview mode
CMD ["pnpm", "preview", "--host", "0.0.0.0", "--port", "3001"]
