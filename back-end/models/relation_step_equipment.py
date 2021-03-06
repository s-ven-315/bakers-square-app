import peewee as pw
from models.utils.base_model import BaseModel
from models.model_equipment import Equipment
from models.model_step import Step


class StepEquipmentRelation(BaseModel):
    step = pw.ForeignKeyField(Step, on_delete="CASCADE")
    equipment = pw.ForeignKeyField(Equipment, on_delete="CASCADE")
    qty = pw.CharField(null=True)
    unit = pw.CharField(null=True)

    def as_dict(self, full=False):
        return dict(
            type='StepEquipmentRelation',
            id=self.id,
        )
