import peewee as pw
from playhouse.hybrid import hybrid_property

from models.utils import BaseModel, Helper
from models.model_recipe import Recipe


class Step(BaseModel):
    no = pw.IntegerField(null=False)
    text = pw.TextField(null=False)
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

    def set_ingredients(self, idList):
        from models.model_ingredient import Ingredient as Class
        from models.relation_step_ingredient import StepIngredientRelation as Relation
        return Helper.set_id_list_with_qty(self, idList, Class, Relation, 'step', Relation.step, 'ingredient', Relation.ingredient)

    def set_equipment(self, idList):
        from models.model_equipment import Equipment as Class
        from models.relation_step_equipment import StepEquipmentRelation as Relation
        return Helper.set_id_list_with_qty(self, idList, Class, Relation, 'step', Relation.step, 'equipment', Relation.ingredient)
