from setuptools import setup
from os import path
this_directory = path.abspath(path.dirname(__file__))
with open(path.join(this_directory, 'README.md'), encoding='utf-8') as f:
    long_description = f.read()
setup(
    name='open_waters',
    packages=['open_waters'],
    version='0.3',
    license='ISC',
    long_description=long_description,
    long_description_content_type='text/markdown',
    author='armada chain inc',
    author_email='kent@armadachain.io',
    url='https://github.com/ArmadaChain/Open_Waters/tree/master/python/package/open_waters',
    keywords=['hederahashgraph'],
    install_requires=[
        'requests'
    ],
    classifiers=[
        'Development Status :: 5 - Production/Stable',
        'License :: OSI Approved :: ISC License (ISCL)',
        'Programming Language :: Python :: 3.6',
    ],
)
