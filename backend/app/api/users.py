from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from backend.app.db.models import Assessment, AssessmentDetail
from backend.app.db.database import db

users_bp = Blueprint('users', __name__)

@users_bp.route('/profile', methods=['GET'])
@login_required
def get_profile():
    user = current_user
    profile_data = {
        'id': user.id,
        'username': user.username,
        'surname': user.surname,
        'name': user.name,
        'patronymic': user.patronymic,
        'email': user.email,
        'is_company': user.is_company,
        'created_at': user.created_at.isoformat()
    }
    return jsonify(profile_data)

@users_bp.route('/assessments', methods=['POST'])
@login_required
def save_assessment():
    data = request.get_json()

    assessment = Assessment(
        user_id=current_user.id,
        response_data=data.get('response_data'),
        stress_score=data.get('stress_score')
    )
    db.session.add(assessment)
    db.session.commit()

    # Сохраняем детальные результаты
    details = data.get('details', [])
    for detail in details:
        assessment_detail = AssessmentDetail(
            assessment_id=assessment.id,
            user_answer=detail.get('user_answer'),
            model_score=detail.get('model_score')
        )
        db.session.add(assessment_detail)

    db.session.commit()

    return jsonify({'message': 'Результаты успешно сохранены'}), 201

@users_bp.route('/assessments', methods=['GET'])
@login_required
def get_assessments():
    assessments = Assessment.query.filter_by(user_id=current_user.id).all()
    result = []
    for a in assessments:
        result.append({
            'id': a.id,
            'stress_score': a.stress_score,
            'response_data': a.response_data,
            'created_at': a.created_at.isoformat()
        })
    return jsonify(result)
