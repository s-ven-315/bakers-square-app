import os

os.environ['MIGRATION'] = '1'

if not os.getenv('FLASK_ENV') == 'production':
    print("Loading environment variables from .env")
    from dotenv import load_dotenv

    load_dotenv()

import random
from pathlib import Path
from difflib import get_close_matches
from werkzeug.security import generate_password_hash
from werkzeug.utils import secure_filename
from services.database import db

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
              LikeRelation, SubscriptionRelation, RecipeEquipmentRelation, RecipeIngredientRelation,
              RecipeTagRelation,
              StepEquipmentRelation, StepIngredientRelation]

# Step 1: Delete all existing data
db.drop_tables(all_models)
db.create_tables(all_models)

# Step 2: User
password = 'Test1234'
users_df = pd.read_csv("data/users.csv", sep=';')
users = []
for user_id, user in users_df.iterrows():
    random.seed(1992 + user_id)
    userId = secure_filename(user['name'].strip()).lower().replace("_", "") + ("%02d" % random.randint(0, 99))
    users.append(User(userId=userId, name=user['name'].strip(), email=user['email'].strip(),
                      pw_hash=generate_password_hash(password), imgName="user-%s.png" % userId
                      ))

User.bulk_create(users)

# Step 3: Tags
tags_df = pd.read_csv("data/tags.csv", sep=';')
tags = []
tag_names = []
for tag_id, tag in tags_df.iterrows():
    tags.append(Tag(text=tag['text'].strip()))
    tag_names.append(tag['text'].strip().lower().replace(' ', ''))
Tag.bulk_create(tags)

# Step 4: Ingredients
ingredients_df = pd.read_csv("data/ingredients.csv", sep=';')
ingredients = []
ingredient_names = []
for ingredient_id, ingredient in ingredients_df.iterrows():
    ingredients.append(Ingredient(name=ingredient['name'].strip()))
    ingredient_names.append(ingredient['name'].strip().lower().replace(' ', ''))

Ingredient.bulk_create(ingredients)

# Step 5: Recipes
with Path("data/recipes.txt").open('r') as f:
    lines = f.readlines()

recipes = []
recipe_ingredients = []
steps = []
recipe_tags = []
recipe_id = 0
step_no = 1
for line in lines[1:]:
    d = line.split('\t')
    if len(d) <= 1:
        continue
    recipe_name = d[1].strip()
    ingredient_name = d[9].strip()
    step = d[12].strip() if len(d) > 12 else ''
    tag_name = d[14].strip() if len(d) > 14 else ''

    if recipe_name:
        recipe_serving = int(d[2]) if d[2] else 0
        recipe_prep_time = int(d[3])
        recipe_cook_time = int(d[4])
        recipe_desc = str(d[5]).strip()
        recipes.append(
            Recipe(user=users[0], name=recipe_name, serving=recipe_serving,
                   preparation_time=recipe_prep_time, cooking_time=recipe_cook_time, description=recipe_desc,
                   imgName="recipe-img.png"))
        step_no = 1

    if ingredient_name:
        ingredient_name_parsed = ingredient_name.strip().lower().replace(' ', '')
        ingredient_searchs = get_close_matches(word=ingredient_name_parsed, possibilities=ingredient_names,
                                               cutoff=0.6)
        assert len(ingredient_searchs) > 0

        ingredient = ingredients[ingredient_names.index(ingredient_searchs[0])]

        ingredient_qty = d[7]
        ingredient_unit = d[8].strip()
        ingredient_remark = d[10].strip() if len(d) > 10 else ''

        recipe_ingredients.append(
            RecipeIngredientRelation(recipe=len(recipes), ingredient=ingredient,
                                     qty=ingredient_qty, unit=ingredient_unit, remark=ingredient_remark)
        )

    if step:
        steps.append(Step(no=step_no, text=step, recipe=len(recipes)))
        step_no += 1

    if tag_name:
        tag_name_parsed = tag_name.strip().lower().replace(' ', '')
        tag_searchs = get_close_matches(word=tag_name_parsed, possibilities=tag_names, cutoff=0.6)
        assert len(tag_searchs) > 0

        tag = tags[tag_names.index(tag_searchs[0])]
        recipe_tags.append(RecipeTagRelation(recipe=len(recipes), tag=tag))
        step_no += 1

Recipe.bulk_create(recipes)
RecipeIngredientRelation.bulk_create(recipe_ingredients)
Step.bulk_create(steps)
RecipeTagRelation.bulk_create(recipe_tags)

# Step 6: Subscriptions
subscriptions = []
random.seed(1993)
subscription_id = 0
for toUserId in range(len(users)):
    if toUserId == 20:
        fromUserIds = [i for i in range(len(users)) if i != 20]
    else:
        random.seed(1993 + toUserId)
        numFromUserId = random.randint(0, len(users) - 1)
        random.seed(1993 + toUserId + 10)
        fromUserIds = random.sample(range(len(users)), numFromUserId)

    if 0 not in fromUserIds:
        fromUserIds.append(0)

    if toUserId in fromUserIds:
        fromUserIds.remove(toUserId)

    for fromUserId in fromUserIds:
        subscriptions.append(SubscriptionRelation(from_user=fromUserId + 1, to_user=toUserId + 1))
        subscription_id += 1

SubscriptionRelation.bulk_create(subscriptions)

# Step 7: Likes
likes = []
random.seed(1993)
for fromUserId in range(len(users)):
    random.seed(1993 + fromUserId)
    numLikeRecipe = random.randint(0, len(recipes) - 1)
    random.seed(1993 + fromUserId + 10)
    likeRecipes = random.sample(range(len(recipes)), numLikeRecipe)

    for likeRecipe in likeRecipes:
        likes.append(LikeRelation(user=fromUserId + 1, recipe=likeRecipe + 1))

LikeRelation.bulk_create(likes)

# Step 8: Comments
with Path('data/comments.txt').open('r') as f:
    comment_texts = f.readlines()
    comment_texts = [c.strip() for c in comment_texts if c.strip()]

comment_now_texts = comment_texts
comments = []
for fromUserId in range(len(users)):
    for recipeId in range(len(recipes)):
        random.seed(1993 + fromUserId + recipeId)
        haveComment = random.randint(0, 10)
        if haveComment > 8:
            random.seed(2993 + fromUserId)
            numCommentTexts = random.randint(1, 3)
            random.seed(5993 + fromUserId)
            if numCommentTexts > len(comment_now_texts):
                comment_now_texts = comment_texts

            comment_selected_idxs = random.sample(range(len(comment_now_texts)), numCommentTexts)
            for c in comment_selected_idxs:
                comments.append(Comment(user=fromUserId + 1, recipe=recipeId + 1, text=comment_texts[c]))
                comment_now_texts.remove(comment_texts[c])

Comment.bulk_create(comments)
