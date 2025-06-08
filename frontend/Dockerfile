FROM node:20

WORKDIR /app

COPY frontend/ /app

RUN npm install && npm run build

# Установка serve для запуска production-сборки
RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "build"]

