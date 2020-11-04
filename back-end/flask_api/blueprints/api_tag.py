from functools import wraps

import flask
from flask_jwt_extended import jwt_required
from flask_api.blueprints.utils.decorators import api_post
from models.model_tag import Tag

tags_api_blueprint = flask.Blueprint('tags_api', __name__)


def tagExists(func):
    @wraps(func)
    def wrapper(tagId, *args, **kwargs):
        tag = Tag.get_or_none(Tag.id == tagId)
        if tag:
            return func(tagId, *args, **kwargs)
        else:
            return flask.jsonify({'msg': 'Tag does not exists'}), 400
    return wrapper


@tags_api_blueprint.route('/', methods=['GET'])
def get_tags():
    query = Tag.select()

    tags = [c for c in query]
    tag_dicts = [c.as_dict() for c in tags]
    return flask.jsonify({'msg': 'Success', 'data': tag_dicts}), 200


@tags_api_blueprint.route('/<tagId>', methods=['GET'])
@tagExists
def get_tag(tagId: str):
    tag = Tag.get_by_id(tagId)
    return flask.jsonify({'msg': 'Success', 'data': tag.as_dict()}), 200


@tags_api_blueprint.route('/', methods=['POST'])
@api_post(['text'])
def add_tag():
    json_data = flask.request.json

    # text
    text = json_data.get('text')
    if not text: return flask.jsonify({'msg': 'Must provide non-empty text'}), 400

    tag = Tag(text=text)
    if not tag.save(): return flask.jsonify({'msg': 'Error in saving data'}), 400
    return flask.jsonify({'msg': 'Success'}), 200


@tags_api_blueprint.route('/<tagId>/edit', methods=['POST'])
@api_post()
@tagExists
def edit_tag(tagId: str):
    json_data = flask.request.json
    tag = Tag.get_by_id(tagId)

    # text
    text = json_data.get('text')
    if text:
        tag.text = text

    if not tag.save(): return flask.jsonify({'msg': 'Error in saving data'}), 400
    return flask.jsonify({'msg': 'Success'}), 200


@tags_api_blueprint.route('/<tagId>/delete', methods=['POST'])
@api_post()
@tagExists
def delete_tag(tagId: str):
    tag = Tag.get_by_id(tagId)
    if not tag.delete_instance(): return flask.jsonify({'msg': 'Error in deleting data'}), 400
    return flask.jsonify({'msg': 'Success'}), 200
