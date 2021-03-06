from fastapi import APIRouter, Depends, HTTPException
from src.backend.DAL.Implementation.facetory_mongo_dal import MongoDAL
from fastapi.responses import UJSONResponse
from src.backend.Utils import path_utils, picture_utils, json_utils
from src.backend.Router.Users.user_api import auth_required
import pathlib
import json

router = APIRouter(
    prefix="/Story",
    tags=["Story"], 
    # TODO: should read about how to properly add the auth_required for all the functions.
    #dependencies=[Depends(auth_required)],
    responses={404: {"description": "Not found"}},
)

# TODO: Get this from somewhere else.
dbDAL = MongoDAL()
# TODO: Translate a user_uid to user_uid in the DB

@router.post("/GetStories", response_class=UJSONResponse)
def get_all_stories(firebase_token: str):
    # TODO: This code gets repeated in each function. It happens because
    # the identification doesn't work 100%, It should be a dependency(Read about FastAPI).
    # We shouldn't relay on the user_uid that is written inside the decoded xtoken.
    auth_worked, user_uid = auth_required(firebase_token)
    if (not auth_worked):
        return {
                "status": "unauthorized",
                "description": "User token is invalid"
            }
    try:
        all_stories = dbDAL.get_stories(user_id=user_uid)

        # Creating the relevent json to send in the response:
        story_list = []
        for story in all_stories:
            story_list.append({"storyName": story.name,
                "storyId": str(story.id),
                "childName": story.child_name,
                "gender": story.gender,
                "thumbnail": story.thumbnail_path})
        response = {"status": "success", "stories": story_list}
    except Exception as e:
        print(e)
        response = {"status": "failed", "stories": []}

    return response

@router.post("/CreateStory", response_class=UJSONResponse)
def create_story(firebase_token: str, story_name: str, child_name: str, gender: str):
    auth_worked, user_uid = auth_required(firebase_token)
    if (not auth_worked):
        return user_uid
    try:
        story = dbDAL.insert_story(user_id=user_uid, story_name=story_name, child_name=child_name, gender=gender)

        # Creating the relevent json to send in the response:
        return {"status": "success",
                "storyId": str(story.id)}
    except Exception as e:
        print(e)
        return {"status": "failed",
                "storyId": -1}

@router.post("/UpdateStory", response_class=UJSONResponse)
def update_story(firebase_token:str, story_id: str, story_name: str, child_name: str, gender: str):
    auth_worked, user_uid = auth_required(firebase_token)
    if (not auth_worked):
        return {
                "status": "unauthorized",
                "description": "User token is invalid"
            }
    try:
        story = dbDAL.update_story(story_id=story_id, story_name=story_name, child_name=child_name, gender=gender)

        # Creating the relevent json to send in the response:
        return {"status": "success",
                "storyId": str(story.id)}

    except Exception as e:
        print(e)
        return {"status": "failed",
                "storyId": -1}

@router.post("/CreateStory", response_class=UJSONResponse)
def delete_story(firebase_token:str, story_id: str):
    # TODO: Implement this
    pass

@router.post("/GetSlides", response_class=UJSONResponse)
def get_slides(firebase_token: str, story_id: str):
    auth_worked, user_uid = auth_required(firebase_token)
    if (not auth_worked):
        return {
                "status": "unauthorized",
                "description": "User token is invalid"
            }

    try:
        story_slides = dbDAL.get_slides(story_id=story_id)
        # Creating the relevant json to send in the response.
        slide_list = []
        for slide in story_slides:
            slide_list.append(json_utils.format_slide_json(slide))
        response = {"status": "success", "slides": slide_list}
    except Exception as e:
        response = {"status": "failed", "slides": []}   
    return response

@router.post("/GetSlide", response_class=UJSONResponse)
def get_slide(firebase_token: str, slide_id: str):
    auth_worked, user_uid = auth_required(firebase_token)
    if (not auth_worked):
        return {
                "status": "unauthorized",
                "description": "User token is invalid"
            }

    try:
        slide = dbDAL.get_slide(slide_id=slide_id)
        response = {"status": "success", "slide": json_utils.format_slide_json(slide)}
    except Exception as e:
        print(e)
        response = {"status": "failed", "slide": ""}   
    return response

