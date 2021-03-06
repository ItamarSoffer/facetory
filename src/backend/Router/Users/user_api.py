from fastapi import APIRouter, Depends, HTTPException
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

# TODO: Find a better way to seperate the Logins from the story api, 
# these functions should be in a different folder + file in order to organize the code better
@userRouter.post("/Login", response_class=UJSONResponse)
def UserLogin(firebase_token:str): # (username:str, password:str):
    try:
        validated_firebase_obj = auth.verify_id_token(firebase_token ,app=get_app())
        if not validated_firebase_obj:
            raise ValueError    

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

# TODO: Important notes:
# - One should implement an expiration of userIds, so that never logged out userId wouldn't stay in the db forever.
# - Can wrap user_id with JWT if you wish

# @router.post("/Logout", response_class=UJSONResponse)
# def UserLogout(user_id:int):
#     try:
#         if not remove_user_id_from_db(user_id): # TODO: interface with real db
#             # can add logic here, user shouldn't know whether the userId really existed, therefore returning success
#             return {
#                 'status': 'success'
#             }
#         return {
#             'status': 'success'
#         }
    
#     except Exception as e:
#         return {
#             'status': 'success'
#         }


def auth_required(firebase_token: str):
    try:
        # Checks if the user is properly authorozied to log in
        validated_firebase_obj = auth.verify_id_token(firebase_token, app=get_app())
        if not validated_firebase_obj: # not userid_in_db(userId):
            return False, {
                "status": "unauthorized",
                "description": "User token is invalid"
            }
        # validated_firebase_obj = {}
        # validated_firebase_obj['sub'] = firebase_token
        return True, validated_firebase_obj['sub']
    except Exception as e:
        print(e)
        return False, {
            "status": "unauthorized",
            "description": "User token is invalid, Unknown error"
        }
