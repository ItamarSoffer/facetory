from fastapi import APIRouter, Depends, HTTPException
from ....backend.DAL.Implementation.facetory_mongo_dal import *

router = APIRouter(
    prefix="/Story",
    tags=["Story"],
    responses={404: {"description": "Not found"}},
)

@router.get("/GetStory")
def GetStory(int: id):
    return "HelloWorld"