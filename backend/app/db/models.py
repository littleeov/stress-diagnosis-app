from ...app.extensions import db  # Импортируем db из единого источника
from flask_login import UserMixin
from flask_bcrypt import generate_password_hash, check_password_hash

class User(UserMixin, db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), nullable=False)
    surname = db.Column(db.String(120))
    name = db.Column(db.String(80), nullable=False)
    patronymic = db.Column(db.String(120))
    email = db.Column(db.String(120), nullable=False, unique=True)
    password_hash = db.Column(db.String(255), nullable=False)
    is_company = db.Column(db.Boolean, nullable=False, default=False)
    employee = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), onupdate=db.func.now())

    assessments = db.relationship("Assessment", back_populates="user")

    def set_password(self, password):
        self.password_hash = generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class Assessment(db.Model):
    __tablename__ = "assessments"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    response_data = db.Column(db.JSON, nullable=False)
    stress_score = db.Column(db.Float)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    user = db.relationship("User", back_populates="assessments")
    assessment_details = db.relationship("AssessmentDetail", back_populates="assessment")

class AssessmentDetail(db.Model):
    __tablename__ = "assessment_details"

    id = db.Column(db.Integer, primary_key=True)
    assessment_id = db.Column(db.Integer, db.ForeignKey("assessments.id"), nullable=False)
    user_answer = db.Column(db.Text, nullable=False)
    model_score = db.Column(db.Float)

    assessment = db.relationship("Assessment", back_populates="assessment_details")
