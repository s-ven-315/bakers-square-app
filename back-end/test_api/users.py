from test_utils import test_url


def test_get(userId: str):
    url = 'http://localhost:5000/api/users/%s' % userId
    return test_url(url, method="GET")


if __name__ == '__main__':
    pass