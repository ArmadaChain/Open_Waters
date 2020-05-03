import requests
from ..error import ErrorHandler


class Client:

    headers = {'Content-type': 'application/json'}
    __baseURL = 'http://consensus.us-east-2.elasticbeanstalk.com/'

    def __init__(self, apikey):
        if apikey is not None:
            self.headers['Authorization'] = apikey

    def post(self, url, data):
        url = self.__baseURL + url
        try:
            r = requests.post(url, json=data, headers=self.headers)
            return r.json()
        except requests.exceptions.RequestException as err:
            raise ErrorHandler.handle(err)

    def put(self, url, data):
        url = self.__baseURL + url
        try:
            r = requests.put(url, json=data, headers=self.headers)
            return r.json()
        except requests.exceptions.RequestException as err:
            raise ErrorHandler.handle(err)

    def get(self, url):
        url = self.__baseURL + url
        try:
            r = requests.get(url)
            return r.json()
        except requests.exceptions.RequestException as err:
            raise ErrorHandler.handle(err)

    def delete(self, url):
        url = self.__baseURL + url
        try:
            r = requests.delete(url)
            return r.json()
        except requests.exceptions.RequestException as err:
            raise ErrorHandler.handle(err)
