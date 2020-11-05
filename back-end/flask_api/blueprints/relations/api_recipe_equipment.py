import flask
from flask_jwt_extended import jwt_required
from flask_api.blueprints.utils.decorators import api_post
from models.model_equipment import Equipment
from models.model_recipe import Recipe
from models.relation_recipe_equipment import RecipeEquipmentRelation as Relation

from ..api_recipe import recipes_api_blueprint, recipeExists


@recipes_api_blueprint.route('/<recipeId>/equipments', methods=['POST'])
@api_post(['equipmentIds'])
@recipeExists
def set_equipment(recipeId: str):
    # recipe
    recipe = Recipe.get_or_none(Recipe.recipeId == recipeId)

    # equipmentIds
    json_data = flask.request.json
    equipmentIds = json_data.get('equipmentIds')
    if type(equipmentIds) != list:
        return flask.jsonify({'msg': 'Data <equipments> must be a list / array.'}), 400
    for equipmentId in equipmentIds:
        if type(equipmentId) != str:
            return flask.jsonify({'msg': 'Not all data in <equipments> is a string'}), 400

    # Find toAddRelation
    toAddRelations = []
    for equipmentId in equipmentIds:
        equipment = Equipment.get_or_none(Equipment.id == equipmentId)

        if not equipment:
            return flask.jsonify({'msg': 'equipmentId \'%s\' does not exists' % equipmentId}), 400

        existingRelation = Relation.get_or_none(Relation.recipe == recipe, Relation.equipment == equipment)
        if not existingRelation:
            toAddRelations.append(Relation(recipe=recipe, equipment=equipment))

    # Find toDeleteRelation
    toDeleteRelations = []

    # Actual Adding
    for newRelation in toAddRelations:
        if not newRelation.save():
            return flask.jsonify({'msg': 'Error in saving data'}), 400

    for oldRelation in toDeleteRelations:
        if not oldRelation.delete_instance():
            return flask.jsonify({'msg': 'Error in deleting data'}), 400

    return flask.jsonify({'msg': 'Success'}), 200
