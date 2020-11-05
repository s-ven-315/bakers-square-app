import flask
from flask_jwt_extended import jwt_required
from flask_api.blueprints.utils.decorators import api_post
from models.model_ingredient import Ingredient
from models.model_recipe import Recipe
from models.relation_recipe_ingredient import RecipeIngredientRelation as Relation

from ..api_recipe import recipes_api_blueprint, recipeExists
from ..utils.helpers import Helper


@recipes_api_blueprint.route('/<recipeId>/ingredients', methods=['POST'])
@api_post(['ingredientIds'])
@recipeExists
def set_ingredient(recipeId: str):
    # recipe
    recipe = Recipe.get_by_id(recipeId)

    # ingredientIds
    json_data = flask.request.json
    ingredientIds = json_data.get('ingredientIds')
    msg, code = Helper.assert_id_list(ingredientIds, Ingredient, 'ingredientId')
    if code == 400:
        return flask.jsonify({'msg': msg}), code

    # Find toAddRelation
    toAdd = []
    for ingredientId in ingredientIds:
        ingredient = Ingredient.get_by_id(ingredientId)
        existingRelation = Relation.get_or_none(Relation.recipe == recipe, Relation.ingredient == ingredientId)
        if not existingRelation:
            toAdd.append(dict(recipe=recipe, ingredient=ingredient))

    # Adding & Delete
    if len(toAdd) > 0:
        Relation.insert_many(toAdd).execute()
    toDel = Relation.delete().where(Relation.recipe == recipe, Relation.ingredient.not_in(ingredientIds))
    toDel.execute()
    return flask.jsonify({'msg': 'Success'}), 200
