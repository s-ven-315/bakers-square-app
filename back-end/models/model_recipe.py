from typing import List

import peewee as pw
from playhouse.hybrid import hybrid_property

from models.utils import BaseModel, Helper
from models.model_user import User


class Recipe(BaseModel):
    user = pw.ForeignKeyField(User, backref='recipes', on_delete="CASCADE")
    name = pw.CharField(null=False)

    def as_dict(self, basic=False):
        if not basic:
            return dict(
                type='Recipe',
                id=self.id,
                name=self.name,
                user=dict(
                    userId=self.user.id,
                    name=self.user.name,
                ),
                ingredients=[d.as_dict() for d in self.ingredients],
                equipment=[d.as_dict() for d in self.equipment],
                steps=[d.as_dict() for d in self.steps],
                tags=[d.as_dict() for d in self.tags],

                likes=[d.as_dict(basic=True) for d in self.likes],
                comments=[d.as_dict(basic=True) for d in self.comments],
            )
        else:
            return dict(
                type='Recipe',
                id=self.id,
                name=self.name,
                user=dict(
                    userId=self.user.id,
                    name=self.user.name,
                ),
                likes=[d.as_dict() for d in self.likes],
                comments=[d.as_dict() for d in self.comments],
            )

    @hybrid_property
    def ingredients(self):
        from models.model_ingredient import Ingredient
        from models.relation_recipe_ingredient import RecipeIngredientRelation
        return Ingredient.select().join(RecipeIngredientRelation, pw.JOIN.LEFT_OUTER).where(RecipeIngredientRelation.recipe == self)

    @hybrid_property
    def equipment(self):
        from models.model_equipment import Equipment
        from models.relation_recipe_equipment import RecipeEquipmentRelation
        return Equipment.select().join(RecipeEquipmentRelation, pw.JOIN.LEFT_OUTER).where(RecipeEquipmentRelation.recipe == self)

    @hybrid_property
    def steps(self):
        from models.model_step import Step
        return Step.select().where(Step.recipe == self).order_by(Step.no)

    @hybrid_property
    def tags(self):
        from models.model_tag import Tag
        from models.relation_recipe_tag import RecipeTagRelation
        return Tag.select().join(RecipeTagRelation, pw.JOIN.LEFT_OUTER).where(RecipeTagRelation.recipe == self)

    @hybrid_property
    def likes(self):
        from models.relation_like import LikeRelation
        return User.select().join(LikeRelation, pw.JOIN.LEFT_OUTER).where(LikeRelation.recipe == self)

    @hybrid_property
    def comments(self):
        from models.model_comment import Comment
        return Comment.select().where(Comment.recipe == self).order_by(Comment.updated_at)

    def set_ingredients(self, idList: List[str]):
        from models.model_ingredient import Ingredient as Class
        from models.relation_recipe_ingredient import RecipeIngredientRelation as Relation
        return Helper.set_id_list_with_qty(self, idList, Class, Relation, 'recipe', Relation.recipe, 'ingredient', Relation.ingredient)

    def set_equipment(self, idList: List[str]):
        from models.model_equipment import Equipment as Class
        from models.relation_recipe_equipment import RecipeEquipmentRelation as Relation
        return Helper.set_id_list_with_qty(self, idList, Class, Relation, 'recipe', Relation.recipe, 'equipment', Relation.equipment)

    def set_tags(self, idList: List[str]):
        from models.model_tag import Tag as Class
        from models.relation_recipe_tag import RecipeTagRelation as Relation
        return Helper.set_id_list(self, idList, Class, Relation, 'recipe', Relation.recipe, 'tag', Relation.tag)
