import uvicorn
from fastapi import FastAPI
from DAL.Implementation.FacetoryMongoDAL import *

app = FastAPI()

@app.get('/')
def home():
    return "Hello world"

if (__name__ == "__main__"):
    mongo = MongoDAL()
    uvicorn.run(app, host="127.0.0.1", port=8000, debug=True)