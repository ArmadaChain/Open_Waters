from .client import Client
from .account import Account
from .dataset import DataSet
from .flow import Flow
from .step import Step
from .document import Document
from .data import Data
from .safe import Safe


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
