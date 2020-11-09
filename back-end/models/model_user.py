import random
import peewee as pw
from flask_login import UserMixin
from playhouse.hybrid import hybrid_property
from werkzeug.security import generate_password_hash
from werkzeug.utils import secure_filename

from models.utils.base_model import BaseModel


class User(BaseModel, UserMixin):
    userId = pw.CharField(unique=True, null=False)
    name = pw.CharField(unique=False, null=False)
    email = pw.CharField(unique=True, null=False)
    pw_hash = pw.CharField(unique=False, null=False)
    pw = ''

    def validate(self):
        duplicate_user = User.get_or_none(User.email == self.email)
        if duplicate_user and not self.pw_hash:
            self.errors.append('This email has been registered! Try another email!')
            return

        if self.userId == '':
            idx = random.randint(0, 99)
            userIdText = secure_filename(self.name).lower().replace("_", "")
            otherUserIds = [int(u.userId[-2:]) for u in User.select(User.userId).where(User.userId.startswith(userIdText))]
            if otherUserIds:
                while idx in otherUserIds:
                    idx = random.randint(0, 99)

            self.userId = userIdText + ("%02d" % idx)

        if self.pw:
            rules = [lambda s: any(x.isupper() for x in s),  # must have at least one uppercase
                     lambda s: any(x.islower() for x in s),  # must have at least one lowercase
                     lambda s: any(x.isdigit() for x in s),  # must have at least one digit
                     lambda s: len(s) >= 7  # must be at least 7 characters
                     ]

            if not all([rule(self.pw) for rule in rules]):
                self.errors.append(
                    'Password must have at least one uppercase, one lowercase and be at least 7 characters long')

            if len(self.errors) == 0:
                self.pw_hash = generate_password_hash(self.pw)
        else:
            if len(self.pw_hash) == 0:
                self.errors.append('Password is not provided')

    def as_dict(self, basic=False):
        if not basic:
            return dict(
                type='User',
                userId=self.userId,
                name=self.name,
                email=self.email,

                recipes=[d.as_dict() for d in self.recipes],
                liked_recipes=[d.as_dict() for d in self.liked_recipes],
                followers=self.followers_dict(basic=True),
                following=self.following_dict(basic=True),
                comments=[d.as_dict(basic=True) for d in self.comments]
            )
        else:
            return dict(
                type='User',
                userId=self.userId,
                name=self.name,
                email=self.email
            )

    @hybrid_property
    def liked_recipes(self):
        from models.model_recipe import Recipe
        from models.relation_like import LikeRelation
        return Recipe.select().join(LikeRelation, pw.JOIN.LEFT_OUTER).where(LikeRelation.user == self)

    @hybrid_property
    def followers(self):
        from models.relation_subscription import SubscriptionRelation
        return (
            User.select()
                .join(SubscriptionRelation, pw.JOIN.LEFT_OUTER, on=SubscriptionRelation.from_user)
                .where(SubscriptionRelation.to_user == self)
        )

    @hybrid_property
    def following(self):
        from models.relation_subscription import SubscriptionRelation
        return (
            User.select()
                .join(SubscriptionRelation, pw.JOIN.LEFT_OUTER, on=SubscriptionRelation.to_user)
                .where(SubscriptionRelation.from_user == self)
        )

    @hybrid_property
    def comments(self):
        from models.model_comment import Comment
        return Comment.select().where(Comment.user == self).order_by(Comment.updated_at)

    def following_dict(self, basic):
        return [d.as_dict(basic=basic) for d in self.following]

    def followers_dict(self, basic):
        return [d.as_dict(basic=basic) for d in self.followers]

    def like(self, recipe):
        from models.relation_like import LikeRelation
        likeRelation = LikeRelation.get_or_none(LikeRelation.user == self, LikeRelation.recipe == recipe)
        if not likeRelation:
            likeRelation = LikeRelation(user=self, recipe=recipe)
            return likeRelation.save()
        return True

    def unlike(self, recipe):
        from models.relation_like import LikeRelation
        likeRelation = LikeRelation.get_or_none(LikeRelation.user == self, LikeRelation.recipe == recipe)
        if likeRelation:
            return likeRelation.delete_instance()
        return True

    def subscribe(self, user):
        from models.relation_subscription import SubscriptionRelation as Subs
        subscriptionRelation = Subs.get_or_none(Subs.from_user == self, Subs.to_user == user)
        if not subscriptionRelation:
            subscriptionRelation = Subs(from_user=self, to_user=user)
            return subscriptionRelation.save()
        return True

    def unsubscribe(self, user):
        from models.relation_subscription import SubscriptionRelation as Subs
        subscriptionRelation = Subs.get_or_none(Subs.from_user == self, Subs.to_user == user)
        if subscriptionRelation:
            return subscriptionRelation.delete_instance()
        return True

