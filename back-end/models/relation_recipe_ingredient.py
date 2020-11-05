import peewee as pw
from models.base_model import BaseModel
from models.model_ingredient import Ingredient
from models.model_recipe import Recipe


class RecipeIngredientRelation(BaseModel):
    recipe = pw.ForeignKeyField(Recipe, on_delete="CASCADE")
    ingredient = pw.ForeignKeyField(Ingredient, on_delete="CASCADE")

    def as_dict(self, full=False):
        return dict(
            type='RecipeIngredientRelation',
            id=self.id,
        )