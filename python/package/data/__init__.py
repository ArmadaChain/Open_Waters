import json


class Data:
    __baseEndpoint = 'data'
    __client = None

    def __init__(self, __client):
        self.__client = __client

    def push(self, flow_id, data, memo=None, encrypt=False):
        data = {'flowId': flow_id, data: json.dumps(data)}
        if memo is not None:
            data['memo'] = memo
        r = self.__client.post(self.__baseEndpoint + '/?encrypt=' + encrypt, data)
        return r

    def get(self, flow_id):
        r = self.__client.get(self.__baseEndpoint + "/" + flow_id)
        return r
