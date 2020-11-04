from flask_jwt_extended import jwt_required
from flask_api.blueprints.utils.decorators import api_post

from ..api_recipe import recipes_api_blueprint


@recipes_api_blueprint.route('/setIngredient', methods=['POST'])
@jwt_required
@api_post(['ingredientId'])
def set_ingredient():
    pass


@recipes_api_blueprint.route('/unsetIngredient', methods=['POST'])
@jwt_required
@api_post(['ingredientId'])
def unset_ingredient():
    pass
