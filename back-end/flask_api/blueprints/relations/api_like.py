import flask
from flask_jwt_extended import jwt_required
from flask_api.blueprints.utils.decorators import api_post
from models.model_recipe import Recipe
from models.model_user import User
from models.relation_like import LikeRelation as Like

from ..api_user import users_api_blueprint, userExists


def parse_data(userId):
    json_data = flask.request.json

    # userId
    user = User.get_or_none(User.userId == userId)

    # recipeId
    recipeId = json_data.get('recipeId')
    recipe = Recipe.get_or_none(Recipe.id == recipeId)

    likeRelation = Like.get_or_none(Like.user == user, Like.recipe == recipe)
    return user, recipe, likeRelation


@users_api_blueprint.route('/<userId>/like', methods=['POST'])
@api_post(['recipeId'])
@userExists
def set_like(userId: str):
    user, recipe, likeRelation = parse_data(userId)
    if not user:
        return flask.jsonify({'msg': 'Must provide valid userId'}), 400
    if not recipe:
        return flask.jsonify({'msg': 'Must provide valid recipeId'}), 400
    if not likeRelation:
        likeRelation = Like(user=user, recipe=recipe)
        if not likeRelation.save():
            return flask.jsonify({'msg': 'Error in saving data'}), 400
    return flask.jsonify({'msg': 'Success'}), 200


@users_api_blueprint.route('/<userId>/unlike', methods=['POST'])
@api_post(['recipeId'])
@userExists
def unset_like(userId: str):
    user, recipe, likeRelation = parse_data(userId)
    if not user:
        return flask.jsonify({'msg': 'Must provide valid userId'}), 400
    if not recipe:
        return flask.jsonify({'msg': 'Must provide valid recipeId'}), 400
    if likeRelation:
        if not likeRelation.delete_instance():
            return flask.jsonify({'msg': 'Error in deleting data'}), 400
    return flask.jsonify({'msg': 'Success'}), 200
