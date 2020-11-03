from test_utils import test_url


def test_signup(name, email, password):
    url = 'http://localhost:5000/api/auth/signup'
    data = dict(name=name, email=email, password=password, )
    return test_url(url, method="POST", data=data)


def test_login(email='', password=''):
    url = 'http://localhost:5000/api/auth/login'
    data = dict(email=email, password=password)
    return test_url(url, method="POST", data=data)


if __name__ == '__main__':
    name = "Victor Tan"
    email = 'testing@gmail.com'
    password = "1234TESTtest"

    # Must Fail (Sign Up)
    assert test_signup(name="", email=email, password=password) is False  # Empty Name
    assert test_signup(name=name, email="", password=password) is False  # Empty Email
    assert test_signup(name=name, email=email, password='TESTtest') is False  # Bad Password: No Numbers
    assert test_signup(name=name, email=email, password='TEST1234') is False  # Bad Password: No lowercase
    assert test_signup(name=name, email=email, password='test1234') is False  # Bad Password: No uppercase
    assert test_signup(name=name, email=email, password='Tt1') is False  # Bad Password: Less than 7 characters
    assert test_signup(name=name, email=email, password='') is False  # Empty Password

    # Must Pass
    test_signup(name=name, email=email, password=password)
    access_token = test_login(email=email, password=password)

    # Must Fail (Sign In)
    assert test_login(email='', password=password) is False  # Empty Email
    assert test_login(email=email, password='') is False  # Empty Password
    assert test_login(email=email, password='TESTtest123') is False  # Bad Password
    assert test_login(email='bad-email@gmail.com', password='TESTtest1234') is False  # Bad Email
