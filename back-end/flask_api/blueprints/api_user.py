from functools import wraps

import flask
from flask_jwt_extended import jwt_required
from flask_api.blueprints.utils.decorators import api_post
from models.model_user import User

users_api_blueprint = flask.Blueprint('users_api', __name__)


def userExists(func):
    @wraps(func)
    def wrapper(userId, *args, **kwargs):
        user = User.get_or_none(User.userId == userId)
        if user:
            return func(userId, *args, **kwargs)
        else:
            return flask.jsonify({'msg': 'User does not exists'}), 400
    return wrapper


@users_api_blueprint.route('/', methods=['GET'])
def get_users():
    query = User.select()

    users = [c for c in query]
    user_dicts = [c.as_dict() for c in users]
    return flask.jsonify({'msg': 'Success', 'data': user_dicts}), 200


@users_api_blueprint.route('/<userId>', methods=['GET'])
@userExists
def get_user(userId: str):
    user = User.get_or_none(User.userId == userId)

    required_data = {
        'recipes': [],
        'likedRecipes': [],
        'followers': [],
        'following': [],
    }

    return flask.jsonify({'msg': 'Success', 'data': user.as_dict()}), 200


@users_api_blueprint.route('/<userId>/edit', methods=['POST'])
@api_post()
@userExists
def edit_user(userId: str):
    json_data = flask.request.json
    user = User.get(User.userId == userId)

    # name
    name = json_data.get('name')
    if name:
        user.name = name

    # email
    email = json_data.get('email')
    if email:
        user.email = email

    if not user.save(): return flask.jsonify({'msg': 'Error in saving data'}), 400
    return flask.jsonify({'msg': 'Success'}), 200
