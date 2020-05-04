class Flow:

    __baseEndpoint = 'flows'
    __client = None

    def __init__(self, __client):
        self.__client = __client

    def create(self, name, flowType, descriptions=None, partners=None):
        data = {'name': name, 'flowType': flowType}
        if descriptions is not None:
            data['descriptions'] = descriptions
        if partners is not None:
            data['partners'] = partners
        r = self.__client.post(self.__baseEndpoint, data)
        return r

    def get(self, flowId):
        r = self.__client.get(self.__baseEndpoint + "/" + flowId)
        return r

    def getAll(self):
        r = self.__client.get(self.__baseEndpoint)
        return r

    def update(self, flowId, name=None, descriptions=None, partners=None):
        data = {}
        if name is not None:
            data['name'] = name
        if descriptions is not None:
            data['descriptions'] = descriptions
        if partners is not None:
            data['partners'] = partners
        r = self.__client.put(self.__baseEndpoint + "/" + flowId, data)
        return r

    def delete(self, flowId):
        r = self.__client.delete(self.__baseEndpoint + "/" + flowId)
        return r
