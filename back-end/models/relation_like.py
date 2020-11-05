import peewee as pw

from models.utils.base_model import BaseModel
from models.model_recipe import Recipe
from models.model_user import User


class LikeRelation(BaseModel):
    user = pw.ForeignKeyField(User, on_delete="CASCADE")
    recipe = pw.ForeignKeyField(Recipe, on_delete="CASCADE")

    def as_dict(self, full=False):
        return dict(
            type='LikeRelation',
            id=self.id,
        )