import os

from flask_jwt_extended import JWTManager
from flask_login import LoginManager
from flask import Flask
from flask_wtf.csrf import CSRFProtect
from models.user import User
from services.database import db

web_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'flask_web')


app = Flask('NEXTAGRAM', root_path=web_dir)
csrf = CSRFProtect(app)
app.config['JWT_SECRET_KEY'] = 'super-secret'  # Change this!
jwt = JWTManager(app)

if os.getenv('FLASK_ENV') == 'production':
    app.config.from_object("config.ProductionConfig")
else:
    app.config.from_object("config.DevelopmentConfig")


@app.before_request
def before_request():
    db.connect()


@app.teardown_request
def _db_close(exc):
    if not db.is_closed():
        print(db)
        print(db.close())
    return exc


login_manager = LoginManager()
login_manager.init_app(app)


@login_manager.user_loader
def load_user(user_id):
    return User.get_by_id(user_id)
