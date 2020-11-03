import flask
from flask_jwt_extended import jwt_required
from flask_api.blueprints.utils.decorators import api_post

tags_api_blueprint = flask.Blueprint('tags_api', __name__)


@tags_api_blueprint.route('/', methods=['GET'])
@jwt_required
def get_tags():
    return flask.jsonify({}), 200


@tags_api_blueprint.route('/<tagId>', methods=['GET'])
@jwt_required
def get_tag(tagId: str):
    return flask.jsonify({}), 200


@tags_api_blueprint.route('/', methods=['POST'])
@jwt_required
@api_post()
def add_tags():
    return flask.jsonify({}), 200


@tags_api_blueprint.route('/<tagId>/edit', methods=['POST'])
@jwt_required
@api_post()
def edit_tags(tagId: str):
    return flask.jsonify({}), 200


@tags_api_blueprint.route('/<tagId>/delete', methods=['POST'])
@jwt_required
@api_post()
def delete_tags(tagId: str):
    return flask.jsonify({}), 200
