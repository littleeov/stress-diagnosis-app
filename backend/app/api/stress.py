from flask import Blueprint, request, jsonify
from ..models.stress_model import predict_stress

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

@stress_bp.route('/diagnose', methods=['POST'])
def diagnose():
    data = request.get_json()
    answers = data.get('answers')
    if not answers or not isinstance(answers, list):
        return jsonify({'error': 'No answers provided'}), 400

    total_score = 0
    for answer in answers:
        prediction = predict_stress(answer)
        total_score += prediction

    avg_score = total_score / len(answers)
    stress_label = int(round(avg_score))

    return jsonify({
        'stress_label': stress_label,
        'avg_score': avg_score
    })
