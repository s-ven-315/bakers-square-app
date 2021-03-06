import flask
from flask_jwt_extended import jwt_required
from flask_api.blueprints.utils.decorators import api_post
from models.model_tag import Tag
from models.model_recipe import Recipe
from models.relation_recipe_tag import RecipeTagRelation as Relation

from ..api_recipe import recipes_api_blueprint, recipeExists
from ..utils.helpers import Helper


@recipes_api_blueprint.route('/<recipeId>/tags', methods=['POST'])
@api_post(['tagIds'])
@recipeExists
def set_tag(recipeId: str):
    # recipe
    recipe = Recipe.get_by_id(recipeId)

    # tagIds
    json_data = flask.request.json
    tagIds = json_data.get('tagIds')
    msg, code = Helper.assert_id_list(tagIds, Tag, 'tagId')
    if code == 400:
        return flask.jsonify({'msg': msg}), code

    # Action
    if not recipe.set_tags(tagIds):
        return flask.jsonify({'msg': 'Error in setting tags'}), 200
    return flask.jsonify({'msg': 'Success'}), 200
