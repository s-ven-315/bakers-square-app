import flask
from flask_jwt_extended import jwt_required

from models.model_users import User

users_api_blueprint = flask.Blueprint('users_api', __name__)


@users_api_blueprint.route('/', methods=['GET'])
@jwt_required
def get_users():
    users = [user.as_dict() for user in User.select().order_by(User.userId)]
    return flask.jsonify(users), 200


@users_api_blueprint.route('/<userId>', methods=['GET'])
@jwt_required
def get_user(userId: str):
    user = User.get_or_none(User.userId == userId)
    if user:
        return flask.jsonify(user.as_dict()), 200
    else:
        return flask.jsonify({'msg': 'User does not exists'}), 400

