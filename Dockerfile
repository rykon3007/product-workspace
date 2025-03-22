# Base image
FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:0-14

# Install additional dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    git \
    && rm -rf /var/lib/apt/lists/*

# Set environment variables
ENV NODE_ENV=development

# Set the working directory
WORKDIR /workspace

# Copy the project files into the container
COPY . /workspace

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["node", "index.js"]
