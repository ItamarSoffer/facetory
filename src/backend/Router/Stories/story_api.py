from fastapi import APIRouter, Depends, HTTPException
from src.backend.DAL.Implementation.facetory_mongo_dal import MongoDAL
from fastapi.responses import UJSONResponse
from src.backend.Utils import path_utils
from src.backend.Utils import picture_utils
import json

router = APIRouter(
    prefix="/Story",
    tags=["Story"],
    responses={404: {"description": "Not found"}},
)

# TODO: Get this from somewhere else.
dbDAL = MongoDAL()
# TODO: Translate a user_token to user_id in the DB

@router.post("/GetStories", response_class=UJSONResponse)
def get_all_stories(user_token: str):
    try:
        all_stories = dbDAL.get_stories(user_id=user_token)

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
def creat_story(user_token: str, story_name: str, child_name: str, gender: str):
    try:
        story = dbDAL.insert_story(user_id=user_token, story_name=story_name, child_name=child_name, gender=gender)

        # Creating the relevent json to send in the response:
        return {"status": "success",
                "storyId": story.id}
    except:
        return {"status": "failed",
                "storyId": -1}

@router.post("/CreateStory", response_class=UJSONResponse)
def update_story(user_token:str, story_id: int, story_name: str, child_name: str, gender: str):
    try:
        story = dbDAL.update_story(story_id, story_name, child_name, gender)

        # Creating the relevent json to send in the response:
        return {"status": "success",
                "storyId": story.id})
    except:
        return {"status": "failed",
                "storyId": -1})

@router.post("/GetSlides", response_class=UJSONResponse)
def get_slides(user_token: str, story_id: int):
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
def get_slide(user_token: str, story_id: int, slide_id: int):
    try:
        slide = dbDAL.get_slide(slide_id)
        # TODO: JSONIFY on the slide
        response = {"status": "success", "slide": slide}
    except:
         response = {"status": "failed", "slide": ""}   
    return response

@router.post("/GetStoryThumbnail", response_class=UJSONResponse)
def get_story_thumbnail(user_token: str, story_id: int):
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
def get_slides_thumbnails(user_token: str, story_id: int):
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
def save_slide(user_token: str, story_id: str, data: str):
    try:
        jsonData = json.loads(data)
        # TODO get picture from url and save the picture
        picture_bytes, picture_name = picture_from_url(jsonData["imageUrl"])
        background_picture_path = path_utils.generate_resource_path(user_id=user_token, story_id=story_id, resource_type="Photos" resource_name=picture_name)        
        open(background_picture_path, "wb").write(picture_bytes).close()

        backgroundColor = jsonData["backgroundColor"]
        # saving the background picture
        picture = dbDAL.insert_picture(background_picture_path,
            jsonData["imagePosition"]["x"],
            jsonData["imagePosition"]["y"],
            jsonData["imageAngle"],
            jsonData["imageSize"])

        # This section allows for further pictures to be added in the future
        if (jsonData.get("pictures") != None):
            picture_id_list = []
            for picture in jsonData["pictures"]:
                picture_bytes, picture_name = picture["data"], picture["name"]
                picture_path = path_utils.generate_resource_path(user_id=user_token, story_id=story_id, resource_type="Photos" resource_name=picture_name)        
                open(picture_path, "wb").write(picture_bytes).close()

                # inserting the picture into the db.
                picture = dbDAL.insert_picture(picture_path, picture["x"], picture["y"], picture["angle"], picture["size"])
                picture_id_list.append(picture.id)

        sticker_id_list = []
        for sticker in jsonData["stickers"]:
            sticker_name = sticker["name"]
            sticker_path = path_utils.generate_sticker_path(sticker_name)

            # inserting the sticker data into the db.
            sticker = dbDAL.insert_picture(sticker_path, sticker["x"], sticker["y"], sticker["angle"], sticker["size"])
            sticker_id_list.append(sticker.id)

        slide = dbDAL.insert_slide(background_picture_path, image_position["x"], image_position["y"], image_angle, image_size)

        response = {"status":"success", "slideId": slide.id}
    except:
        response = {"status": "failed"}
    return response
)

"""
{imageUrl: string,
backgroundColor: string,
imagePosition: {x: int, y: int},
imageAngle: int,
imageSize: int,
pictures: [{
    name: str,
    data: blob,
    x: int,
    y: int,
    angle: int
    size: int
}]
stickers: [{
src: string,
x: int,
y: int,
size: int,
angle: int
}]
}"""