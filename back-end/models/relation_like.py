import peewee as pw
from models.base_model import BaseModel
from models.model_user import User
from models.model_recipe import Recipe


class LikeRelation(BaseModel):
    user = pw.ForeignKeyField(User, on_delete="CASCADE")
    recipe = pw.ForeignKeyField(Recipe, on_delete="CASCADE")

    def as_dict(self):
        return dict()
