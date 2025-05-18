from flask import Blueprint, request, jsonify
from flask_login import login_user, logout_user, login_required
from .db.models import User
from .db.database import db

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()
    if user and user.check_password(password):
        login_user(user)
        return jsonify({'message': 'Успешный вход'})
    return jsonify({'error': 'Неверный email или пароль'}), 401
