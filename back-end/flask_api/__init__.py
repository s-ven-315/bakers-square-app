from app import app, csrf
from flask_cors import CORS

from flask_api.blueprints.auth import auth_api_blueprint
from flask_api.blueprints.users import users_api_blueprint

cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

app.register_blueprint(auth_api_blueprint, url_prefix='/api/auth')
app.register_blueprint(users_api_blueprint, url_prefix='/api/user')

csrf.exempt(auth_api_blueprint)
csrf.exempt(users_api_blueprint)


