from flask_jwt_extended import jwt_required
from flask_api.blueprints.utils.decorators import api_post

from ..api_step import steps_api_blueprint


@steps_api_blueprint.route('/setEquipment', methods=['POST'])
@jwt_required
@api_post(['equipmentId'])
def set_equipment():
    pass


@steps_api_blueprint.route('/unsetEquipment', methods=['POST'])
@jwt_required
@api_post(['equipmentId'])
def unset_equipment():
    pass
