from fastapi import APIRouter, Depends, HTTPException
from src.backend.DAL.FacetoryDAL import FacetoryDAL
from fastapi.responses import UJSONResponse

router = APIRouter(
    prefix="/Story",
    tags=["Story"],
    responses={404: {"description": "Not found"}},
)

# TODO: Get this from somewhere else.
dbDAL = FacetoryDAL()

@router.post("/GetStories", response_class=UJSONResponse)
def GetAllStories(user_id: int):
    try
    {
        all_stories = dbDAL.get_all_stories(user_id)

        # Creating the relevent json to send in the response:
        story_list = []
        for story in all_stories:
            response.append({"storyName": story.name,
                "storyId": story.id,
                "childName": story.child_name,
                "gender": story.gender,
                "thumbnail": story.thumbnail_path})
        response = {"status": "success", "stories": story_list}
    }
    except
    {
        response = {"status": "failed", "stories": []}
    }

    return response

@router.post("/CreateStory", response_class=UJSONResponse)
def CreateStory(user_token: str, story_name: str):
    try
    {
        story = dbDAL.CreateStory(user_token, story_name)

        # Creating the relevent json to send in the response:
        return {"status": "success",
                "storyId": story.id})
    }
    except
    {
        return {"status": "failed",
                "storyId": -1})
    }

@router.post("/GetSlides", response_class=UJSONResponse)
def GetSlides(user_token: str, story_id: int):
    try
    {
        story_slides = dbDAL.get_slides(user_token, story_id)

        # Creating the relevent json to send in the response:
        slide_list = []
        for slide in story_slides:
            response.append("slideName": slide.slide_name,
        "slideId": slide.id,
        "text": slide.text,
        "audio_path": slide.audio_path,
        "picture_path": slide.picture_path})
        response = {"status": "success", "slides": slide_list}
    }
    except
    {     
         response = {"status": "failed", "slides": []}   
    }
    return response