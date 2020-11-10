import os

os.environ['MIGRATION'] = '1'

if not os.getenv('FLASK_ENV') == 'production':
    print("Loading environment variables from .env")
    from dotenv import load_dotenv

    load_dotenv()

    from pathlib import Path
    import services.storage as storage
    import glob
    import pandas as pd
    import random
    from werkzeug.utils import secure_filename

    # Generic Profile Image
    storage.s3.upload_file('data/profile-img.png', storage.S3_BUCKET, 'profile-img.png', ExtraArgs={
        "ACL": 'public-read',
    })

    # Generic Recipe Image
    storage.s3.upload_file('data/recipe-img.png', storage.S3_BUCKET, 'recipe-img.png', ExtraArgs={
        "ACL": 'public-read',
    })

    # Profile Images
    female_faces = sorted(glob.glob('data/images/profile_imgs/female/*'))
    male_faces = sorted(glob.glob('data/images/profile_imgs//male/*'))

    random.seed(114)
    random.shuffle(male_faces)

    users_df = pd.read_csv("data/users.csv", sep=';')
    users = []
    female_nth, male_nth = 0, 0
    for user_id, user in users_df.iterrows():
        random.seed(1992 + user_id)
        userId = secure_filename(user['name'].strip()).lower().replace("_", "") + ("%02d" % random.randint(0, 99))
        img_url = "user-%s.png" % userId

        img_path = female_faces[female_nth] if user['gender'] == 'F' else male_faces[male_nth]
        if user['gender'] == 'F':
            female_nth += 1
        else:
            male_nth += 1

        storage.s3.upload_file(img_path, storage.S3_BUCKET, img_url, ExtraArgs={
            "ACL": 'public-read',
        })
        pass

    # Recipe Image







