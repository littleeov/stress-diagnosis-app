import tensorflow as tf
import os
from .preprocessing import preprocessing_text

# Абсолютный путь к файлу модели
MODEL_PATH = os.path.join(os.path.dirname(__file__), 'stress_model.h5')

# Загрузка модели один раз при импорте модуля
model = tf.keras.models.load_model(MODEL_PATH)

def predict_stress(text: str) -> float:
    # Здесь должна быть ваша предобработка текста (токенизация, паддинг)
    processed_input = preprocessing_text(text)

    # Предсказание модели (пример для одного образца)
    prediction = model.predict(processed_input)

    # prediction - массив, берем первый элемент и первый класс
    return float(prediction[0][0])