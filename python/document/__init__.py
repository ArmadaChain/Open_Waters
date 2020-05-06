class Document:

    __baseEndpoint = 'documents'
    __client = None

    def __init__(self, __client):
        self.__client = __client

    def upload(self, filePath):
        files = {'file': open(filePath, 'rb')}
        r = self.__client.upload(self.__baseEndpoint + "/upload", files)
        return r
