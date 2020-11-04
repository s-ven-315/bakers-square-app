from functools import wraps

import flask
from flask_jwt_extended import jwt_required
from flask_api.blueprints.utils.decorators import api_post
from models.model_comment import Comment
from models.model_recipe import Recipe
from models.model_user import User

comments_api_blueprint = flask.Blueprint('comments_api', __name__)


def commentExists(func):
    @wraps(func)
    def wrapper(commentId, *args, **kwargs):
        comment = Comment.get_or_none(Comment.id == commentId)
        if comment:
            return func(commentId, *args, **kwargs)
        else:
            return flask.jsonify({'msg': 'Comment does not exists'}), 400
    return wrapper


@comments_api_blueprint.route('/', methods=['GET'])
def get_comments():
    userId = flask.request.args.get('userId')
    if not userId: return flask.jsonify({'msg': 'Must provide userId'}), 400

    recipeId = flask.request.args.get('recipeId')
    if not recipeId: return flask.jsonify({'msg': 'Must provide recipeId'}), 400

    query = Comment.select().join(User)
    if userId: query = query.where(User.userId == userId)
    if recipeId: query = query.where(Comment.recipe == recipeId)

    comments = [c for c in query]
    comment_dicts = [c.as_dict() for c in comments]
    return flask.jsonify({'msg': 'Success', 'data': comment_dicts}), 200


@comments_api_blueprint.route('/<commentId>', methods=['GET'])
@commentExists
def get_comment(commentId: str):
    comment = Comment.get_by_id(commentId)
    return flask.jsonify({'msg': 'Success', 'data': comment.as_dict()}), 200


@comments_api_blueprint.route('/', methods=['POST'])
@api_post(['userId', 'recipeId', 'text'])
def add_comment():
    json_data = flask.request.json

    # userId
    userId = json_data.get('userId')
    user = User.get_or_none(User.userId == userId)
    if not user: return flask.jsonify({'msg': 'Must provide valid userId'}), 400

    # recipeId
    recipeId = json_data.get('recipeId')
    recipe = Recipe.get_or_none(Recipe.id == recipeId)
    if not recipe: return flask.jsonify({'msg': 'Must provide valid recipeId'}), 400

    # text
    text = json_data.get('text')
    if not text: return flask.jsonify({'msg': 'Must provide non-empty text'}), 400

    comment = Comment(user=user, recipe=recipe, text=text)
    if not comment.save(): return flask.jsonify({'msg': 'Error in saving data'}), 400
    return flask.jsonify({'msg': 'Success'}), 200


@comments_api_blueprint.route('/<commentId>/edit', methods=['POST'])
@api_post(['text'])
@commentExists
def edit_comment(commentId: str):
    json_data = flask.request.json
    comment = Comment.get_by_id(commentId)

    # text
    text = json_data.get('text')
    if not text: return flask.jsonify({'msg': 'Must provide non-empty text'}), 400

    comment.text = text
    if not comment.save(): return flask.jsonify({'msg': 'Error in saving data'}), 400
    return flask.jsonify({'msg': 'Success'}), 200


@comments_api_blueprint.route('/<commentId>/delete', methods=['POST'])
@api_post()
@commentExists
def delete_comment(commentId: str):
    comment = Comment.get_by_id(commentId)
    if not comment.delete_instance(): return flask.jsonify({'msg': 'Error in deleting data'}), 400
    return flask.jsonify({'msg': 'Success'}), 200
