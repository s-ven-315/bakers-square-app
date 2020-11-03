import flask
from flask_jwt_extended import jwt_required

from flask_api.utils.decorators import api_func
from models.user import User

users_api_blueprint = flask.Blueprint('users_api', __name__)


@users_api_blueprint.route('/<userId>', methods=['GET'])
@jwt_required
@api_func()
def get(userId: str):
    return flask.jsonify({}), 200
