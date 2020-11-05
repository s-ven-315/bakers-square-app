import peewee as pw
from models.utils.base_model import BaseModel


class Tag(BaseModel):
    text = pw.CharField(null=False)

    def as_dict(self, basic=False):
        return dict(
            type='Tag',
            id=self.id,
            text=self.text
        )
