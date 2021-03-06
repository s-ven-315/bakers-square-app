import peewee as pw
from models.utils.base_model import BaseModel
from models.model_ingredient import Ingredient
from models.model_step import Step


class StepIngredientRelation(BaseModel):
    step = pw.ForeignKeyField(Step, on_delete="CASCADE")
    ingredient = pw.ForeignKeyField(Ingredient, on_delete="CASCADE")
    qty = pw.CharField(null=True)
    unit = pw.CharField(null=True)

    def as_dict(self, full=False):
        return dict(
            type='StepIngredientRelation',
            id=self.id,
        )
