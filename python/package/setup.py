from distutils.core import setup

setup(
    name='open_waters',
    packages=['open_waters'],
    version='0.1',
    license='ISC',
    description='Open Waters allows simple integration of decentralized Hedera Hashgraph technology into existing '
                'projects using the Armada Platform',
    author='armada chain inc',
    author_email='kent@armadachain.io',
    url='https://github.com/ArmadaChain/Open_Waters/tree/master/python/package',
    download_url='https://github.com/user/reponame/archive/v_01.tar.gz',  # I explain this later on
    keywords=['hederahashgraph'],
    install_requires=[
        'requests'
    ],
    classifiers=[
        'Development Status :: 5 - Production/Stable',
        'Intended Audience :: Developers',
        'Topic :: Supply Chain :: Hederahashgraph:: Decentralization:: Dlt:: Blockchain',
        'License :: ISC',
        'Programming Language :: Python :: 3.6',
    ],
)
