from app import app
from flask_cors import CORS

from flask_api.blueprints.api_auth import auth_api_blueprint
from flask_api.blueprints.api_comment import comments_api_blueprint
from flask_api.blueprints.api_equipment import equipments_api_blueprint
from flask_api.blueprints.api_ingredient import ingredients_api_blueprint
from flask_api.blueprints.api_recipe import recipes_api_blueprint
from flask_api.blueprints.api_step import steps_api_blueprint
from flask_api.blueprints.api_tag import tags_api_blueprint
from flask_api.blueprints.api_user import users_api_blueprint

import flask_api.blueprints.relations.api_like
import flask_api.blueprints.relations.api_recipe_equipment
import flask_api.blueprints.relations.api_recipe_ingredient
import flask_api.blueprints.relations.api_recipe_tag
import flask_api.blueprints.relations.api_step_equipment
import flask_api.blueprints.relations.api_step_ingredient
import flask_api.blueprints.relations.api_subscription

cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

app.register_blueprint(auth_api_blueprint, url_prefix='/api/auth')
app.register_blueprint(users_api_blueprint, url_prefix='/api/users')
app.register_blueprint(comments_api_blueprint, url_prefix='/api/comments')
app.register_blueprint(equipments_api_blueprint, url_prefix='/api/equipments')
app.register_blueprint(ingredients_api_blueprint, url_prefix='/api/ingredients')
app.register_blueprint(recipes_api_blueprint, url_prefix='/api/recipes')
app.register_blueprint(steps_api_blueprint, url_prefix='/api/steps')
app.register_blueprint(tags_api_blueprint, url_prefix='/api/tags')





