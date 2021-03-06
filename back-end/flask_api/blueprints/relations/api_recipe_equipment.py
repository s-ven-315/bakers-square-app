import flask
from flask_jwt_extended import jwt_required
from flask_api.blueprints.utils.decorators import api_post
from models.model_equipment import Equipment
from models.model_recipe import Recipe
from models.relation_recipe_equipment import RecipeEquipmentRelation as Relation

from ..api_recipe import recipes_api_blueprint, recipeExists
from ..utils.helpers import Helper


@recipes_api_blueprint.route('/<recipeId>/equipment', methods=['POST'])
@api_post(['equipmentList'])
@recipeExists
def set_equipment(recipeId: str):
    # recipe
    recipe = Recipe.get_by_id(recipeId)

    # equipmentIds
    json_data = flask.request.json
    equipmentList = json_data.get('equipmentList')
    msg, code = Helper.assert_id_list_with_qty(equipmentList, Equipment, 'equipmentList')
    if code == 400:
        return flask.jsonify({'msg': msg}), code

    # Action
    if not recipe.set_equipment(equipmentList):
        return flask.jsonify({'msg': 'Error in setting equipment'}), 200
    return flask.jsonify({'msg': 'Success'}), 200


