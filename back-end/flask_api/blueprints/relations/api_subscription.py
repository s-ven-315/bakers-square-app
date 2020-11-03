from flask_jwt_extended import jwt_required
from flask_api.blueprints.utils.decorators import api_post

from ..api_user import users_api_blueprint


@users_api_blueprint.route('/subscribe', methods=['POST'])
@jwt_required
@api_post(['userId'])
def set_like():
    pass


@users_api_blueprint.route('/unsubscribe', methods=['POST'])
@jwt_required
@api_post(['userId'])
def unset_like():
    pass
