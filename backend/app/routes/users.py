from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from backend.app.extensions import db
from ..db.models import User, Assessment, AssessmentDetail

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
        'employee': user.employee,
        'created_at': user.created_at.isoformat()
    }
    return jsonify(profile_data)

@users_bp.route('/assessments', methods=['POST'])
@login_required
def save_assessment():
    data = request.get_json()
    response_data = data.get('response_data')  # массив ответов
    stress_score = data.get('stress_score')  # итоговый средний балл
    details = data.get('details', [])        # массив с деталями (user_answer, model_score)

    assessment = Assessment(
        user_id=current_user.id,
        response_data=response_data,
        stress_score=stress_score
    )
    db.session.add(assessment)
    db.session.commit()

    for detail in details:
        if detail.get('model_score')==0:
            model_score = 1
        else:
            model_score = detail.get('model_score')
        assessment_detail = AssessmentDetail(
            assessment_id=assessment.id,
            user_answer=detail.get('user_answer'),
            model_score=model_score
        )
        db.session.add(assessment_detail)

    db.session.commit()

    return jsonify({'message': 'Результаты успешно сохранены'}), 201

@users_bp.route('/assessments/last', methods=['GET'])
@login_required
def get_last_assessment():
    assessment = Assessment.query.filter_by(user_id=current_user.id).order_by(Assessment.created_at.desc()).first()
    if not assessment:
        return jsonify({'error': 'Нет данных'}), 404
    return jsonify({
        'id': assessment.id,
        'stress_score': assessment.stress_score,
        'response_data': assessment.response_data,
        'created_at': assessment.created_at.isoformat()
    })

@users_bp.route('/assessments', methods=['GET'])
@login_required
def get_assessments():
    assessments = Assessment.query.filter_by(user_id=current_user.id).order_by(Assessment.created_at.desc()).all()
    result = []
    for a in assessments:
        result.append({
            'id': a.id,
            'stress_score': a.stress_score,
            'response_data': a.response_data,
            'created_at': a.created_at.isoformat()
        })
    return jsonify(result)

@users_bp.route('/company/stats', methods=['GET'])
@login_required
def company_stats():
    if not current_user.is_company:
        return jsonify({'error': 'Доступ только для компаний'}), 403

    employees = User.query.filter_by(employee=current_user.name).all()

    stressed = 0
    no_stress = 0
    employees_results = []

    for emp in employees:
        last_assessment = Assessment.query.filter_by(user_id=emp.id).order_by(Assessment.created_at.desc()).first()
        if last_assessment:
            score = last_assessment.stress_score
            employees_results.append({
                'id': emp.id,
                'name': f"{emp.surname or ''} {emp.name} {emp.patronymic or ''}".strip(),
                'stress_score': score
            })
            if score > 0.5:
                stressed += 1
            else:
                no_stress += 1

    total = stressed + no_stress
    stressed_percent = (stressed / total * 100) if total else 0
    no_stress_percent = (no_stress / total * 100) if total else 0

    return jsonify({
        'company_name': current_user.username,
        'employee_count': len(employees),
        'stressed_percent': stressed_percent,
        'no_stress_percent': no_stress_percent,
        'employees_results': employees_results
    })
