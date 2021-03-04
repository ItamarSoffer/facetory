import uvicorn
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from DAL.Implementation.facetory_mongo_dal import *
from Router.Stories import storyApi

app = FastAPI()
# Mounting the Resources folder in order to allow access to photos, audio and more.
app.mount("/Resources", StaticFiles(directory="src/Resources"), "Resources")

@app.get('/')
def home():
    return "Hello world"



if (__name__ == "__main__"):
    mongo = MongoDAL()
    uvicorn.run(app, host="127.0.0.1", port=8000, debug=True)