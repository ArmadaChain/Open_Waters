class Safe:

    def __init__(self):
        pass

    @staticmethod
    def safe_class(obj, enabled):
        def assert_name(name):
            if name not in enabled:
                raise KeyError('No attribute %s' % name)

        class Caller(object):
            def __getattribute__(self, name):
                assert_name(name)
                return getattr(obj, name)

            def __setattr__(self, name, val):
                assert_name(name)
                setattr(obj, name, val)

        c = Caller()
        return c
