from package.open_waters.client import Client
from package.open_waters.account import Account
from package.open_waters.dataset import DataSet
from package.open_waters.flow import Flow
from package.open_waters.step import Step
from package.open_waters.document import Document
from package.open_waters.data import Data
from package.open_waters.safe import Safe


class OpenWater:

    def __init__(self, api_key=None):
        http_client = Client(api_key)

        if api_key is None:
            ow_account = Safe.safe_class(Account(http_client), ['create'])
            setattr(self, 'account', ow_account)
        else:
            setattr(self, 'account', Account(http_client))
            setattr(self, 'data_set', DataSet(http_client))
            setattr(self, 'flow', Flow(http_client))
            setattr(self, 'step', Step(http_client))
            setattr(self, 'document', Document(http_client))
            setattr(self, 'data', Data(http_client))
