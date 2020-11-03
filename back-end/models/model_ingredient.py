import peewee as pw
from models.base_model import BaseModel
from models.model_user import User


class Ingredient(BaseModel):
    name = pw.CharField(unique=False, null=False)

    def as_dict(self):
        return dict()