import flask
from flask_jwt_extended import jwt_required
from flask_api.blueprints.utils.decorators import api_post

from ..api_recipe import recipes_api_blueprint, recipeExists


@recipes_api_blueprint.route('/<recipeId>/setIngredient', methods=['POST'])
@api_post(['ingredientId'])
@recipeExists
def set_ingredient(recipeId: str):
    return flask.jsonify({'msg': 'Success'}), 200


@recipes_api_blueprint.route('/<recipeId>/unsetIngredient', methods=['POST'])
@api_post(['ingredientId'])
@recipeExists
def unset_ingredient(recipeId: str):
    return flask.jsonify({'msg': 'Success'}), 200
