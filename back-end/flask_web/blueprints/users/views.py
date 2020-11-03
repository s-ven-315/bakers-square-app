import os
from flask import Blueprint, render_template, request, redirect, url_for, flash
from flask_login import current_user, logout_user, login_required, login_user

from models.model_users import User
from services.storage import upload_file_to_s3, allowed_file, delete_file_at_s3

users_blueprint = Blueprint('users', __name__, template_folder='templates')


@users_blueprint.route('/new', methods=['GET'])
def new():
    if current_user.is_authenticated:
        logout_user()
    return render_template('users/new.html')

