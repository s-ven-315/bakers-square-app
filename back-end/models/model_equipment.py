import peewee as pw
from models.base_model import BaseModel
from models.model_user import User


class Equipment(BaseModel):
    name = pw.CharField(unique=True, null=False)

    def as_dict(self):
        return dict()
