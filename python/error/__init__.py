class Errors:

    @staticmethod
    def handle(err):
        return Exception(err.response.text)
