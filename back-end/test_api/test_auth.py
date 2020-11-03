import requests

from models.model_users import User
from test_utils.test_utils import assert_msg, test_url


def test_signup(name, email, password):
    url = 'http://localhost:5000/api/auth/signup'
    data = dict(name=name, email=email, password=password)
    return test_url(url, method="POST", data=data, auth=False)


def test_login(email='', password=''):
    url = 'http://localhost:5000/api/auth/login'
    data = dict(email=email, password=password)
    return test_url(url, method="POST", data=data, auth=False)


if __name__ == '__main__':
    name = "XiangLing"
    email = 'testing1@gmail.com'
    password = "TESTtest1234"

    existing_user = User.get_or_none(User.email == email)
    if existing_user:
        existing_user.delete_instance()

    # Must Fail (Sign Up)
    assert_msg(test_signup(name="", email=email, password=password), "Missing name")  # Empty Name
    assert_msg(test_signup(name=name, email="", password=password), "Missing email")  # Empty Email
    assert_msg(test_signup(name=name, email=email, password=''), "Missing password")  # Empty Password
    assert_msg(test_signup(name=name, email='testing.hikari@gmail.com', password=password),
               "This email has been registered! Try another email!")  # Taken Email

    msg_bad_password = 'Password must have at least one uppercase, one lowercase and be at least 6 characters long'
    assert_msg(test_signup(name=name, email='testing.hikari@gmail.com', password=password), 'This email has been registered! Try another email!')
    assert_msg(test_signup(name=name, email=email, password='TESTtest'), msg_bad_password)  # Bad Password: No Numbers
    assert_msg(test_signup(name=name, email=email, password='TEST1234'), msg_bad_password)  # Bad Password: No lowercase
    assert_msg(test_signup(name=name, email=email, password='test1234'), msg_bad_password)  # Bad Password: No uppercase
    assert_msg(test_signup(name=name, email=email, password='Tt1'), msg_bad_password)  # Bad Password: < 7 characters

    # Must Pass
    user = test_signup(name=name, email=email, password=password)
    user = test_login(email=email, password=password)

    # Must Fail (Sign In)
    assert_msg(test_login(email='', password=password), "Missing email")  # Empty Email
    assert_msg(test_login(email=email, password=''), "Missing password")  # Empty Password
    assert_msg(test_login(email=email, password='TESTtest123'), "Wrong password is provided")  # Bad Password
    assert_msg(test_login(email='bad-email@gmail.com', password='TESTtest1234'),
               "Email does not exists in database")  # Bad Email
