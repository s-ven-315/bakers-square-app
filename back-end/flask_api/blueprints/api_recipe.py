import flask
from flask_jwt_extended import jwt_required
from flask_api.blueprints.utils.decorators import api_post
from models.model_recipe import Recipe

recipes_api_blueprint = flask.Blueprint('recipes_api', __name__)


@recipes_api_blueprint.route('/', methods=['GET'])
@jwt_required
def get_recipes():
    userId = flask.request.args.get('userId')
    return flask.jsonify({}), 200


@recipes_api_blueprint.route('/<recipeId>', methods=['GET'])
@jwt_required
def get_recipe(recipeId: str):
    recipe = Recipe.get_or_none(Recipe.id == recipeId)

    if recipe:
        return flask.jsonify(recipe.as_dict()), 200
    else:
        return flask.jsonify({'msg': 'Recipe does not exists'}), 400


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
