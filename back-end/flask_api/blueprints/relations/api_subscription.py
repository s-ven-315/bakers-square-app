import flask
from flask_jwt_extended import jwt_required
from flask_api.blueprints.utils.decorators import api_post
from models.model_user import User
from models.relation_subscription import SubscriptionRelation as Subs

from ..api_user import users_api_blueprint, userExists


def parse_data(fromUserId):
    # userId
    from_user = User.get_or_none(User.userId == fromUserId)

    # to_userId
    json_data = flask.request.json
    toUserId = json_data.get('userId')
    to_user = User.get_or_none(User.userId == toUserId)

    return from_user, to_user


@users_api_blueprint.route('/<userId>/subscribe', methods=['POST'])
@api_post(['userId'])
@userExists
def set_subscription(userId: str):
    from_user, to_user = parse_data(userId)
    if not to_user:
        return flask.jsonify({'msg': 'Must provide valid userId (to_user)'}), 400
    if not from_user.subscribe(to_user):
        return flask.jsonify({'msg': 'Error in saving data'}), 400
    return flask.jsonify({'msg': 'Success'}), 200


@users_api_blueprint.route('/<userId>/unsubscribe', methods=['POST'])
@api_post(['userId'])
@userExists
def unset_subscription(userId: str):
    from_user, to_user = parse_data(userId)
    if not to_user:
        return flask.jsonify({'msg': 'Must provide valid userId (to_user)'}), 400
    if not from_user.unsubscribe(to_user):
        return flask.jsonify({'msg': 'Error in deleting data'}), 400
    return flask.jsonify({'msg': 'Success'}), 200
