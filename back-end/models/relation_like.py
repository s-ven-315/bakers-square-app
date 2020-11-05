import peewee as pw
from playhouse.hybrid import hybrid_property

from models.base_model import BaseModel
from models.model_recipe import Recipe
from models.model_user import User


class LikeRelation(BaseModel):
    user = pw.ForeignKeyField(User, on_delete="CASCADE", backref='likes')
    recipe = pw.ForeignKeyField(Recipe, on_delete="CASCADE", backref='likes')

    def as_dict(self):
        return dict()

