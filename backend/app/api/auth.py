from flask import Blueprint, request, jsonify
from flask_login import login_user, logout_user, login_required
from ..db.models import User  # Относительный импорт
from ..db.extensions import db

auth_bp = Blueprint('auth', __name__)


@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    surname = data.get('surname')
    name = data.get('name')
    patronymic = data.get('patronymic')
    email = data.get('email')
    password = data.get('password')
    is_company = data.get('is_company', False)
    employee = data.get('employee')

    # Проверка существующего пользователя
    existing_user = User.query.filter(
        (User.email == email) | (User.username == username)
    ).first()

    if existing_user:
        return jsonify({'error': 'Пользователь уже существует'}), 400

    # Создание пользователя
    new_user = User(
        username=username,
        name=name,
        surname=surname if not is_company else None,
        patronymic=patronymic if not is_company else None,
        email=email,
        is_company=is_company,
        employee=employee if not is_company else None
    )

    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'Регистрация успешна'}), 201


@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()
    if user and user.check_password(password):
        login_user(user)
        return jsonify({'message': 'Успешный вход'})
    else:
        return jsonify({'error': 'Неверный email или пароль'}), 401

@auth_bp.route('/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return jsonify({'message': 'Вы вышли из системы'})