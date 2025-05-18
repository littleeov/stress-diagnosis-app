from flask import Flask
from .db.database import init_db
import models

def create_app():
    app = Flask(__name__)

    # Регистрируем blueprint с API
    from .api.stress import stress_bp
    app.register_blueprint(stress_bp, url_prefix='/api')

    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:littleeov@localhost:5432/stress_assessment_db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    init_db(app)

    return app