import flask
from flask_jwt_extended import jwt_required
from flask_api.blueprints.utils.decorators import api_post

recipes_api_blueprint = flask.Blueprint('recipes_api', __name__)


@recipes_api_blueprint.route('/', methods=['GET'])
@jwt_required
def get_recipes():
    userId = flask.request.args.get('userId')
    return flask.jsonify({}), 200


@recipes_api_blueprint.route('/<recipeId>', methods=['GET'])
@jwt_required
def get_recipe(recipeId: str):
    return flask.jsonify({}), 200


@recipes_api_blueprint.route('/', methods=['POST'])
@jwt_required
@api_post()
def add_recipe():
    userId = flask.request.args.get('userId')
    return flask.jsonify({}), 200


@recipes_api_blueprint.route('/<recipeId>/edit', methods=['POST'])
@jwt_required
@api_post()
def edit_recipe(recipeId: str):
    return flask.jsonify({}), 200


@recipes_api_blueprint.route('/<recipeId>/delete', methods=['POST'])
@jwt_required
@api_post()
def delete_recipe(recipeId: str):
    return flask.jsonify({}), 200
