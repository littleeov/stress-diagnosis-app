from flask import Flask

def create_app():
    app = Flask(__name__)

    # Регистрируем blueprint с API
    from app.api.stress import stress_bp
    app.register_blueprint(stress_bp, url_prefix='/api')

    return app