import peewee as pw
from models.utils.base_model import BaseModel
from models.model_ingredient import Ingredient
from models.model_recipe import Recipe


class RecipeIngredientRelation(BaseModel):
    recipe = pw.ForeignKeyField(Recipe, on_delete="CASCADE")
    ingredient = pw.ForeignKeyField(Ingredient, on_delete="CASCADE")
    qty = pw.CharField(null=True)
    unit = pw.CharField(null=True)
    remark = pw.CharField(null=True)

    def as_dict(self, full=False):
        return dict(
            type='RecipeIngredientRelation',
            id=self.ingredient.id,
            name=self.ingredient.name,
            qty=self.qty,
            unit=self.unit,
            remark=self.remark
        )