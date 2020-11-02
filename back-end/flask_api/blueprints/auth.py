import flask
from flask_jwt_extended import create_access_token
from werkzeug.security import check_password_hash

from flask_api.utils.decorators import api_post
from models.user import User

auth_api_blueprint = flask.Blueprint('auth', __name__)


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
    if user.save(force_insert=True) and len(user.errors) == 0:
        return flask.jsonify({'msg': []}), 200
    else:
        return flask.jsonify({'msg': user.errors}), 400


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
        return flask.jsonify({'access_token': access_token}), 400

    else:
        msgs = []
        if user is None: msgs.append("Email does not exists in database")
        elif successful_login is False: msgs.append("Wrong password has been provided")
        return flask.jsonify({'msg': msgs}), 400
