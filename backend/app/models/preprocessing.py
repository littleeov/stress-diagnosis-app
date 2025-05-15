import re
import os
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.preprocessing.text import tokenizer_from_json

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
tokenizer_path = os.path.join(BASE_DIR, 'tokenizer.json')

with open(tokenizer_path, 'r', encoding='utf-8') as f:
    tokenizer_json = f.read()

tokenizer = tokenizer_from_json(tokenizer_json)

def cleaned_text(text: str) -> str:
    # Удаление специальных символов и цифр
    text = re.sub(r'[^a-zA-Z\s]', '', text)
    # Приведение к нижнему регистру
    text = text.lower()
    # Удаление лишних пробелов
    text = re.sub(r'\s+', ' ', text).strip()
    return text

def preprocessing_text(text: str) -> str:
    cleaned = cleaned_text(text)
    sequence = tokenizer.texts_to_sequences([cleaned])
    padded = pad_sequences(sequence, maxlen=200)
    return padded