import peewee as pw
from models.utils.base_model import BaseModel
from models.model_user import User


class SubscriptionRelation(BaseModel):
    from_user = pw.ForeignKeyField(User, on_delete="CASCADE")
    to_user = pw.ForeignKeyField(User, on_delete="CASCADE")

    def as_dict(self, full=False):
        return dict(
            type='SubscriptionRelation',
            id=self.id,
        )