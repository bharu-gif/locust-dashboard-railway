# Build Stage
FROM node:18 as build

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Serve Stage
FROM node:18

RUN npm install -g serve
WORKDIR /app
COPY --from=build /app/dist ./build
CMD ["serve", "-s", "build", "-l", "3000"]
