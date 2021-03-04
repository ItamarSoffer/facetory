from fastapi import APIRouter, Depends, HTTPException
from src.backend.DAL.Implementation.facetory_mongo_dal import MongoDAL
from fastapi.responses import UJSONResponse
from src.backend.Utils import path_utils
from src.backend.Utils import picture_utils
from src.backend.Router.Users import user_api
import json

router = APIRouter(
    prefix="/Story",
    tags=["Story"],
    dependencies=[Depends(user_api.auth_required)],
    responses={404: {"description": "Not found"}},
)

# TODO: Get this from somewhere else.
dbDAL = MongoDAL()
# TODO: Translate a user_uid to user_uid in the DB

@router.post("/GetStories", response_class=UJSONResponse)
def get_all_stories(user_uid: str):
    try:
        all_stories = dbDAL.get_stories(user_uid=user_uid)

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
def create_story(user_uid: str, story_name: str, child_name: str, gender: str):
    try:
        story = dbDAL.insert_story(user_uid=user_uid, story_name=story_name, child_name=child_name, gender=gender)

        # Creating the relevent json to send in the response:
        return {"status": "success",
                "storyId": story.id}
    except:
        return {"status": "failed",
                "storyId": -1}

@router.post("/CreateStory", response_class=UJSONResponse)
def update_story(user_uid:str, story_id: int, story_name: str, child_name: str, gender: str):
    try:
        story = dbDAL.update_story(story_id=story_id, story_name=story_name, child_name=child_name, gender=gender)

        # Creating the relevent json to send in the response:
        return {"status": "success",
                "storyId": story.id}
    except:
        return {"status": "failed",
                "storyId": -1}

@router.post("/CreateStory", response_class=UJSONResponse)
def delete_story(user_uid:str, story_id: int):
    pass

@router.post("/GetSlides", response_class=UJSONResponse)
def get_slides(user_uid: str, story_id: int):
    try:
        story_slides = dbDAL.get_slides(story_id=story_id)

        # Creating the relevent json to send in the response.
        slide_list = []
        for slide in story_slides:
            response.append({"slideName": slide.slide_name,
                "slideId": slide.id,
                "text": slide.text,
                "audio_path": slide.audio_path,
                "picture_path": slide.picture_path})
        response = {"status": "success", "slides": slide_list}
    except:
         response = {"status": "failed", "slides": []}   
    return response

@router.post("/GetSlide", response_class=UJSONResponse)
def get_slide(user_uid: str, story_id: int, slide_id: int):
    try:
        slide = dbDAL.get_slide(slide_id=slide_id)
        # TODO: JSONIFY on the slide
        response = {"status": "success", "slide": slide}
    except:
         response = {"status": "failed", "slide": ""}   
    return response

@router.post("/GetStoryThumbnail", response_class=UJSONResponse)
def get_story_thumbnail(user_uid: str, story_id: int):
    try:
        story = dbDAL.get_slides(story_id=story_id)

        # Displaying the thumbnail of the first slide as the story's thumbnail
        first_slide_thumbnail = story.slides[0].thumbnail_path
        response = {"status":"success",
                "thumbnail": first_slide_thumbnail}
    except:
         response = {"status": "failed", "thumbnail": ""}   
    return response

@router.post("/GetSlidesThumbnails", response_class=UJSONResponse)
def get_slides_thumbnails(user_uid: str, story_id: int):
    try:
        story_slides = dbDAL.get_slides(story_id=story_id)

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
def save_slide(user_uid: str, story_id: str, data: str):
    try:
        jsonData = json.loads(data)
        # TODO get picture from url and save the picture
        picture_bytes, picture_name = picture_utils.get_picture_data(jsonData["imageUrl"])
        background_picture_path = path_utils.generate_resource_path(user_uid=user_uid, story_id=story_id, resource_type="Photos", resource_name=picture_name)        
        with open(background_picture_path, "wb+") as picture_file:
            picture_file.write(picture_bytes)
        thumbnail_path = picture_utils.create_picture_thumbnail(background_picture_path)

        backgroundColor = jsonData["backgroundColor"]
        # saving the background picture
        background_picture = dbDAL.insert_picture(path=background_picture_path,
            x=jsonData["imagePosition"]["x"],
            y=jsonData["imagePosition"]["y"],
            angle=jsonData["imageAngle"],
            size=jsonData["imageSize"])

        # This section allows for further pictures to be added in the future
        picture_id_list = []
        if (jsonData.get("pictures") != None):
            for picture in jsonData["pictures"]:
                picture_bytes, picture_name = picture["data"], picture["name"]
                picture_path = path_utils.generate_resource_path(user_uid=user_uid, story_id=story_id, resource_type="Photos", resource_name=picture_name)        
                with open(picture_path, "wb+") as picture_file:
                    picture_file.write(picture_bytes)

                # inserting the picture into the db.
                picture = dbDAL.insert_picture(path=picture_path, x=picture["x"], y=picture["y"], angle=picture["angle"], size=picture["size"])
                picture_id_list.append(picture.id)

        sticker_id_list = []
        for sticker in jsonData["stickers"]:
            sticker_name = sticker["name"]
            sticker_path = path_utils.generate_sticker_path(sticker_name)

            # inserting the sticker data into the db.
            sticker = dbDAL.insert_picture(path=sticker_path, x=sticker["x"], y=sticker["y"], angle=sticker["angle"], size=sticker["size"])
            sticker_id_list.append(sticker.id)

        # TODO: pass the thumb nail as well
        slide = dbDAL.insert_slide(path=background_picture_path,
            background_color=background_color,
            background_picture_id=background_picture.picture_id,
            pictures_list=picture_id_list + sticker_id_list)

        response = {"status":"success", "slideId": slide.id}
    except:
        response = {"status": "failed"}
    return response

@router.post("/SaveSlide", response_class=UJSONResponse)
def delete_slide(user_uid: str, slide_id: int):
    pass



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