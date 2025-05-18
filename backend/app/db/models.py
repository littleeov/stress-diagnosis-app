from .database import db

class Company(db.Model):
    __tablename__ = 'companies'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), unique=True, nullable=False)
    address = db.Column(db.Text)
    created_at = db.Column(db.DateTime, server_default=db.func.current_timestamp())

    employees = db.relationship('Employee', backref='company', cascade='all, delete-orphan', lazy=True)

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(50), default='user')
    created_at = db.Column(db.DateTime, server_default=db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, server_default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())

    employees = db.relationship('Employee', backref='user', cascade='all, delete-orphan', lazy=True)
    assessments = db.relationship('Assessment', backref='user', cascade='all, delete-orphan', lazy=True)

class Employee(db.Model):
    __tablename__ = 'employees'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete="CASCADE"), nullable=False)
    company_id = db.Column(db.Integer, db.ForeignKey('companies.id', ondelete="CASCADE"), nullable=False)
    position = db.Column(db.String(100))
    hired_at = db.Column(db.Date)
    __table_args__ = (db.UniqueConstraint('user_id', 'company_id', name='_user_company_uc'),)

class Question(db.Model):
    __tablename__ = 'questions'
    id = db.Column(db.Integer, primary_key=True)
    question_text = db.Column(db.Text, nullable=False)
    order_num = db.Column(db.Integer, nullable=False, default=0)
    created_at = db.Column(db.DateTime, server_default=db.func.current_timestamp())

    assessment_details = db.relationship('AssessmentDetail', backref='question', cascade='all, delete-orphan', lazy=True)

class Assessment(db.Model):
    __tablename__ = 'assessments'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete="CASCADE"), nullable=False)
    response_data = db.Column(db.JSON, nullable=False)
    stress_score = db.Column(db.Float)
    created_at = db.Column(db.DateTime, server_default=db.func.current_timestamp())

    details = db.relationship('AssessmentDetail', backref='assessment', cascade='all, delete-orphan', lazy=True)

class AssessmentDetail(db.Model):
    __tablename__ = 'assessment_details'
    id = db.Column(db.Integer, primary_key=True)
    assessment_id = db.Column(db.Integer, db.ForeignKey('assessments.id', ondelete="CASCADE"), nullable=False)
    question_id = db.Column(db.Integer, db.ForeignKey('questions.id', ondelete="CASCADE"), nullable=False)
    user_answer = db.Column(db.Text, nullable=False)
    model_score = db.Column(db.Float)
    model_label = db.Column(db.String(100))
    created_at = db.Column(db.DateTime, server_default=db.func.current_timestamp())
