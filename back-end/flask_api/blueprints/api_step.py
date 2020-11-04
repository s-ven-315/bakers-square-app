from functools import wraps

import flask
from flask_jwt_extended import jwt_required
from flask_api.blueprints.utils.decorators import api_post
from models.model_step import Step
from models.model_recipe import Recipe

steps_api_blueprint = flask.Blueprint('steps_api', __name__)


def stepExists(func):
    @wraps(func)
    def wrapper(stepId, *args, **kwargs):
        step = Step.get_or_none(Step.id == stepId)
        if step:
            return func(stepId, *args, **kwargs)
        else:
            return flask.jsonify({'msg': 'Step does not exists'}), 400
    return wrapper


@steps_api_blueprint.route('/', methods=['GET'])
def get_steps():
    recipeId = flask.request.args.get('recipeId')
    if not recipeId: return flask.jsonify({'msg': 'Must provide recipeId'}), 400

    query = Step.select().join(Recipe)
    if recipeId: query = query.where(Step.recipe == recipeId)

    steps = [c for c in query]
    step_dicts = [c.as_dict() for c in steps]
    return flask.jsonify({'msg': 'Success', 'data': step_dicts}), 200


@steps_api_blueprint.route('/<stepId>', methods=['GET'])
@stepExists
def get_step(stepId: str):
    step = Step.get_by_id(stepId)
    return flask.jsonify({'msg': 'Success', 'data': step.as_dict()}), 200


@steps_api_blueprint.route('/', methods=['POST'])
@api_post(['recipeId', 'no', 'text'])
def add_step():
    json_data = flask.request.json

    # recipeId
    recipeId = json_data.get('recipeId')
    recipe = Recipe.get_or_none(Recipe.id == recipeId)
    if not recipe: return flask.jsonify({'msg': 'Must provide valid recipeId'}), 400

    # text
    text = json_data.get('text')
    if not text: return flask.jsonify({'msg': 'Must provide non-empty text'}), 400

    # no
    no = json_data.get('no')
    if not no: return flask.jsonify({'msg': 'Must provide non-empty no'}), 400

    step = Step(recipe=recipe, no=no, text=text)
    if not step.save(): return flask.jsonify({'msg': 'Error in saving data'}), 400
    return flask.jsonify({'msg': 'Success'}), 200


@steps_api_blueprint.route('/<stepId>/edit', methods=['POST'])
@api_post()
@stepExists
def edit_step(stepId: str):
    json_data = flask.request.json
    step = Step.get_by_id(stepId)

    # text
    text = json_data.get('text')
    if text:
        step.text = text

    # text
    no = json_data.get('no')
    if no:
        step.no = no

    if not step.save(): return flask.jsonify({'msg': 'Error in saving data'}), 400
    return flask.jsonify({'msg': 'Success'}), 200


@steps_api_blueprint.route('/<stepId>/delete', methods=['POST'])
@api_post()
@stepExists
def delete_step(stepId: str):
    step = Step.get_by_id(stepId)
    if not step.delete_instance(): return flask.jsonify({'msg': 'Error in deleting data'}), 400
    return flask.jsonify({'msg': 'Success'}), 200
