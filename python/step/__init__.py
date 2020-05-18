class Step:

    __baseEndpoint = 'steps'
    __client = None

    def __init__(self, __client):
        self.__client = __client

    def create(self, step_num, validator, flow, documents=None, data_set=None, data=None):
        step = {'stepNum': step_num, 'validator': validator, 'flow': flow}
        if documents is not None:
            step['documents'] = documents
        if data_set is not None:
            step['dataSet'] = data_set
        if data is not None:
            step['data'] = data
        r = self.__client.post(self.__baseEndpoint, data)
        return r

    def get(self, step_id):
        r = self.__client.get(self.__baseEndpoint + "/" + step_id)
        return r

    def list(self, validator=None):
        queries = ''
        if validator is not None:
            queries = '&validator='+validator
        r = self.__client.get(self.__baseEndpoint + queries)
        return r

    def list_by_flow(self, flow_id, validator=None):
        queries = ''
        if validator is not None:
            queries = '&validator='+validator
        r = self.__client.get('flows/' + flow_id + "/" + self.__baseEndpoint + queries)
        return r

    def update(self, step_id, step_num=None, validator=None, flow=None,
               documents=None, data_set=None, data=None):
        step = {}
        if step_num is not None:
            step['stepNum'] = step_num
        if validator is not None:
            step['validator'] = validator
        if flow is not None:
            step['flow'] = flow
        if documents is not None:
            step['documents'] = documents
        if data_set is not None:
            step['dataSet'] = data_set
        if data is not None:
            step['data'] = data
        r = self.__client.put(self.__baseEndpoint + "/" + step_id, step)
        return r

    def delete(self, step_id):
        r = self.__client.delete(self.__baseEndpoint + "/" + step_id)
        return r
