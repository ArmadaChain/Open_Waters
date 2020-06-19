class Errors:

    def __init__(self):
        pass

    @staticmethod
    def handle(err):
        return Exception(err.response.text)
