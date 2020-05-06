from .client import Client
from .account import Account
from .dataset import DataSet
from .flow import Flow
from .step import Step
from .document import Document


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
            self.functions.dataset = DataSet(client)
            self.functions.flow = Flow(client)
            self.functions.step = Step(client)
            self.functions.documents = Document(client)
