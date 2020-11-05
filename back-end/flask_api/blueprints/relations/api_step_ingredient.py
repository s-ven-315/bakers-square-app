import flask
from flask_jwt_extended import jwt_required
from flask_api.blueprints.utils.decorators import api_post
from models.model_ingredient import Ingredient
from models.model_step import Step
from models.relation_step_ingredient import StepIngredientRelation as Relation

from ..api_step import steps_api_blueprint, stepExists
from ..utils.helpers import Helper


@steps_api_blueprint.route('/<stepId>/ingredients', methods=['POST'])
@api_post(['ingredientIds'])
@stepExists
def set_ingredient(stepId: str):
    # step
    step = Step.get_by_id(stepId)

    # ingredientIds
    json_data = flask.request.json
    ingredientIds = json_data.get('ingredientIds')
    msg, code = Helper.assert_id_list(ingredientIds, Ingredient, 'ingredientId')
    if code == 400:
        return flask.jsonify({'msg': msg}), code

    # Find toAddRelation
    toAdd = []
    for ingredientId in ingredientIds:
        ingredient = Ingredient.get_by_id(ingredientId)
        existingRelation = Relation.get_or_none(Relation.step == step, Relation.ingredient == ingredientId)
        if not existingRelation:
            toAdd.append(dict(step=step, ingredient=ingredient))

    # Adding & Delete
    if len(toAdd) > 0:
        Relation.insert_many(toAdd).execute()
    toDel = Relation.delete().where(Relation.step == step, Relation.ingredient.not_in(ingredientIds))
    toDel.execute()
    return flask.jsonify({'msg': 'Success'}), 200
