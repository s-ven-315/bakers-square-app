from flask_login import UserMixin
from playhouse.hybrid import hybrid_property
from werkzeug.security import generate_password_hash
from werkzeug.utils import secure_filename

from models.base_model import BaseModel
import peewee as pw


class User(BaseModel, UserMixin):
    userId = pw.CharField(unique=True, null=True)
    name = pw.CharField(unique=False, null=False)
    email = pw.CharField(unique=True, null=False)
    pw_hash = pw.CharField(unique=False, null=False)

    def validate(self):
        duplicate_user = User.get_or_none(User.email == self.email)
        if duplicate_user:
            self.errors.append('This email has been registered! Try another email!')
            return

        idx = 0
        userIdText = secure_filename(self.name).lower().replace("_", "")
        otherUserIds = [int(u.userId[-2:]) for u in User.select(User.userId).where(User.userId.startswith(userIdText))]
        if otherUserIds:
            idx = max(otherUserIds) + 1

        self.userId = userIdText + ("%02d" % idx)

        rules = [lambda s: any(x.isupper() for x in s),  # must have at least one uppercase
                 lambda s: any(x.islower() for x in s),  # must have at least one lowercase
                 lambda s: any(x.isdigit() for x in s),  # must have at least one digit
                 lambda s: len(s) >= 7  # must be at least 7 characters
                 ]

        if not all([rule(self.pw) for rule in rules]):
            self.errors.append(
                'Password must have at least one uppercase, one lowercase and be at least 6 characters long')

        if len(self.errors) == 0:
            self.pw_hash = generate_password_hash(self.pw)

    def as_dict(self):
        return dict(
            userId=self.userId,
            name=self.name,
            email=self.email,
        )
