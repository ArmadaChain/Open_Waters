from builtins import list


class Flow:

    __baseEndpoint = 'flows'
    __client = None

    def __init__(self, __client):
        self.__client = __client

    def create(self, name: str, flow_type: str, descriptions: str = None, partners: list = None) -> dict:
        """ Create flow

        :rtype: dict
        :param name: Name
        :param flow_type: Flow type. [DATA_AUDIT, TRACK_TRACE]
        :param descriptions: Descriptions
        :param partners: List of partner IDs
        :return: Created flow
        """
        data = {'name': name, 'flowType': flow_type}
        if descriptions is not None:
            data['descriptions'] = descriptions
        if partners is not None:
            data['partners'] = partners
        r = self.__client.post(self.__baseEndpoint + "/", data)
        return r

    def get(self, flow_id: str) -> dict:
        """ Get flow

        :rtype: dict
        :param flow_id: Flow ID
        :return: Flow information
        """
        r = self.__client.get(self.__baseEndpoint + "/" + flow_id)
        return r

    def list(self) -> list:
        """ List all flows

        :rtype: list
        :return: List of flows
        """
        r = self.__client.get(self.__baseEndpoint + "/")
        return r

    def update(self, flow_id: str, name: str = None, descriptions: str = None, partners: list = None) -> dict:
        """ Update flow

        :rtype: list
        :param flow_id: Flow ID
        :param name: Name
        :param descriptions: Descriptions
        :param partners: List of partner IDs
        :return: Updated flow
        """
        data = {}
        if name is not None:
            data['name'] = name
        if descriptions is not None:
            data['descriptions'] = descriptions
        if partners is not None:
            data['partners'] = partners
        r = self.__client.put(self.__baseEndpoint + "/" + flow_id, data)
        return r

    def remove(self, flow_id: str) -> dict:
        """ Remove flow

        :rtype: dict
        :param flow_id: Flow ID
        :return: Removed flow
        """
        r = self.get(flow_id)
        self.__client.delete(self.__baseEndpoint + "/" + flow_id)
        return r
