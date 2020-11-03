import flask
from flask_jwt_extended import jwt_required
from flask_api.blueprints.utils.decorators import api_post

comments_api_blueprint = flask.Blueprint('comments_api', __name__)


@comments_api_blueprint.route('/', methods=['GET'])
@jwt_required
def get_comments():
    userId = flask.request.args.get('userId')
    recipeId = flask.request.args.get('recipeId')
    return flask.jsonify({}), 200


@comments_api_blueprint.route('/<commentId>', methods=['GET'])
@jwt_required
def get_comment(commentId: str):
    return flask.jsonify({}), 200


@comments_api_blueprint.route('/', methods=['POST'])
@jwt_required
@api_post()
def add_comment():
    userId = flask.request.args.get('userId')
    recipeId = flask.request.args.get('recipeId')
    return flask.jsonify({}), 200


@comments_api_blueprint.route('/<commentId>/edit', methods=['POST'])
@jwt_required
@api_post()
def edit_comment(commentId: str):
    return flask.jsonify({}), 200


@comments_api_blueprint.route('/<commentId>/delete', methods=['POST'])
@jwt_required
@api_post()
def delete_comment(commentId: str):
    return flask.jsonify({}), 200
