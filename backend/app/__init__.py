from flask import Flask
from flask_login import LoginManager
from .db.database import init_db
from .db.models import User
import models
from flask_cors import CORS

login_manager = LoginManager()
login_manager.login_view = 'auth.login'  # маршрут для перенаправления неавторизованных пользователей

def create_app():
    app = Flask(__name__)
    CORS(app)

    app.config['SECRET_KEY'] = 'littleeov'
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:littleeov@localhost:5432/stress_assessment_db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    init_db(app)  # инициализация SQLAlchemy
    login_manager.init_app(app)  # инициализация Flask-Login

    @login_manager.user_loader
    def load_user(user_id):
        return User.query.get(int(user_id))

    # Регистрируем Blueprint'ы
    from .api.stress import stress_bp
    app.register_blueprint(stress_bp, url_prefix='/stress')

    from .api.auth import auth_bp  # создайте этот Blueprint для аутентификации
    app.register_blueprint(auth_bp, url_prefix='/auth')

    from .api.users import users_bp  # создайте Blueprint для работы с пользователями
    app.register_blueprint(users_bp, url_prefix='/users')

    return app
