import requests

TIMEOUT = 100000


def test_url(url, method='GET', data=None):
    print("\nSending request to %s" % url)
    if method == "POST" and data is not None:
        print("Input Data: ")
        print(data)
    response = requests.get(url, timeout=TIMEOUT) if method == "GET" else requests.post(url, json=data, timeout=TIMEOUT)
    print("Status Code: %d" % response.status_code)
    if response.status_code != 200:
        try:
            if response.json():
                print("Output Data: ")
                print(response.json())
        except ValueError:
            print()
            return False
        print()
        return False

    response_json = response.json()
    print("Output Data: ")
    print(response_json)
    print()
    return response_json
