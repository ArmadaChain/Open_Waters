import json


class Data:
    __baseEndpoint = 'data'
    __client = None

    def __init__(self, __client):
        self.__client = __client

    def push(self, flow_id: str, data: object, memo: str = None, encrypt: bool = False) -> dict:
        """ Push data

        :rtype: dict
        :param flow_id: Flow ID
        :param data: Data
        :param memo: Memo
        :param encrypt: Should encrypt data before pushing?
        :return: Pushed data
        """
        data = {'flowId': flow_id, data: json.dumps(data)}
        if memo is not None:
            data['memo'] = memo
        r = self.__client.post(self.__baseEndpoint + '/?encrypt=' + str(encrypt), data)
        return r

    def get(self, flow_id: str) -> list:
        """

        :rtype: list
        :param flow_id: Flow ID
        :return: List of data
        """
        r = self.__client.get(self.__baseEndpoint + "/" + flow_id)
        return r
