import flask
from flask_jwt_extended import jwt_required
from flask_api.blueprints.utils.decorators import api_post

ingredients_api_blueprint = flask.Blueprint('ingredients_api', __name__)


@ingredients_api_blueprint.route('/', methods=['GET'])
@jwt_required
def get_ingredients():
    return flask.jsonify({}), 200


@ingredients_api_blueprint.route('/<ingredientId>', methods=['GET'])
@jwt_required
def get_ingredient(ingredientId: str):
    return flask.jsonify({}), 200


@ingredients_api_blueprint.route('/', methods=['POST'])
@jwt_required
@api_post()
def add_ingredient():
    return flask.jsonify({}), 200


@ingredients_api_blueprint.route('/<ingredientId>/edit', methods=['POST'])
@jwt_required
@api_post()
def edit_ingredient(ingredientId: str):
    return flask.jsonify({}), 200


@ingredients_api_blueprint.route('/<ingredientId>/delete', methods=['POST'])
@jwt_required
@api_post()
def delete_ingredient(ingredientId: str):
    pass