@router.post("/GetStoryThumbnail", response_class=UJSONResponse)
def get_story_thumbnail(firebase_token: str, story_id: str):
    auth_worked, user_uid = auth_required(firebase_token)
    if (not auth_worked):
        return {
                "status": "unauthorized",
                "description": "User token is invalid"
            }

    try:
        story = dbDAL.get_slides(story_id=story_id)

        # Displaying the thumbnail of the first slide as the story's thumbnail
        first_slide_thumbnail = story.slides[0].thumbnail_path
        response = {"status":"success",
                "thumbnail": first_slide_thumbnail}
    except Exception as e:
        print(e)
        response = {"status": "failed", "thumbnail": ""}   
    return response

@router.post("/GetSlidesThumbnails", response_class=UJSONResponse)
def get_slides_thumbnails(firebase_token: str, story_id: str):
    auth_worked, user_uid = auth_required(firebase_token)
    if (not auth_worked):
        return {
                "status": "unauthorized",
                "description": "User token is invalid"
            }

    try:
        story_slides = dbDAL.get_slides(story_id=story_id)

        # Creating the relevent json to send in the response:
        thumbnail_list = []
        for slide in story_slides:
            thumbnail_list.append({"slideId": str(slide.id),
                "thumbnail": slide.thumbnail})

        response =  {"status": "success",
                    "thumbnails": thumbnail_list}
    except Exception as e:
        print(e)
        response = {"status": "failed", "thumbnail": ""}   
    return response

# TODO: This function can be shortened
@router.post("/SaveSlide", response_class=UJSONResponse)
def save_slide(firebase_token: str, story_id: str, data: str):
    auth_worked, user_uid = auth_required(firebase_token)
    if (not auth_worked):
        return {
                "status": "unauthorized",
                "description": "User token is invalid"
            }
    jsonData = json.loads(data)
    picture_bytes, picture_name = picture_utils.get_picture_data(jsonData["imageUrl"])
    background_picture_path = path_utils.generate_resource_path(user_id=user_uid, story_id=story_id, resource_type="Photos", resource_name=picture_name)        
    with open(background_picture_path, "wb+") as picture_file:
        picture_file.write(picture_bytes)
    thumbnail_path = picture_utils.create_picture_thumbnail(background_picture_path)

    # Add support for audio_path(Simply read from the json)
    audio_path = ""
    text =  jsonData["text"]
    # saving the background picture in the db
    background_color = jsonData["backgroundColor"]
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
            picture_path = path_utils.generate_resource_path(user_id=user_uid, story_id=story_id, resource_type="Photos", resource_name=picture_name)        
            with open(picture_path, "wb+") as picture_file:
                picture_file.write(picture_bytes)

            # inserting the picture into the db.
            picture = dbDAL.insert_picture(path=picture_path, x=picture["x"], y=picture["y"], angle=picture["angle"], size=picture["size"])
            picture_id_list.append(str(picture.id))

    # The stickers don't need any special treatment as they are originally saved on the server.
    sticker_id_list = []
    for sticker in jsonData["stickers"]:
        sticker_name = sticker["name"]
        sticker_path = path_utils.generate_sticker_path(sticker_name)

        # inserting the sticker data into the db.
        sticker = dbDAL.insert_picture(path=sticker_path, x=sticker["x"], y=sticker["y"], angle=sticker["angle"], size=sticker["size"])
        sticker_id_list.append(str(sticker.id))

    slide = dbDAL.insert_slide(story_id=story_id,
        background_color = background_color,
        background_picture_id = background_picture.id,
        pictures_list = picture_id_list + sticker_id_list,
        text = text,
        audio_path = audio_path,
        thumbnail_path = thumbnail_path)

    response = {"status":"success", "slideId": str(slide.id)}
    #except Exception as e:
    #    print(e)
    #    response = {"status": "failed"}
    return response

@router.post("/SaveSlide", response_class=UJSONResponse)
def delete_slide(firebase_token: str, slide_id: str):
    # TODO: Implement this
    pass