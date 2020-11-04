import flask
from flask_jwt_extended import jwt_required
from flask_api.blueprints.utils.decorators import api_post

from ..api_step import steps_api_blueprint, stepExists


@steps_api_blueprint.route('/<stepId>/setEquipment', methods=['POST'])
@api_post(['equipmentId'])
@stepExists
def set_equipment(stepId: str):
    return flask.jsonify({'msg': 'Success'}), 200


@steps_api_blueprint.route('/<stepId>/unsetEquipment', methods=['POST'])
@api_post(['equipmentId'])
@stepExists
def unset_equipment(stepId: str):
    return flask.jsonify({'msg': 'Success'}), 200
