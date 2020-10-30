import os
import boto3
import botocore

S3_BUCKET                 = os.environ.get("S3_BUCKET_NAME")
S3_KEY                    = os.environ.get("S3_ACCESS_KEY")
S3_SECRET                 = os.environ.get("S3_SECRET_ACCESS_KEY")
S3_LOCATION               = 'http://{}.s3.amazonaws.com/'.format(S3_BUCKET)

SECRET_KEY                = os.urandom(32)
DEBUG                     = True
PORT                      = 5000

s3 = boto3.client('s3', aws_access_key_id=S3_KEY, aws_secret_access_key=S3_SECRET)

def allowed_file(filename):
    if filename != '':
        file_ext = os.path.splitext(filename)[1]
        if file_ext in ['.jpg', '.jpeg', '.png']:
            return True
    return False


def upload_file_to_s3(file, bucket_name=S3_BUCKET, acl='public-read'):
    try:
        s3.upload_fileobj(file, bucket_name, file.filename, ExtraArgs={
            "ACL": acl,
            "ContentType": file.content_type
        })

    except Exception as e:
        print("Error occurred: ", e)
        return e

    return False


def delete_file_at_s3(key, bucket_name=S3_BUCKET):
    try:
        s3.delete_object(Bucket=bucket_name, Key=key)
    except Exception as e:
        print("Error occurred: ", e)
        return e

    return False
