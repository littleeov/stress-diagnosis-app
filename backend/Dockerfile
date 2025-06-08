FROM python:3.10-slim

WORKDIR /app

# Установка системных зависимостей для psycopg2 и других пакетов
RUN apt-get update && apt-get install -y gcc libpq-dev && rm -rf /var/lib/apt/lists/*

COPY backend/ /app/

RUN pip install --upgrade pip && \
    pip install -r requirements.txt

EXPOSE 5000

CMD ["python", "wsgi.py"]
