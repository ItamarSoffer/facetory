  
import setuptools

requirements = [
    "fastapi",
    "uvicorn",
    "MongoEngine",
    "aiofiles",
<<<<<<< HEAD:setup.py
    "ujson",
    "Pillow"
=======
    # "os",
    # "struct",
    "google-oauth2-tool",
    "google-oauth"
>>>>>>> e5151200ea813e8272657c857d4ef19b3392e7de:src/backend/setup.py
]

setuptools.setup(
    name="facetory",
    version="1.0",
    license="MIT",
    author="kks",
    packages=setuptools.find_packages(),
    install_requires=requirements,
)