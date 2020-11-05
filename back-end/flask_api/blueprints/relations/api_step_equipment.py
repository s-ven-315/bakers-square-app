import flask
from flask_jwt_extended import jwt_required
from flask_api.blueprints.utils.decorators import api_post
from models.model_equipment import Equipment
from models.model_step import Step
from models.relation_step_equipment import StepEquipmentRelation as Relation

from ..api_step import steps_api_blueprint, stepExists
from ..utils.helpers import Helper


@steps_api_blueprint.route('/<stepId>/equipment', methods=['POST'])
@api_post(['equipmentList'])
@stepExists
def set_equipment(stepId: str):
    # step
    step = Step.get_by_id(stepId)

    # equipmentList
    json_data = flask.request.json
    equipmentList = json_data.get('equipmentList')
    msg, code = Helper.assert_id_list_with_qty(equipmentList, Equipment, 'equipmentList')
    if code == 400:
        return flask.jsonify({'msg': msg}), code

    # Action
    if not step.set_equipment(equipmentList):
        return flask.jsonify({'msg': 'Error in setting equipment'}), 200
    return flask.jsonify({'msg': 'Success'}), 200
