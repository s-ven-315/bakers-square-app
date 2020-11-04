import flask
from flask_jwt_extended import jwt_required
from flask_api.blueprints.utils.decorators import api_post

from ..api_step import steps_api_blueprint, stepExists


@steps_api_blueprint.route('/<stepId>/setIngredient', methods=['POST'])
@api_post(['ingredientId'])
@stepExists
def set_ingredient(stepId: str):
    return flask.jsonify({'msg': 'Success'}), 200


@steps_api_blueprint.route('/<stepId>/unsetIngredient', methods=['POST'])
@api_post(['ingredientId'])
@stepExists
def unset_ingredient(stepId: str):
    return flask.jsonify({'msg': 'Success'}), 200
