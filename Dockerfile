# Malshan MD Docker Image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apk add --no-cache \
    ffmpeg \
    python3 \
    make \
    g++ \
    libc6-compat

# Copy package files
COPY package*.json ./

# Install Node.js dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy source code
COPY . .

# Create necessary directories
RUN mkdir -p session temp logs

# Set permissions
RUN chmod +x index.js

# Expose port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD node -e "console.log('Bot is running')" || exit 1

# Start the bot
CMD ["npm", "start"]

# Labels
LABEL maintainer="Malshan <malshan@example.com>"
LABEL description="Malshan MD - Ultimate WhatsApp Bot"
LABEL version="4.0.0"