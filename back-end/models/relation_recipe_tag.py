import peewee as pw
from models.base_model import BaseModel
from models.model_recipe import Recipe
from models.model_tag import Tag


class RecipeTagRelation(BaseModel):
    recipe = pw.ForeignKeyField(Recipe, on_delete="CASCADE")
    tag = pw.ForeignKeyField(Tag, on_delete="CASCADE")

    def as_dict(self):
        return dict()