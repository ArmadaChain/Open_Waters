class DataSet:

    __baseEndpoint = 'datasets'
    __client = None

    def __init__(self, __client):
        self.__client = __client

    def create(self, keys_types: dict, name: str) -> dict:
        """ Create dataset

        :rtype: dict
        :param keys_types: keys and types. Exp: {"amount": "number", item: "string"}
        :param name: Name
        :return: Created dataset
        """
        keys = keys_types.keys()
        types = keys_types.values()
        data = {'fieldKeys': keys, 'fieldTypes': types, 'name': name}
        r = self.__client.post(self.__baseEndpoint + "/", data)
        return r

    def get(self, data_set_id: str) -> dict:
        """ Get dataset by ID

        :rtype: dict
        :param data_set_id: Dataset ID
        :return: Dataset information
        """
        r = self.__client.get(self.__baseEndpoint + "/" + data_set_id)
        return r

    def list(self) -> list:
        """ List all data sets

        :rtype: list
        :return: List of dataset
        """
        r = self.__client.get(self.__baseEndpoint)
        return r

    def update(self, data_set_id: str, keys_types: dict = None, name: str = None) -> dict:
        """ Update dataset

        :rtype: dict
        :param data_set_id: Dataset ID
        :param keys_types: keys and types. Exp: {"amount": "number", item: "string"}
        :param name: Name
        :return: Updated dataset
        """
        data = {}
        if name is not None:
            data['name'] = name
        if keys_types is not None:
            data['fieldKeys'] = keys_types.keys()
            data['fieldTypes'] = keys_types.values()
        r: dict = self.__client.put(self.__baseEndpoint + "/" + data_set_id, data)
        return r

    def remove(self, data_set_id: str) -> dict:
        """ Remove dataset

        :rtype: dict
        :param data_set_id: Dataset ID
        :return: Removed dataset
        """
        r = self.__client.delete(self.__baseEndpoint + "/" + data_set_id)
        return r
