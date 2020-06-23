class Step:

    __baseEndpoint = 'steps'
    __client = None

    def __init__(self, __client):
        self.__client = __client

    def create(self, step_num: int, validator: str, flow: str, documents: list = None, data_set: str = None,
               data: object = None) -> dict:
        """ Create step

        :rtype: dict
        :param step_num: Order number of step
        :param validator: Validator ID
        :param flow: ID of associated flow
        :param documents: List of document IDs
        :param data_set: ID of dataset which step belongs to
        :param data: Step data, followed by dataset's rule
        :return: Created step
        """
        step = {'stepNum': step_num, 'validator': validator, 'flow': flow}
        if documents is not None:
            step['documents'] = documents
        if data_set is not None:
            step['dataSet'] = data_set
        if data is not None:
            step['data'] = data
        r = self.__client.post(self.__baseEndpoint + "/", data)
        return r

    def get(self, step_id: str) -> dict:
        """ Get step

        :rtype: dict
        :param step_id: Step ID
        :return: Step information
        """
        r = self.__client.get(self.__baseEndpoint + "/" + step_id)
        return r

    def list_by_flow(self, flow_id: str, validator: str = None) -> list:
        """ List all steps of a flow

        :rtype: list
        :param flow_id: Flow ID
        :param validator: Validator ID
        :return: List of steps
        """
        queries = ''
        if validator is not None:
            queries = '&validator='+validator
        r = self.__client.get('flows/' + flow_id + "/" +
                              self.__baseEndpoint + queries)
        return r

    def update(self, step_id: str, step_num: int = None, validator: str = None, flow: str = None,
               documents: list = None, data_set: str = None, data: object = None) -> dict:
        """ Update step

        :rtype: dict
        :param step_id: Step ID
        :param step_num: Order number of step
        :param validator: Validator ID
        :param flow: ID of associated flow
        :param documents: List of document IDs
        :param data_set: ID of dataset which step belongs to
        :param data: Step data, followed by dataset's rule
        :return: Updated step
        """
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

    def validate(self, step_id: str, is_completed: bool = True) -> dict:
        """ Mark a step is validated or not

        :rtype: dict
        :param step_id: Step ID
        :param is_completed: Is validated or not
        :return: Updated step
        """
        r = self.__client.put(self.__baseEndpoint + "/" +
                              step_id + "/validate/" + is_completed)
        return r

    def remove(self, step_id: str) -> dict:
        """ Remove step

        :rtype: dict
        :param step_id: Step ID
        :return: Removed step
        """
        r = self.get(step_id)
        self.__client.delete(self.__baseEndpoint + "/" + step_id)
        return r
