from .account import Account
from .client import Client


class OpenWater:

    functions = {}

    def __init__(self, apikey=None):
        client = Client(apikey)
        account = Account(client)

        if apikey is None:
            delattr(account, 'get')
            delattr(account, 'getAll')
            delattr(account, 'update')
            delattr(account, 'delete')
            self.functions.account = account
        else:
            self.functions.account = account
