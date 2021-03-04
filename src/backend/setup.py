  
import setuptools

requirements = [
    "fastapi",
    "uvicorn",
    "MongoEngine",
    "aiofiles",
    # "os",
    # "struct",
    "google-oauth2-tool",
    "google-oauth"
]

setuptools.setup(
    name="factory_server",
    version="1.0",
    license="MIT",
    author="kks",
    packages=setuptools.find_packages(),
    install_requires=requirements,
)