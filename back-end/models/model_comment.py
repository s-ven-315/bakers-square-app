import peewee as pw
from models.utils.base_model import BaseModel
from models.model_recipe import Recipe
from models.model_user import User


class Comment(BaseModel):
    text = pw.CharField(null=False)
    user = pw.ForeignKeyField(User, backref='comments', on_delete="CASCADE")
    recipe = pw.ForeignKeyField(Recipe, backref='comments', on_delete="CASCADE")

    def as_dict(self, basic=False):
        if not basic:
            return dict(
                type='Comment',
                id=self.id,
                user=dict(userId=self.user.userId, name=self.user.name),
                recipe=dict(id=self.recipe.id, name=self.recipe.name),
                text=self.text,
            )
        else:
            return dict(
                type='Comment',
                id=self.id,
                text=self.text,
                recipe=dict(id=self.recipe.id, name=self.recipe.name),
            )
