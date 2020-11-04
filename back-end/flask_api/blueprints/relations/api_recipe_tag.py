from flask_jwt_extended import jwt_required
from flask_api.blueprints.utils.decorators import api_post

from ..api_recipe import recipes_api_blueprint


@recipes_api_blueprint.route('/setTag', methods=['POST'])
@jwt_required
@api_post(['tagId'])
def set_tag():
    pass


@recipes_api_blueprint.route('/unsetTag', methods=['POST'])
@jwt_required
@api_post(['tagId'])
def unset_tag():
    pass
