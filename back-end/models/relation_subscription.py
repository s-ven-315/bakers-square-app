import peewee as pw
from models.base_model import BaseModel
from models.model_user import User


class SubscriptionRelation(BaseModel):
    from_user = pw.ForeignKeyField(User, on_delete="CASCADE")
    to_user = pw.ForeignKeyField(User, on_delete="CASCADE")

    def as_dict(self):
        return dict()
