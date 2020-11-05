import peewee as pw
from models.utils.base_model import BaseModel


class Ingredient(BaseModel):
    name = pw.CharField(unique=True, null=False)

    def as_dict(self, basic=False):
        return dict(
            type='Ingredient',
            id=self.id,
            name=self.name,
        )
