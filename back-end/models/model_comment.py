import peewee as pw
from models.base_model import BaseModel
from models.model_recipe import Recipe
from models.model_user import User


class Comment(BaseModel):
    text = pw.CharField(null=False)
    user = pw.ForeignKeyField(User, backref='comments', on_delete="CASCADE")
    recipe = pw.ForeignKeyField(Recipe, backref='comments', on_delete="CASCADE")

    def as_dict(self):
        return dict()
