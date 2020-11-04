from functools import wraps

import flask
from flask_jwt_extended import jwt_required
from flask_api.blueprints.utils.decorators import api_post
from models.model_ingredient import Ingredient

ingredients_api_blueprint = flask.Blueprint('ingredients_api', __name__)


def ingredientExists(func):
    @wraps(func)
    def wrapper(ingredientId, *args, **kwargs):
        ingredient = Ingredient.get_or_none(Ingredient.id == ingredientId)
        if ingredient:
            return func(ingredientId, *args, **kwargs)
        else:
            return flask.jsonify({'msg': 'Ingredient does not exists'}), 400
    return wrapper


@ingredients_api_blueprint.route('/', methods=['GET'])
def get_ingredients():
    query = Ingredient.select()

    ingredients = [c for c in query]
    ingredient_dicts = [c.as_dict() for c in ingredients]
    return flask.jsonify({'msg': 'Success', 'data': ingredient_dicts}), 200


@ingredients_api_blueprint.route('/<ingredientId>', methods=['GET'])
@ingredientExists
def get_ingredient(ingredientId: str):
    ingredient = Ingredient.get_by_id(ingredientId)
    return flask.jsonify({'msg': 'Success', 'data': ingredient.as_dict()}), 200


@ingredients_api_blueprint.route('/', methods=['POST'])
@api_post(['name'])
def add_ingredient():
    json_data = flask.request.json

    # name
    name = json_data.get('name')
    if not name: return flask.jsonify({'msg': 'Must provide non-empty name'}), 400

    ingredient = Ingredient(name=name)
    if not ingredient.save(): return flask.jsonify({'msg': 'Error in saving data'}), 400
    return flask.jsonify({'msg': 'Success'}), 200


@ingredients_api_blueprint.route('/<ingredientId>/edit', methods=['POST'])
@api_post()
@ingredientExists
def edit_ingredient(ingredientId: str):
    json_data = flask.request.json
    ingredient = Ingredient.get_by_id(ingredientId)

    # name
    name = json_data.get('name')
    if name:
        ingredient.name = name

    if not ingredient.save(): return flask.jsonify({'msg': 'Error in saving data'}), 400
    return flask.jsonify({'msg': 'Success'}), 200


@ingredients_api_blueprint.route('/<ingredientId>/delete', methods=['POST'])
@api_post()
@ingredientExists
def delete_ingredient(ingredientId: str):
    ingredient = Ingredient.get_by_id(ingredientId)
    if not ingredient.delete_instance(): return flask.jsonify({'msg': 'Error in deleting data'}), 400
    return flask.jsonify({'msg': 'Success'}), 200
