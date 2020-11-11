import os
from functools import wraps

import flask
from flask_jwt_extended import jwt_required
from flask_api.blueprints.utils.decorators import api_post
from flask_api.blueprints.utils.decorators import api_post_file
from models.model_recipe import Recipe
from models.model_user import User
import services.storage as storage

recipes_api_blueprint = flask.Blueprint('recipes_api', __name__)


def recipeExists(func):
    @wraps(func)
    def wrapper(recipeId, *args, **kwargs):
        recipe = Recipe.get_or_none(Recipe.id == recipeId)
        if recipe:
            return func(recipeId, *args, **kwargs)
        else:
            return flask.jsonify({'msg': 'Recipe does not exists'}), 400
    return wrapper


@recipes_api_blueprint.route('/', methods=['GET'])
def get_recipes():
    userId = flask.request.args.get('userId')
    if not userId:
        return flask.jsonify({'msg': 'Must provide userId'}), 400

    query = Recipe.select().join(User)
    if userId:
        query = query.where(User.userId == userId)

    recipes = [c for c in query]
    recipe_dicts = [c.as_dict() for c in recipes]
    return flask.jsonify({'msg': 'Success', 'data': recipe_dicts}), 200


@recipes_api_blueprint.route('/<recipeId>', methods=['GET'])
@recipeExists
def get_recipe(recipeId: str):
    recipe = Recipe.get_by_id(recipeId)
    return flask.jsonify({'msg': 'Success', 'data': recipe.as_dict()}), 200


@recipes_api_blueprint.route('/', methods=['POST'])
@api_post(['userId', 'name'])
def add_recipe():
    json_data = flask.request.json

    # userId
    userId = json_data.get('userId')
    user = User.get_or_none(User.userId == userId)
    if not user:
        return flask.jsonify({'msg': 'Must provide valid userId'}), 400

    # name
    name = json_data.get('name')
    if not name:
        return flask.jsonify({'msg': 'Must provide non-empty name'}), 400

    recipe = Recipe(user=user, name=name)
    if not recipe.save():
        return flask.jsonify({'msg': 'Error in saving data'}), 400
    return flask.jsonify({'msg': 'Success'}), 200


@recipes_api_blueprint.route('/<recipeId>/edit', methods=['POST'])
@api_post()
@recipeExists
def edit_recipe(recipeId: str):
    json_data = flask.request.json
    recipe = Recipe.get_by_id(recipeId)

    # name
    name = json_data.get('name')
    if name:
        recipe.name = name

    if not recipe.save():
        return flask.jsonify({'msg': 'Error in saving data'}), 400
    return flask.jsonify({'msg': 'Success'}), 200


@recipes_api_blueprint.route('/<recipeId>/delete', methods=['POST'])
@api_post()
@recipeExists
def delete_recipe(recipeId: str):
    recipe = Recipe.get_by_id(recipeId)
    if not recipe.delete_instance():
        return flask.jsonify({'msg': 'Error in deleting data'}), 400
    return flask.jsonify({'msg': 'Success'}), 200


@recipes_api_blueprint.route('/<recipeId>/image', methods=['POST'])
@api_post_file()
@recipeExists
def edit_image(recipeId):
    print("received")
    if "image" not in flask.request.files:
        return flask.jsonify({'msg': 'No \'image\' key in request.files'}), 400

    file = flask.request.files['image']
    print(file)
    if file.filename == '':
        return flask.jsonify({'msg': 'No file is found in \'image\' in request.files'}), 400

    if file and storage.allowed_file(file.filename):
        print("here")
        file.filename = "recipe{}-profile{}".format(
            recipeId, os.path.splitext(file.filename)[1])
        upload_error = storage.upload_file_to_s3(file)
        if not upload_error:
            Recipe.update(imgName=file.filename).where(
                Recipe.id == recipeId).execute()

    return flask.jsonify({'msg': 'Success'}), 200
