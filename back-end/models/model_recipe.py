import peewee as pw
from models.base_model import BaseModel
from models.model_user import User


class Recipe(BaseModel):
    name = pw.CharField(null=False)
    user = pw.ForeignKeyField(User, backref='recipes', on_delete="CASCADE")

    def as_dict(self):
        return dict()
