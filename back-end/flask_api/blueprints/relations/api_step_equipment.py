import flask
from flask_jwt_extended import jwt_required
from flask_api.blueprints.utils.decorators import api_post
from models.model_equipment import Equipment
from models.model_step import Step
from models.relation_step_equipment import StepEquipmentRelation as Relation

from ..api_step import steps_api_blueprint, stepExists
from ..utils.helpers import Helper


@steps_api_blueprint.route('/<stepId>/equipment', methods=['POST'])
@api_post(['equipmentIds'])
@stepExists
def set_equipment(stepId: str):
    # step
    step = Step.get_by_id(stepId)

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
        existingRelation = Relation.get_or_none(Relation.step == step, Relation.equipment == equipmentId)
        if not existingRelation:
            toAdd.append(dict(step=step, equipment=equipment))

    # Adding & Delete
    if len(toAdd) > 0:
        Relation.insert_many(toAdd).execute()
    toDel = Relation.delete().where(Relation.step == step, Relation.equipment.not_in(equipmentIds))
    toDel.execute()
    return flask.jsonify({'msg': 'Success'}), 200
