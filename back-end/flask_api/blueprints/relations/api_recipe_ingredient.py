import flask
from flask_jwt_extended import jwt_required
from flask_api.blueprints.utils.decorators import api_post
from models.model_ingredient import Ingredient
from models.model_recipe import Recipe
from models.relation_recipe_ingredient import RecipeIngredientRelation as Relation

from ..api_recipe import recipes_api_blueprint, recipeExists
from ..utils.helpers import Helper


@recipes_api_blueprint.route('/<recipeId>/ingredients', methods=['POST'])
@api_post(['ingredientList'])
@recipeExists
def set_ingredient(recipeId: str):
    # recipe
    recipe = Recipe.get_by_id(recipeId)

    # ingredientIds
    json_data = flask.request.json
    ingredientList = json_data.get('ingredientList')
    msg, code = Helper.assert_id_list_with_qty(ingredientList, Ingredient, 'ingredientList')
    if code == 400:
        return flask.jsonify({'msg': msg}), code

    # Action
    if not recipe.set_ingredients(ingredientList):
        return flask.jsonify({'msg': 'Error in setting ingredients'}), 200
    return flask.jsonify({'msg': 'Success'}), 200
