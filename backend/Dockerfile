# Dockerfile
FROM python:3.11-slim

# Установка зависимостей
WORKDIR /app

COPY requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt

# Копируем проект
COPY . .

# Установка переменной окружения
ENV FLASK_APP=wsgi.py

# Открываем порт
EXPOSE 5000

CMD ["python", "wsgi.py"]
