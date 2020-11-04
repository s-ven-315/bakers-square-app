from functools import wraps

import flask
from flask_jwt_extended import jwt_required
from flask_api.blueprints.utils.decorators import api_post
from models.model_equipment import Equipment

equipments_api_blueprint = flask.Blueprint('equipments_api', __name__)


def equipmentExists(func):
    @wraps(func)
    def wrapper(equipmentId, *args, **kwargs):
        equipment = Equipment.get_or_none(Equipment.id == equipmentId)
        if equipment:
            return func(equipmentId, *args, **kwargs)
        else:
            return flask.jsonify({'msg': 'Equipment does not exists'}), 400
    return wrapper


@equipments_api_blueprint.route('/', methods=['GET'])
def get_equipments():
    query = Equipment.select()

    equipments = [c for c in query]
    equipment_dicts = [c.as_dict() for c in equipments]
    return flask.jsonify({'msg': 'Success', 'data': equipment_dicts}), 200


@equipments_api_blueprint.route('/<equipmentId>', methods=['GET'])
@equipmentExists
def get_equipment(equipmentId: str):
    equipment = Equipment.get_by_id(equipmentId)
    return flask.jsonify({'msg': 'Success', 'data': equipment.as_dict()}), 200


@equipments_api_blueprint.route('/', methods=['POST'])
@api_post(['name'])
def add_equipment():
    json_data = flask.request.json

    # name
    name = json_data.get('name')
    if not name: return flask.jsonify({'msg': 'Must provide non-empty name'}), 400

    equipment = Equipment(name=name)
    if not equipment.save(): return flask.jsonify({'msg': 'Error in saving data'}), 400
    return flask.jsonify({'msg': 'Success'}), 200


@equipments_api_blueprint.route('/<equipmentId>/edit', methods=['POST'])
@api_post()
@equipmentExists
def edit_equipment(equipmentId: str):
    json_data = flask.request.json
    equipment = Equipment.get_by_id(equipmentId)

    # name
    name = json_data.get('name')
    if name:
        equipment.name = name

    if not equipment.save(): return flask.jsonify({'msg': 'Error in saving data'}), 400
    return flask.jsonify({'msg': 'Success'}), 200


@equipments_api_blueprint.route('/<equipmentId>/delete', methods=['POST'])
@api_post()
@equipmentExists
def delete_equipment(equipmentId: str):
    equipment = Equipment.get_by_id(equipmentId)
    if not equipment.delete_instance(): return flask.jsonify({'msg': 'Error in deleting data'}), 400
    return flask.jsonify({'msg': 'Success'}), 200
