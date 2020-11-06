import peewee as pw
from models.utils.base_model import BaseModel
from models.model_equipment import Equipment
from models.model_recipe import Recipe


class RecipeEquipmentRelation(BaseModel):
    recipe = pw.ForeignKeyField(Recipe, on_delete="CASCADE")
    equipment = pw.ForeignKeyField(Equipment, on_delete="CASCADE")
    qty = pw.CharField(null=True)
    unit = pw.CharField(null=True)

    def as_dict(self, full=False):
        return dict(
            type='RecipeEquipmentRelation',
            id=self.id,
        )