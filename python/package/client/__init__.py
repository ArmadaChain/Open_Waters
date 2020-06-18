import requests
import copy
from ..error import Errors


class Client:

    headers = {'Content-type': 'application/json'}
    __baseURL = 'http://consensus.us-east-2.elasticbeanstalk.com/api/v1/'

    def __init__(self, api_key):
        if api_key is not None:
            self.headers['Authorization'] = api_key

    def post(self, url, data):
        url = self.__baseURL + url
        try:
            r = requests.post(url, json=data, headers=self.headers)
            r.raise_for_status()
            return r.json()
        except requests.exceptions.HTTPError as err:
            raise Errors.handle(err)

    def upload(self, url, files):
        headers = copy.deepcopy(self.headers)
        del headers['Content-type']
        url = self.__baseURL + url
        try:
            r = requests.post(url, files=files, headers=headers)
            r.raise_for_status()
            return r.json()
        except requests.exceptions.HTTPError as err:
            raise Errors.handle(err)

    def put(self, url, data):
        url = self.__baseURL + url
        try:
            r = requests.put(url, json=data, headers=self.headers)
            r.raise_for_status()
            return r.json()
        except requests.exceptions.HTTPError as err:
            raise Errors.handle(err)

    def get(self, url):
        url = self.__baseURL + url
        try:
            r = requests.get(url)
            r.raise_for_status()
            return r.json()
        except requests.exceptions.HTTPError as err:
            raise Errors.handle(err)

    def delete(self, url):
        url = self.__baseURL + url
        try:
            r = requests.delete(url)
            r.raise_for_status()
            return r.json()
        except requests.exceptions.HTTPError as err:
            raise Errors.handle(err)
