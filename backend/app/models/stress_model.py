from tensorflow.keras.models import load_model
from .preprocessing import tokenizer, preprocess_text  # поменяем название на правильное
import os

_model = None

def get_model():
    global _model
    if _model is None:
        model_path = os.path.join(os.path.dirname(__file__), 'stress_model.h5')
        _model = load_model(model_path)
    return _model

def predict_stress(text: str) -> float:
    processed = preprocess_text(text)
    model = get_model()
    prediction = model.predict(processed)
    return float(prediction[0][0])