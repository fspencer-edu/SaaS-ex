FROM node:20-apline AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install

FROM node:20-apline AS builder
WORKDIR /aoo
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run builder

FROM node:20-apline as runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app ./
EXPOSE 3000
CMD ["npm", "start"]