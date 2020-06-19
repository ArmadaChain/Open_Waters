class Account:

    __baseEndpoint = 'customers'
    __client = None

    def __init__(self, __client):
        self.__client = __client

    def create(self, username: str, email: str, name: str = None, company: str = None) -> dict:
        """ Create account

        :rtype: dict
        :param username: Username
        :param email: Email
        :param name: Name
        :param company: Company
        :return: Created account
        """
        data = {'username': username, 'email': email}
        if name is not None:
            data['name'] = name
        if company is not None:
            data['company'] = company
        r = self.__client.post(self.__baseEndpoint + '/', data)
        return r

    def get(self, account_id: str) -> dict:
        """ Get account

        :rtype: dict
        :param account_id: Account ID
        :return: Account information
        """
        r = self.__client.get(self.__baseEndpoint + "/" + account_id)
        return r

    def my_account(self) -> dict:
        """ Get own account

        :rtype: dict
        :return: Account information
        """
        r = self.__client.get(self.__baseEndpoint + '/my/account')
        return r

    def update(self, account_id: str, name: str = None, email: str = None, company: str = None) -> dict:
        """ Update account

        :rtype: dict
        :param account_id: Account ID
        :param name: Name
        :param email: Email
        :param company: Company
        :return: Updated account
        """
        data = {}
        if name is not None:
            data['name'] = name
        if email is not None:
            data['email'] = email
        if company is not None:
            data['company'] = company
        r = self.__client.put(self.__baseEndpoint + "/" + account_id, data)
        return r
