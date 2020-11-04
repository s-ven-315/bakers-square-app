import flask
from flask_jwt_extended import jwt_required
from flask_api.blueprints.utils.decorators import api_post
from models.model_step import Step

steps_api_blueprint = flask.Blueprint('steps_api', __name__)


@steps_api_blueprint.route('/', methods=['GET'])
@jwt_required
def get_steps():
    recipeId = flask.request.args.get('recipeId')
    return flask.jsonify({}), 200


@steps_api_blueprint.route('/<stepId>', methods=['GET'])
@jwt_required
def get_step(stepId: str):
    step = Step.get_or_none(Step.id == stepId)

    if step:
        return flask.jsonify(step.as_dict()), 200
    else:
        return flask.jsonify({'msg': 'Step does not exists'}), 400


@steps_api_blueprint.route('/', methods=['POST'])
@jwt_required
@api_post()
def add_steps():
    recipeId = flask.request.args.get('recipeId')
    return flask.jsonify({}), 200


@steps_api_blueprint.route('/<stepId>/edit', methods=['POST'])
@jwt_required
@api_post()
def edit_steps(stepId: str):
    return flask.jsonify({}), 200


@steps_api_blueprint.route('/<stepId>/delete', methods=['POST'])
@jwt_required
@api_post()
def delete_steps(stepId: str):
    return flask.jsonify({}), 200
