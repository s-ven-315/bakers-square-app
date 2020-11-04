import flask
from flask_jwt_extended import jwt_required
from flask_api.blueprints.utils.decorators import api_post

from ..api_user import users_api_blueprint, userExists


@users_api_blueprint.route('/<userId>/subscribe', methods=['POST'])
@api_post(['userId'])
@userExists
def set_subscribe(userId: str):
    return flask.jsonify({'msg': 'Success'}), 200


@users_api_blueprint.route('/<userId>/unsubscribe', methods=['POST'])
@api_post(['userId'])
@userExists
def unset_subscribe(userId: str):
    return flask.jsonify({'msg': 'Success'}), 200
