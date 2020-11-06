import random

from werkzeug.security import generate_password_hash
from werkzeug.utils import secure_filename

from models.model_comment import Comment
from models.model_equipment import Equipment
from models.model_ingredient import Ingredient
from models.model_recipe import Recipe
from models.model_step import Step
from models.model_tag import Tag
from models.model_user import User
from models.relation_like import LikeRelation
from models.relation_recipe_equipment import RecipeEquipmentRelation
from models.relation_recipe_ingredient import RecipeIngredientRelation
from models.relation_recipe_tag import RecipeTagRelation
from models.relation_step_equipment import StepEquipmentRelation
from models.relation_step_ingredient import StepIngredientRelation
from models.relation_subscription import SubscriptionRelation
import pandas as pd

all_models = [User, Recipe, Comment, Equipment, Ingredient, Step, Tag,
              LikeRelation, SubscriptionRelation, RecipeEquipmentRelation, RecipeIngredientRelation, RecipeTagRelation,
              StepEquipmentRelation, StepIngredientRelation]

# Step 1: Delete all existing data
for M in all_models:
    M.delete().execute()
    M._meta.auto_increment = False


# Step 2: User
password = 'Test1234'
users_df = pd.read_csv("data/users.csv", sep=';')
users = []
for user_id, user in users_df.iterrows():
    userId = secure_filename(user['name'].strip()).lower().replace("_", "") + ("%02d" % random.randint(0, 99))
    users.append(User(id=user_id, userId=userId, name=user['name'].strip(), email=user['email'].strip(),
                      pw_hash=generate_password_hash(password)))

User.bulk_create(users)

# Step 3: Tags
tags_df = pd.read_csv("data/tags.csv", sep=';')
tags = []
for tag_id, tag in tags_df.iterrows():
    tags.append(Tag(id=tag_id, text=tag['text'].strip()))

# Step 4: Ingredients
ingredients_df = pd.read_csv("data/ingredients.csv", sep=';')
ingredients = []
for ingredient_id, ingredient in ingredients_df.iterrows():
    ingredients.append(Ingredient(id=ingredient_id, name=ingredient['name'].strip()))

Ingredient.bulk_create(ingredients)


# Closing Step: Resetting
for M in all_models:
    M._meta.auto_increment = True
