from app import app, login_manager
from flask import render_template, url_for, redirect
from flask_login import login_required
from flask_assets import Environment

from flask_web.blueprints.users.views import users_blueprint
from flask_web.utils.assets import bundles


assets = Environment(app)
# assets.versions = 'timestamp'
assets.register(bundles)


app.register_blueprint(users_blueprint, url_prefix="/users")


@app.route("/")
def home():
    return render_template('home.html')


@login_manager.unauthorized_handler
def unauthorized():
    return redirect(url_for('home'))
