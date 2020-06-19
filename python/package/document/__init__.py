class Document:

    __baseEndpoint = 'documents'
    __client = None

    def __init__(self, __client):
        self.__client = __client

    def upload(self, file_path: str) -> dict:
        """ Upload document

        :rtype: dict
        :param file_path:
        :return: Uploaded document
        """
        files = {'file': open(file_path, 'rb')}
        r = self.__client.upload(self.__baseEndpoint + "/upload", files)
        return r
