from app import app
from flask import render_template
from flask_assets import Environment

from flask_web.blueprints.users.views import users_blueprint
from flask_web.utils.assets import bundles


assets = Environment(app)
assets.versions = 'timestamp'
assets.register(bundles)


app.register_blueprint(users_blueprint, url_prefix="/users")


@app.route("/")
def home():
    return render_template('home.html')
