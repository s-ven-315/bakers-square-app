from app import app, csrf
from flask_cors import CORS

cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

# API Routes
from flask_api.blueprints.auth import auth_api_blueprint

app.register_blueprint(auth_api_blueprint, url_prefix='/api/auth')
csrf.exempt(auth_api_blueprint)


