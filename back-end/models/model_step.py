import peewee as pw
from playhouse.hybrid import hybrid_property

from models.base_model import BaseModel
from models.model_recipe import Recipe


class Step(BaseModel):
    no = pw.IntegerField(null=False)
    text = pw.CharField(null=False)
    recipe = pw.ForeignKeyField(Recipe, on_delete="CASCADE")

    def as_dict(self, basic=False):
        return dict(
            type='Step',
            id=self.id,
            no=self.no,
            text=self.text,
            ingredients=[d.as_dict() for d in self.ingredients],
            equipment=[d.as_dict() for d in self.equipment],
        )

    @hybrid_property
    def ingredients(self):
        from models.model_ingredient import Ingredient
        from models.relation_step_ingredient import StepIngredientRelation
        return Ingredient.select().join(StepIngredientRelation, pw.JOIN.LEFT_OUTER).where(StepIngredientRelation.step == self)

    @hybrid_property
    def equipment(self):
        from models.model_equipment import Equipment
        from models.relation_step_equipment import StepEquipmentRelation
        return Equipment.select().join(StepEquipmentRelation, pw.JOIN.LEFT_OUTER).where(StepEquipmentRelation.step == self)
