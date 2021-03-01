  
import setuptools

requirements = [
    "Flask",
    "MongoEngine"
]

setuptools.setup(
    name="factory_server",
    version="1.0",
    license="MIT",
    author="kks",
    packages=['backend'],
    install_requires=requirements,
)