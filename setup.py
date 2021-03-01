  
import setuptools

requirements = [
    "fastapi",
    "uvicorn",
    "MongoEngine"
]

setuptools.setup(
    name="factory_server",
    version="1.0",
    license="MIT",
    author="kks",
    packages=['src'],
    install_requires=requirements,
)