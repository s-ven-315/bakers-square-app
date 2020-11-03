import flask
from flask_jwt_extended import jwt_required
from flask_api.blueprints.utils.decorators import api_post

equipments_api_blueprint = flask.Blueprint('equipments_api', __name__)


@equipments_api_blueprint.route('/', methods=['GET'])
@jwt_required
def get_equipments():
    pass


@equipments_api_blueprint.route('/<equipmentId>', methods=['GET'])
@jwt_required
def get_equipment(equipmentId: str):
    return flask.jsonify({}), 200


@equipments_api_blueprint.route('/', methods=['POST'])
@jwt_required
@api_post()
def add_equipment():
    return flask.jsonify({}), 200


@equipments_api_blueprint.route('/<equipmentId>/edit', methods=['POST'])
@jwt_required
@api_post()
def edit_equipment(equipmentId: str):
    return flask.jsonify({}), 200


@equipments_api_blueprint.route('/<equipmentId>/delete', methods=['POST'])
@jwt_required
@api_post()
def delete_equipment(equipmentId: str):
    pass
