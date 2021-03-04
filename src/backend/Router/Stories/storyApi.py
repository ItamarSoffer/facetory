from fastapi import APIRouter, Depends, HTTPException
from src.backend.DAL.FacetoryDAL import FacetoryDAL

router = APIRouter(
    prefix="/Story",
    tags=["Story"],
    responses={404: {"description": "Not found"}},
)

@router.get("/GetStory")
def GetStory(int: id):
    return "HelloWorld"