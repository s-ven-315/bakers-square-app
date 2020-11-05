import flask
from flask_jwt_extended import jwt_required
from flask_api.blueprints.utils.decorators import api_post
from models.model_ingredient import Ingredient
from models.model_step import Step
from models.relation_step_ingredient import StepIngredientRelation as Relation

from ..api_step import steps_api_blueprint, stepExists
from ..utils.helpers import Helper


@steps_api_blueprint.route('/<stepId>/ingredients', methods=['POST'])
@api_post(['ingredientList'])
@stepExists
def set_ingredient(stepId: str):
    # step
    step = Step.get_by_id(stepId)

    # ingredientList
    json_data = flask.request.json
    ingredientList = json_data.get('ingredientList')
    msg, code = Helper.assert_id_list(ingredientList, Ingredient, 'ingredientList')
    if code == 400:
        return flask.jsonify({'msg': msg}), code

    # Action
    if not step.set_ingredients(ingredientList):
        return flask.jsonify({'msg': 'Error in setting ingredients'}), 200
    return flask.jsonify({'msg': 'Success'}), 200
