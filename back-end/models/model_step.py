import peewee as pw
from models.base_model import BaseModel
from models.model_recipe import Recipe


class Step(BaseModel):
    no = pw.IntegerField(null=False)
    text = pw.CharField(null=False)
    recipe = pw.ForeignKeyField(Recipe, on_delete="CASCADE")

    def as_dict(self, basic=False):
        return dict(
            type='Step',
            id=self.id,
            no=self.no,
            text=self.text,
            recipe=dict(
                id=self.recipe.id,
                name=self.recipe.name,
            )
        )
