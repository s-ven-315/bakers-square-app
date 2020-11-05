import peewee as pw
from models.base_model import BaseModel
from models.model_user import User


class Recipe(BaseModel):
    user = pw.ForeignKeyField(User, backref='recipes', on_delete="CASCADE")
    name = pw.CharField(null=False)

    def as_dict(self):
        return dict(
            id=self.id,
            name=self.name,
            user=dict(
                userId=self.user.id,
                name=self.user.name,
            )
        )
