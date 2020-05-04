class DataSet:

    __baseEndpoint = 'datasets'
    __client = None

    def __init__(self, __client):
        self.__client = __client

    def create(self, keysAndTypes, name):
        keys = keysAndTypes.keys()
        types = keysAndTypes.values()
        data = {'fieldKeys': keys, 'fieldTypes': types, 'name': name}
        r = self.__client.post(self.__baseEndpoint, data)
        return r

    def get(self, dataSetId):
        r = self.__client.get(self.__baseEndpoint + "/" + dataSetId)
        return r

    def getAll(self):
        r = self.__client.get(self.__baseEndpoint)
        return r

    def update(self, dataSetId, keysAndTypes=None, name=None):
        data = {}
        if name is not None:
            data['name'] = name
        if keysAndTypes is not None:
            data['fieldKeys'] = keysAndTypes.keys()
            data['fieldTypes'] = keysAndTypes.values()
        r = self.__client.put(self.__baseEndpoint + "/" + dataSetId, data)
        return r

    def delete(self, dataSetId):
        r = self.__client.delete(self.__baseEndpoint + "/" + dataSetId)
        return r
