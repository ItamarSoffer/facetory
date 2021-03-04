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
# TODO: Translate a user_token to user_id in the DB

@router.post("/GetStories", response_class=UJSONResponse)
def GetAllStories(user_token: str):
    try:
        all_stories = dbDAL.get_all_stories(user_token)

        # Creating the relevent json to send in the response:
        story_list = []
        for story in all_stories:
            response.append({"storyName": story.name,
                "storyId": story.id,
                "childName": story.child_name,
                "gender": story.gender,
                "thumbnail": story.thumbnail_path})
        response = {"status": "success", "stories": story_list}
    except:
        response = {"status": "failed", "stories": []}

    return response

@router.post("/CreateStory", response_class=UJSONResponse)
def CreateStory(user_token: str, story_name: str, child_name: str, gender: str):
    try:
        story = dbDAL.insert_story(user_token, story_name, child_name, gender)

        # Creating the relevent json to send in the response:
        return {"status": "success",
                "storyId": story.id})
    except:
        return {"status": "failed",
                "storyId": -1})

@router.post("/GetSlides", response_class=UJSONResponse)
def GetSlides(user_token: str, story_id: int):
    try:
        story_slides = dbDAL.get_slides(story_id)

        # Creating the relevent json to send in the response.
        slide_list = []
        for slide in story_slides:
            response.append("slideName": slide.slide_name,
                "slideId": slide.id,
                "text": slide.text,
                "audio_path": slide.audio_path,
                "picture_path": slide.picture_path})
        response = {"status": "success", "slides": slide_list}
    except:
         response = {"status": "failed", "slides": []}   
    return response

@router.post("/GetSlide", response_class=UJSONResponse)
def GetSlide(user_token: str, story_id: int, slide_id: int):
    try:
        slide = dbDAL.get_slide(slide_id)
        # TODO: JSONIFY on the slide
        response = {"status": "success", "slide": slide}
    except:
         response = {"status": "failed", "slide": ""}   
    return response

@router.post("/GetStoryThumbnail", response_class=UJSONResponse)
def GetStoryThumbnail(user_token: str, story_id: int):
    try:
        story = dbDAL.get_story(story_id)

        # Displaying the thumbnail of the first slide as the story's thumbnail
        first_slide_thumbnail = story.slides[0].thumbnail_path
        response = {"status":"success",
                "thumbnail": first_slide_thumbnail}
    except:
         response = {"status": "failed", "thumbnail": ""}   
    return response

@router.post("/GetSlidesThumbnails", response_class=UJSONResponse)
def GetSlidesThumbnails(user_token: str, story_id: int):
    try:
        story_slides = dbDAL.get_slides(story_id)

        # Creating the relevent json to send in the response:
        thumbnail_list = []
        for slide in story_slides:
            response.append({"slideId": slide.id,
                "thumbnail": slide.thumbnail})

        response =  {"status": "success",
                    "thumbnails": thumbnail_list}
    except:
         response = {"status": "failed", "thumbnail": ""}   
    return response

@router.post("/SaveSlide", response_class=UJSONResponse)
def SaveSlide(user_token: str, story_id: int, slide_id: int, background_picture: bytes, content: str):
    try:
        slider = dbDAL.create_slide(story_id, slide_id)
        response = {"status":"success", "slideId": slide.id}
    except:
        response = {"status": "failed"}
    return response