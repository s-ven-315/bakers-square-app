import flask
from functools import wraps


def api_post(keywords=None):
    if keywords is None: keywords = []

    def inner(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            if flask.request.json is None and flask.request.json != {}:
                return flask.abort(400)

            if not all([k in flask.request.json for k in keywords]):
                return flask.abort(400)

            return func(*args, **kwargs)
        return wrapper
    return inner
