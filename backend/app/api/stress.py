from flask import Blueprint, request, jsonify
from backend.app.models.stress_model import predict_stress
from backend.app.db.models import Assessment, AssessmentDetail
from ..db.extensions import db

stress_bp = Blueprint('stress', __name__)

@stress_bp.route('/analyze', methods=['POST'])
def analyze_text():
    data = request.get_json()
    if not data or 'text' not in data:
        return jsonify({'error': 'No text provided'}), 400

    text = data['text']
    prediction = predict_stress(text)
    stress_label = int(round(prediction))


    return jsonify({'stress': stress_label, 'raw_score': prediction})