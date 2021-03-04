  
import setuptools

requirements = [
    "fastapi",
    "uvicorn",
    "MongoEngine",
    "aiofiles",
    "ujson",
    "Pillow"
]

setuptools.setup(
    name="facetory",
    version="1.0",
    license="MIT",
    author="kks",
    packages=setuptools.find_packages(),
    install_requires=requirements,
)