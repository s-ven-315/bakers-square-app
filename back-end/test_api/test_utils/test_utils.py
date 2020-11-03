import requests

TIMEOUT = 100000


class AuthUser:
    access_token: str = ''
    userId: str
    name: str
    email: str

    @classmethod
    def login(cls, name="XiangLing", email='testing1@gmail.com', password='TESTtest1234'):
        response = requests.get('http://localhost:5000/api/auth/userExists', params={'userId': 'xiangling00'})
        if not response.json():
            url = 'http://localhost:5000/api/auth/signup'
            data = dict(name=name, email=email, password=password)
            response = requests.post(url, json=data).json()
        else:
            url = 'http://localhost:5000/api/auth/login'
            data = dict(email=email, password=password)
            response = requests.post(url, json=data).json()

        cls.access_token = response['access_token']
        cls.userId = response['userId']
        cls.name = response['name']
        cls.email = response['email']


def test_url(url, data=None, method='GET', auth=True):
    print("\nSending %s request to %s" % (method, url))
    if method == "POST" and data is not None:
        print("Input Data: ")
        print(data)

    headers = {"content-type": "application/json"}
    if auth:
        if not AuthUser.access_token:
            AuthUser.login()
        headers['Authorization'] = 'Bearer {}'.format(AuthUser.access_token)

    response = requests.request(method, url, json=data, timeout=TIMEOUT, headers=headers)
    print("Status Code: %d" % response.status_code)
    if response.status_code != 200:
        try:
            if response.json():
                output = response.json()
            else:
                output = {'msg': 'No error messages'}

        except ValueError:
            output = {'msg': 'No error messages'}

    else:
        output = response.json()

    print("Output Data: ")
    print(output)
    print()
    return output


def assert_msg(data, msg):
    assert 'msg' in data
    try:
        assert msg == data['msg']
    except AssertionError as e:
        print("data['msg']: %s" % data['msg'])
        print("msg        : %s" % msg)
        raise e