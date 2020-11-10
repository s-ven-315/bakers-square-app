import os
from functools import wraps

import flask
from flask_api.blueprints.utils.decorators import api_post
from models.model_user import User
import services.storage as storage

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
    return flask.jsonify({'msg': 'Success', 'data': user.as_dict()}), 200


@users_api_blueprint.route('/<userId>/edit', methods=['POST'])
@api_post()
@userExists
def edit_user(userId: str):
    json_data = flask.request.json
    user = User.get(User.userId == userId)
    isEdited = False

    # name
    name = json_data.get('name')
    if name:
        if user.name != name:
            isEdited = True
            user.name = name

    # email
    email = json_data.get('email')
    if email:
        if user.email != email:
            isEdited = True
            user.email = email

    if isEdited:
        if not user.save():
            return flask.jsonify({'msg': 'Error in saving data'}), 400
    return flask.jsonify({'msg': 'Success'}), 200


@users_api_blueprint.route('/<userId>/image', methods=['POST'])
@api_post()
@userExists
def edit_image(userId):
    if "img_url" not in flask.request.files:
        return flask.jsonify({'msg': 'No \'img_url\' key in request.files'}), 400

    file = flask.request.files['user_file']
    if file.filename == '':
        return flask.jsonify({'msg': 'No file is found in \'img_url\' in request.files'}), 400

    if file and storage.allowed_file(file.filename):
        file.filename = "user{}-profile{}".format(userId, os.path.splitext(file.filename)[1])
        upload_error = storage.upload_file_to_s3(file)
        if not upload_error:
            User.update(img_url=file.filename).where(User.id == userId).execute()

    return flask.jsonify({'msg': 'Success'}), 200
