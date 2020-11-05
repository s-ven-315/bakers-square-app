import flask
from flask_jwt_extended import jwt_required
from flask_api.blueprints.utils.decorators import api_post
from models.model_equipment import Equipment
from models.model_recipe import Recipe
from models.relation_recipe_equipment import RecipeEquipmentRelation as Relation

from ..api_recipe import recipes_api_blueprint, recipeExists
from ..utils.helpers import Helper


@recipes_api_blueprint.route('/<recipeId>/equipment', methods=['POST'])
@api_post(['equipmentIds'])
@recipeExists
def set_equipment(recipeId: str):
    # recipe
    recipe = Recipe.get_by_id(recipeId)

    # equipmentIds
    json_data = flask.request.json
    equipmentIds = json_data.get('equipmentIds')
    msg, code = Helper.assert_id_list(equipmentIds, Equipment, 'equipmentId')
    if code == 400:
        return flask.jsonify({'msg': msg}), code

    # Find toAddRelation
    toAdd = []
    for equipmentId in equipmentIds:
        equipment = Equipment.get_by_id(equipmentId)
        existingRelation = Relation.get_or_none(Relation.recipe == recipe, Relation.equipment == equipmentId)
        if not existingRelation:
            toAdd.append(dict(recipe=recipe, equipment=equipment))

    # Adding & Delete
    if len(toAdd) > 0:
        Relation.insert_many(toAdd).execute()
    toDel = Relation.delete().where(Relation.recipe == recipe, Relation.equipment.not_in(equipmentIds))
    toDel.execute()
    return flask.jsonify({'msg': 'Success'}), 200
