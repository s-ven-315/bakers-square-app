import peewee as pw
from models.base_model import BaseModel
from models.model_equipment import Equipment
from models.model_step import Step


class StepEquipmentRelation(BaseModel):
    step = pw.ForeignKeyField(Step, on_delete="CASCADE")
    equipment = pw.ForeignKeyField(Equipment, on_delete="CASCADE")

    def as_dict(self, full=False):
        return dict(
            type='StepEquipmentRelation',
            id=self.id,
        )
