from flask import Flask
from flask_cors import CORS
from backend.app.extensions import login_manager
from backend.app.db.database import init_db
import os

def create_app():
    app = Flask(__name__)
    CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

    # Конфигурация
    app.config['SECRET_KEY'] = 'littleeov'
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('SQLALCHEMY_DATABASE_URI', 'postgresql://postgres:littleeov@localhost:5432/stress_assessment_db')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Инициализация расширений
    init_db(app)  # Инициализация SQLAlchemy
    login_manager.init_app(app)
    login_manager.login_view = 'auth.login'

    # Импорт моделей и user_loader ПОСЛЕ инициализации db
    from .db.models import User

    @login_manager.user_loader
    def load_user(user_id):
        return User.query.get(int(user_id))

    # Регистрация Blueprints
    from .routes.stress import stress_bp
    from .routes.auth import auth_bp
    from .routes.users import users_bp

    app.register_blueprint(stress_bp, url_prefix='/stress')
    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(users_bp, url_prefix='/users')

    return app