class Account:

    __baseEndpoint = 'customers'
    __client = None

    def __init__(self, __client):
        self.__client = __client

    def create(self, username, email, name=None, company=None):
        data = {'username': username, 'email': email}
        if name is not None:
            data['name'] = name
        if company is not None:
            data['company'] = company
        r = self.__client.post('public/'+self.__baseEndpoint, data)
        return r

    def get(self, accountId):
        r = self.__client.get(self.__baseEndpoint + "/" + accountId)
        return r

    def getAll(self):
        r = self.__client.get(self.__baseEndpoint)
        return r

    def update(self, accountId, name=None, email=None, company=None):
        data = {}
        if name is not None:
            data['name'] = name
        if email is not None:
            data['email'] = email
        if company is not None:
            data['company'] = company
        r = self.__client.put(self.__baseEndpoint + "/" + accountId, data)
        return r

    def delete(self, accountId):
        r = self.__client.delete(self.__baseEndpoint + "/" + accountId)
        return r