from fastapi import APIRouter, Depends, HTTPException
from ....backend.DAL.Implementation.FacetoryMongoDAL import *
from os import urandom
from struct import unpack

router = APIRouter(
    prefix="/User",
    tags=["User"],
    responses={404: {"description": "Not found"}},
)

@router.post("/Login")
def UserLogin(username:str, password:str):
    user = query_user(username) # TODO: interface with real DB
    # The user shouldn't know whether the password incorrect or the user does not exist
    if not user:
        return {
            'status': 'fail',
            'description': 'wrong user password or no such user'
            }
    elif password != user.password:
        return {
            'status': 'fail',
            'description': 'wrong user password or no such user'
            }

    in_db = True
    while in_db:
        user_id = unpack("<I", urandom(4))[0]
        in_db = user_id_in_db(user_id) # TODO: interface with real DB

    add_user_id_to_db(user_id) # TODO: interface with real DB

    return {
        'status': 'success',
        'userId': user_id
        }

# Important notes:
# - One should implement an expiration of userIds, so that never logged out userId wouldn't stay in the db forever.
# - Can wrap user_id with JWT if you wish

@router.post("/Logout")
def UserLogout(user_id:int):
    if not remove_user_id_from_db(user_id): # TODO: interface with real db
        # can add logic here, user shouldn't know whether the userId really existed, therefore returning success
        return {
            'status': 'success'
        }
    return {
        'status': 'success'
    }