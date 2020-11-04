import flask
from flask_jwt_extended import jwt_required
from flask_api.blueprints.utils.decorators import api_post

from ..api_recipe import recipes_api_blueprint, recipeExists


@recipes_api_blueprint.route('/<recipeId>/setEquipment', methods=['POST'])
@api_post(['equipmentId'])
@recipeExists
def set_equipment(recipeId: str):
    return flask.jsonify({'msg': 'Success'}), 200


@recipes_api_blueprint.route('/<recipeId>/unsetEquipment', methods=['POST'])
@api_post(['equipmentId'])
@recipeExists
def unset_equipment(recipeId: str):
    return flask.jsonify({'msg': 'Success'}), 200
