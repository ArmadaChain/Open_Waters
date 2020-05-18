from .client import Client
from .account import Account
from .dataset import DataSet
from .flow import Flow
from .step import Step
from .document import Document


class OpenWater:

    functions = {}

    def __init__(self, api_key=None):
        http_client = Client(api_key)
        ow_account = Account(http_client)

        if api_key is None:
            delattr(ow_account, 'get')
            delattr(ow_account, 'getAll')
            delattr(ow_account, 'update')
            delattr(ow_account, 'delete')
            self.functions.account = ow_account
        else:
            self.functions.account = ow_account
            self.functions.data_set = DataSet(http_client)
            self.functions.flow = Flow(http_client)
            self.functions.step = Step(http_client)
            self.functions.document = Document(http_client)
