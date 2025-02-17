# Use a lightweight Node.js image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the entire project
COPY . .

# **Build the Next.js app in standalone mode**
RUN npm run build

# **Move to a minimal runtime image for efficiency**
FROM node:18-alpine

WORKDIR /app

# Copy only the necessary files for standalone mode
COPY --from=0 /app/.next/standalone ./
COPY --from=0 /app/public ./public
COPY --from=0 /app/.next/static ./.next/static

# Expose port 3000
EXPOSE 3000

# **Start the standalone server**
CMD ["node", "server.js"]
