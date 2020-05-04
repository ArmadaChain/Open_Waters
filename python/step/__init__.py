class Step:

    __baseEndpoint = 'steps'
    __client = None

    def __init__(self, __client):
        self.__client = __client

    def create(self, stepNum, validator, flow, documents=None, dataSet=None, data=None):
        step = {'stepNum': stepNum, 'validator': validator, 'flow': flow}
        if documents is not None:
            step['documents'] = documents
        if dataSet is not None:
            step['dataSet'] = dataSet
        if data is not None:
            step['data'] = data
        r = self.__client.post(self.__baseEndpoint, data)
        return r

    def get(self, stepId):
        r = self.__client.get(self.__baseEndpoint + "/" + stepId)
        return r

    def getAll(self, validator=None):
        queries = ''
        if validator is not None:
            queries = '&validator='+validator
        r = self.__client.get(self.__baseEndpoint + queries)
        return r

    def getAllByFlow(self, flowId, validator=None):
        queries = ''
        if validator is not None:
            queries = '&validator='+validator
        r = self.__client.get('flows/' + flowId + "/" + self.__baseEndpoint + queries)
        return r

    def update(self, stepId, stepNum=None, validator=None, flow=None,
        documents=None, dataSet=None, data=None):
        step = {}
        if stepNum is not None:
            step['stepNum'] = stepNum
        if validator is not None:
            step['validator'] = validator
        if flow is not None:
            step['flow'] = flow
        if documents is not None:
            step['documents'] = documents
        if dataSet is not None:
            step['dataSet'] = dataSet
        if data is not None:
            step['data'] = data
        r = self.__client.put(self.__baseEndpoint + "/" + stepId, step)
        return r

    def delete(self, stepId):
        r = self.__client.delete(self.__baseEndpoint + "/" + stepId)
        return r
