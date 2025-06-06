FROM node:22.12-alpine AS builder

WORKDIR /app

# Copy package files for installation
COPY package*.json ./

# Install dependencies without running scripts
RUN --mount=type=cache,target=/root/.npm npm install --ignore-scripts

# Copy source code
COPY tsconfig.json ./
COPY *.ts ./

# Build the project
RUN npm run build

FROM node:22-alpine AS release

WORKDIR /app

# Copy package files and built files
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

# Set environment
ENV NODE_ENV=production

# Install production dependencies only
RUN npm ci --ignore-scripts --omit=dev

# Make the entry point executable
RUN chmod +x ./dist/index.js

# Set metadata
LABEL org.opencontainers.image.title="Sequential Thinking MCP Server"
LABEL org.opencontainers.image.description="MCP server for sequential thinking and problem solving"
LABEL org.opencontainers.image.authors="Zeng Wenliang"
LABEL org.opencontainers.image.source="https://github.com/zengwenliang416/mcp-server-sequential-thinking"

ENTRYPOINT ["node", "dist/index.js"]
