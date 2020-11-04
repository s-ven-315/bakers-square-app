import flask
from flask_jwt_extended import jwt_required
from flask_api.blueprints.utils.decorators import api_post

from ..api_recipe import recipes_api_blueprint, recipeExists


@recipes_api_blueprint.route('/<recipeId>/setTag', methods=['POST'])
@api_post(['tagId'])
@recipeExists
def set_tag(recipeId: str):
    return flask.jsonify({'msg': 'Success'}), 200


@recipes_api_blueprint.route('/<recipeId>/unsetTag', methods=['POST'])
@api_post(['tagId'])
@recipeExists
def unset_tag(recipeId: str):
    return flask.jsonify({'msg': 'Success'}), 200
