import requests


class OpenWater:
    headers = {'Content-type': 'application/json'}
    url = ''

    def __init__(self, apikey):
        self.url = 'https://proxy-server.com:443/armadachain/openwater?apikey=' + apikey

    def create(self, data):
        r = requests.post(self.url, json=data, headers=self.headers)
        return r.status_code

    def get(self, queries):
        response = requests.get(self.url, queries)
        if response:
            return response.json()
        else:
            return 'An error has occurred.'
