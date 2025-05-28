from flask import Flask
from flask_login import LoginManager
from flask_cors import CORS
from .db.database import init_db

login_manager = LoginManager()
login_manager.login_view = 'auth.login'

def create_app():
    app = Flask(__name__)
    CORS(app)

    app.config['SECRET_KEY'] = 'littleeov'
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:littleeov@localhost:5432/stress_assessment_db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Инициализация SQLAlchemy и LoginManager
    init_db(app)  # Теперь db инициализируется до импорта моделей
    login_manager.init_app(app)

    # Импорт моделей и user_loader после инициализации db
    from .db.models import User

    @login_manager.user_loader
    def load_user(user_id):
        return User.query.get(int(user_id))

    # Регистрация Blueprints
    from .api.stress import stress_bp
    from .api.auth import auth_bp
    from .api.users import users_bp

    app.register_blueprint(stress_bp, url_prefix='/stress')
    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(users_bp, url_prefix='/users')

    return app
