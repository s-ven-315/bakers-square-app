import requests


def test_url(url, data):
    print("\nSending request to %s" % url)
    print("Input Data: ")
    print(data)
    response = requests.post(url, json=data, timeout=5000)
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
