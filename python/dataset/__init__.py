class DataSet:

    __baseEndpoint = 'datasets'
    __client = None

    def __init__(self, __client):
        self.__client = __client

    def create(self, keys_types, name):
        keys = keys_types.keys()
        types = keys_types.values()
        data = {'fieldKeys': keys, 'fieldTypes': types, 'name': name}
        r = self.__client.post(self.__baseEndpoint, data)
        return r

    def get(self, data_set_id):
        r = self.__client.get(self.__baseEndpoint + "/" + data_set_id)
        return r

    def list(self):
        r = self.__client.get(self.__baseEndpoint)
        return r

    def update(self, data_set_id, keys_types=None, name=None):
        data = {}
        if name is not None:
            data['name'] = name
        if keys_types is not None:
            data['fieldKeys'] = keys_types.keys()
            data['fieldTypes'] = keys_types.values()
        r = self.__client.put(self.__baseEndpoint + "/" + data_set_id, data)
        return r

    def delete(self, data_set_id):
        r = self.__client.delete(self.__baseEndpoint + "/" + data_set_id)
        return r
