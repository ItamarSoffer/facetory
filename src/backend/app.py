import uvicorn
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from DAL.Implementation.facetory_mongo_dal import *
from Router.Stories import story_api
from Router.Users import user_api
from firebase_admin import auth,credentials, initialize_app

app = FastAPI()
# Mounting the Resources folder in order to allow access to photos, audio and more.
app.mount("/Resources", StaticFiles(directory="Resources"), "Resources")
app.include_router(story_api.router)
app.include_router(user_api.userRouter)

# Initializing the credentials and the private key for the firebase authentication.
cred = credentials.Certificate(r"src\backend\facetory_creds.json")
fb_ctx = initialize_app(cred)

@app.get('/')
def home():
    return "Hello world"

if (__name__ == "__main__"):
    uvicorn.run(app, host="127.0.0.1", port=8000, debug=True)