import flask
from flask_jwt_extended import jwt_required
from flask_api.blueprints.utils.decorators import api_post
from models.model_step import Step
from models.model_recipe import Recipe

from ..api_recipe import recipes_api_blueprint, recipeExists
from ..utils.helpers import Helper


@recipes_api_blueprint.route('/<recipeId>/steps', methods=['POST'])
@api_post(['steps'])
@recipeExists
def set_step(recipeId: str):
    # recipe
    recipe = Recipe.get_by_id(recipeId)

    # stepIds
    json_data = flask.request.json
    steps = json_data.get('steps')

    # Action
    if not recipe.set_steps(steps):
        return flask.jsonify({'msg': 'Error in setting steps'}), 200
    return flask.jsonify({'msg': 'Success'}), 200
