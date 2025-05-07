import re
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences


max_words = 10000
max_len = 200
tokenizer = Tokenizer(num_words=max_words)

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
    padded = pad_sequences(sequence, maxlen=max_len)
    return padded