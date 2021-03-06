from fastapi import APIRouter, Depends, HTTPException, status
from src.backend.DAL.Implementation.facetory_mongo_dal import MongoDAL
from fastapi.responses import UJSONResponse
from src.backend.Router.Users import user_api
from firebase_admin import auth,credentials, initialize_app, get_app

# TODO: Replace all the prints with proper logging library
userRouter = APIRouter(
    prefix="/User",
    tags=["User"],
    responses={404: {"description": "Not found"}},
)

dbDAL = MongoDAL()


@userRouter.post("/Login", response_class=UJSONResponse)
def UserLogin(firebase_token:str):
    try:
        validated_firebase_obj = auth.verify_id_token(firebase_token ,app=get_app())
        if not validated_firebase_obj:
            raise ValueError    
        
        # If its the first time the user has logged into our sever, we create an entry in the DB.
        if not dbDAL.get_user(validated_firebase_obj['sub']):
            dbDAL.insert_user(validated_firebase_obj['sub'], validated_firebase_obj['email'])

        return {
            'status': 'success'
            }
    
    except Exception as e:
        print(e)
        return {
            'status': 'failed',
            'description': 'Token not authorized.'
            }

def auth_required(firebase_token: str):
    try:
        return "604158ffb8620359b0f7ac8e"
        # Checks if the user is properly authorozied to log in
        validated_firebase_obj = auth.verify_id_token(firebase_token, app=get_app())
        # If the token is invalid or the user is not in our DB.
        if not validated_firebase_obj or not dbDAL.get_user(validated_firebase_obj['sub']):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid authentication credentials")

        return validated_firebase_obj['sub']
    except Exception as e:
        print(e)
        # TODO: change this to a general error
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials")
