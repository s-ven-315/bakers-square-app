import peewee as pw
from models.utils.base_model import BaseModel


class Equipment(BaseModel):
    name = pw.CharField(unique=True, null=False)

    def as_dict(self, basic=False):
        return dict(
            type='Equipment',
            id=self.id,
            name=self.name,
        )
