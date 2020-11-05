import flask
from flask_jwt_extended import jwt_required
from flask_api.blueprints.utils.decorators import api_post
from models.model_recipe import Recipe
from models.model_user import User
from models.relation_like import LikeRelation as Like

from ..api_user import users_api_blueprint, userExists


def parse_data(userId):
    json_data = flask.request.json

    user = User.get_or_none(User.userId == userId)

    recipeId = json_data.get('recipeId')
    recipe = Recipe.get_or_none(Recipe.id == recipeId)

    msg = "Success"
    code = 200

    if not recipe:
        msg = 'RecipeId \'%s\' does not exists' % recipeId
        code = 400

    return (user, recipe), msg, code


@users_api_blueprint.route('/<userId>/like', methods=['POST'])
@api_post(['recipeId'])
@userExists
def set_like(userId: str):
    (user, recipe), msg, code = parse_data(userId)
    if code == 400:
        return flask.jsonify({'msg': msg}), 400

    if not user.like(recipe):
        return flask.jsonify({'msg': 'Error in saving data'}), 400
    return flask.jsonify({'msg': 'Success'}), 200


@users_api_blueprint.route('/<userId>/unlike', methods=['POST'])
@api_post(['recipeId'])
@userExists
def unset_like(userId: str):
    (user, recipe), msg, code = parse_data(userId)
    if code == 400:
        return flask.jsonify({'msg': msg}), 400

    if not user.unlike(recipe):
        return flask.jsonify({'msg': 'Error in deleting data'}), 400
    return flask.jsonify({'msg': 'Success'}), 200
