from fastapi import APIRouter, Depends, HTTPException
from ....backend.DAL.Implementation.FacetoryMongoDAL import *
from os import urandom
from struct import unpack
from google.oauth2 import id_token
from google.auth.transport.requests import Request


router = APIRouter(
    prefix="/User",
    tags=["User"],
    responses={404: {"description": "Not found"}},
)

@router.post("/Login", response_class=UJSONResponse)
def UserLogin(firebase_token:str): # (username:str, password:str):
    try:
        # validated_firebase_obj = id_token.verify_firebase_token(firebase_token, Request())
        # if not validated_firebase_obj:
        #     raise ValueError    
        validated_firebase_obj = {}
        validated_firebase_obj['obj'] = firebase_token

        if not get_user_by_google_id(validated_firebase_obj['sub']):
            insert_user(validated_firebase_obj['sub'])

        # real_pass = get_password(username) # TODO: see working
        # if not user:
        #     # The user shouldn't know whether the password incorrect or the user does not exist
        #     return {
        #         'status': 'failed',
        #         'description': 'wrong user password or no such user'
        #         }
        # elif password != real_pass:
        #     return {
        #         'status': 'failed',
        #         'description': 'wrong user password or no such user'
        #         }

        # in_db = True
        # while in_db:
        #     user_id = unpack("<I", urandom(4))[0]
        #     in_db = user_id_in_db(user_id) # TODO: interface with real DB

        # add_user_id_to_db(user_id) # TODO: interface with real DB

        return {
            'status': 'success' # ,
            # 'userId': user_id
            }
    
    except Exception as e:
        return {
            'status': 'failed',
            'description': 'Token not authorized.'
            }

# Important notes:
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

def auth_required(func):
    def check_auth(firebase_token, *argv):
        try:
            # validated_firebase_obj = id_token.verify_firebase_token(firebase_token, Request())
            # if not validated_firebase_obj: # not userid_in_db(userId):
            #     return {
            #         "status": "unauthorized"
            #         "description": "User token is invalid"
            #     }
            validated_firebase_obj = {}
            validated_firebase_obj['sub'] = firebase_token
            return func(validated_firebase_obj['sub'], *argv)
        except Exception as e:
            return {
                "status": "unauthorized"
                "description": "User token is invalid"
            }