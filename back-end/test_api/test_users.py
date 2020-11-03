from test_utils import test_url
from test_utils.test_utils import AuthUser


def test_get_users():
    url = 'http://localhost:5000/api/users'
    return test_url(url, method="GET", auth=True)


def test_get_user(userId: str):
    url = 'http://localhost:5000/api/users/%s' % userId
    return test_url(url, method="GET", auth=True)


if __name__ == '__main__':
    users = test_get_users()
    user = test_get_user(userId="xiangling00")

    pass
