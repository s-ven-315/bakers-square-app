import peewee as pw
from models.base_model import BaseModel


class Tag(BaseModel):
    text = pw.CharField(null=False)

    def as_dict(self):
        return dict()
