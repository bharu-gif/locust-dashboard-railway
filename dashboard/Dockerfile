# Build Stage
FROM node:18-alpine as build

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./
RUN npm ci --only=production

# Copy source code and build
COPY . .
RUN npm run build

# Serve Stage
FROM nginx:stable-alpine

# Copy build output to nginx html directory
COPY --from=build /app/build /usr/share/nginx/html

# Add nginx configuration if needed
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
