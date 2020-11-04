import flask
from flask_jwt_extended import create_access_token
from werkzeug.security import check_password_hash

from flask_api.blueprints.utils.decorators import api_post
from models.model_user import User

auth_api_blueprint = flask.Blueprint('auth_api', __name__)


@auth_api_blueprint.route('/signup', methods=['POST'])
@api_post(['name', 'email', 'password'])
def signup():
    data = flask.request.json
    if not data['name']:
        return flask.jsonify({"msg": "Missing name"}), 400
    if not data['email']:
        return flask.jsonify({"msg": "Missing email"}), 400
    if not data['password']:
        return flask.jsonify({"msg": "Missing password"}), 400

    user = User(name=data['name'], email=data['email'], pw=data['password'])
    if user.save() and len(user.errors) == 0:
        access_token = create_access_token(identity=user.email)
        user_dict = user.as_dict()
        user_dict['access_token'] = access_token
        return flask.jsonify(user_dict), 200
    else:
        return flask.jsonify({'msg': user.errors[0]}), 400


@auth_api_blueprint.route('/login', methods=['POST'])
@api_post(['email', 'password'])
def login():
    data = flask.request.json

    if not data['email']:
        return flask.jsonify({"msg": "Missing email"}), 400
    if not data['password']:
        return flask.jsonify({"msg": "Missing password"}), 400

    user = User.get_or_none(User.email == data['email'])
    successful_login = check_password_hash(user.pw_hash, data['password']) if user else False

    if successful_login:
        access_token = create_access_token(identity=user.email)
        user_dict = user.as_dict()
        user_dict['access_token'] = access_token
        return flask.jsonify(user_dict), 200

    else:
        if user is None: msg = "Email does not exists in database"
        elif successful_login is False: msg = "Wrong password is provided"
        else: msg = ''
        return flask.jsonify({'msg': msg}), 400


@auth_api_blueprint.route('/userExists', methods=['GET'])
def userExists():
    userId = flask.request.args.get('userId')
    user = User.get_or_none(User.userId == userId)
    return flask.jsonify(user is not None), 200
