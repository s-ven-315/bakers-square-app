from flask_jwt_extended import jwt_required
from flask_api.blueprints.utils.decorators import api_post

from ..api_user import users_api_blueprint


@users_api_blueprint.route('/like', methods=['POST'])
@jwt_required
@api_post(['recipeId'])
def set_like():
    pass


@users_api_blueprint.route('/unlike', methods=['POST'])
@jwt_required
@api_post(['recipeId'])
def unset_like():
    pass
