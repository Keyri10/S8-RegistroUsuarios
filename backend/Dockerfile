FROM node:18-alpine
WORKDIR /app

# copiar package primero para cache
COPY package*.json ./
RUN npm install --production

COPY . .

RUN chmod +x ./entrypoint.sh

EXPOSE 3000
CMD ["./entrypoint.sh"]
