class Flow:

    __baseEndpoint = 'flows'
    __client = None

    def __init__(self, __client):
        self.__client = __client

    def create(self, name, flow_type, descriptions=None, partners=None):
        data = {'name': name, 'flowType': flow_type}
        if descriptions is not None:
            data['descriptions'] = descriptions
        if partners is not None:
            data['partners'] = partners
        r = self.__client.post(self.__baseEndpoint + "/", data)
        return r

    def get(self, flow_id):
        r = self.__client.get(self.__baseEndpoint + "/" + flow_id)
        return r

    def list(self):
        r = self.__client.get(self.__baseEndpoint + "/")
        return r

    def update(self, flow_id, name=None, descriptions=None, partners=None):
        data = {}
        if name is not None:
            data['name'] = name
        if descriptions is not None:
            data['descriptions'] = descriptions
        if partners is not None:
            data['partners'] = partners
        r = self.__client.put(self.__baseEndpoint + "/" + flow_id, data)
        return r

    def remove(self, flow_id):
        r = self.get(flow_id)
        self.__client.delete(self.__baseEndpoint + "/" + flow_id)
        return r
