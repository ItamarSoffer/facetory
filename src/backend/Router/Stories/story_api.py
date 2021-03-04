from fastapi import APIRouter, Depends, HTTPException
from src.backend.DAL.Implementation.facetory_mongo_dal import MongoDAL
from fastapi.responses import UJSONResponse
from src.backend.Utils import path_utils
from src.backend.Utils import picture_utils
from src.backend.Router.Users import user_api
from fastapi import APIRouter, Depends, HTTPException
from firebase_admin import auth,credentials, initialize_app
import pathlib
import json

router = APIRouter(
    prefix="/Story",
    tags=["Story"], 
    responses={404: {"description": "Not found"}},
)

# Realy bad code. Should only run once!! need to find a better way to do this.
# In addition we couldn't find a proper way to validate teh credentials in each function without 
# Repeating the code. The dependencies simple didn't work properly - Should probably return a temp unique
# Id to the user upon log-in.
cred = credentials.Certificate(r"src\backend\facetory_creds.json")
fb_ctx = initialize_app(cred)

userRouter = APIRouter(
    prefix="/User",
    tags=["User"],
    responses={404: {"description": "Not found"}},
)

# TODO: Get this from somewhere else.
dbDAL = MongoDAL()
# TODO: Translate a user_uid to user_uid in the DB

@router.post("/GetStories", response_class=UJSONResponse)
def get_all_stories(user_uid: str):
    auth_worked, user_uid = auth_required(user_uid)
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
def create_story(user_uid: str, story_name: str, child_name: str, gender: str):
    auth_worked, user_uid = auth_required(user_uid)
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
def update_story(user_uid:str, story_id: str, story_name: str, child_name: str, gender: str):
    auth_worked, user_uid = auth_required(user_uid)
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
def delete_story(user_uid:str, story_id: str):
    pass

@router.post("/GetSlides", response_class=UJSONResponse)
def get_slides(user_uid: str, story_id: str):
    auth_worked, user_uid = auth_required(user_uid)
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
<<<<<<< HEAD
            slide_list.append(
                {
                "slideId": str(slide.id),
                "e": slide.text,
                "thumbnail": slide.thumbnail,
                "audio_path": slide.audio,
                "picture_path": slide.pictures})
=======
            slide_list.append({"slideId": slide.id,
                "background_color": slide.background_color,
                "background_picture": slide.background_picture,
                "text": slide.text,
                "audio_path": slide.audio,
                "picture": slide.pictures})
            print(slide_list)
>>>>>>> 7b5a2bfb5bb45a41dca0d796187bf1d179c321af
        response = {"status": "success", "slides": slide_list}
    except Exception as e:
        response = {"status": "failed", "slides": []}   
    return response

@router.post("/GetSlide", response_class=UJSONResponse)
def get_slide(user_uid: str, story_id: str, slide_id: str):
    auth_worked, user_uid = auth_required(user_uid)
    if (not auth_worked):
        return {
                "status": "unauthorized",
                "description": "User token is invalid"
            }

    try:
        slide = dbDAL.get_slide(slide_id=slide_id)
        # TODO: JSONIFY on the slide
        response = {"status": "success", "slide": slide}
    except Exception as e:
        print(e)
        response = {"status": "failed", "slide": ""}   
    return response

@router.post("/GetStoryThumbnail", response_class=UJSONResponse)
def get_story_thumbnail(user_uid: str, story_id: str):
    auth_worked, user_uid = auth_required(user_uid)
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
def get_slides_thumbnails(user_uid: str, story_id: str):
    auth_worked, user_uid = auth_required(user_uid)
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

@router.post("/SaveSlide", response_class=UJSONResponse)
def save_slide(user_uid: str, story_id: str, data: str):
    auth_worked, user_uid = auth_required(user_uid)
    if (not auth_worked):
        return {
                "status": "unauthorized",
                "description": "User token is invalid"
            }

    try:
        jsonData = json.loads(data)
        # TODO get picture from url and save the picture
        picture_bytes, picture_name = picture_utils.get_picture_data(jsonData["imageUrl"])
        background_picture_path = path_utils.generate_resource_path(user_id=user_uid, story_id=story_id, resource_type="Photos", resource_name=picture_name)        
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
                picture_path = path_utils.generate_resource_path(user_id=user_uid, story_id=story_id, resource_type="Photos", resource_name=picture_name)        
                with open(picture_path, "wb+") as picture_file:
                    picture_file.write(picture_bytes)

                # inserting the picture into the db.
                picture = dbDAL.insert_picture(path=picture_path, x=picture["x"], y=picture["y"], angle=picture["angle"], size=picture["size"])
                picture_id_list.append(str(picture.id))

        sticker_id_list = []
        for sticker in jsonData["stickers"]:
            sticker_name = sticker["name"]
            sticker_path = path_utils.generate_sticker_path(sticker_name)

            # inserting the sticker data into the db.
            sticker = dbDAL.insert_picture(path=sticker_path, x=sticker["x"], y=sticker["y"], angle=sticker["angle"], size=sticker["size"])
            sticker_id_list.append(str(sticker.id))

        slide = dbDAL.insert_slide(path=background_picture_path,
            background_color=background_color,
            background_picture_id=background_picture.picture_id,
            pictures_list=picture_id_list + sticker_id_list,
            thumbnail_path=thumbnail_path)

        response = {"status":"success", "slideId": str(slide.id)}
    except Exception as e:
        print(e)
        response = {"status": "failed"}
    return response

@router.post("/SaveSlide", response_class=UJSONResponse)
def delete_slide(user_uid: str, slide_id: str):
    pass


# Find a better way to seperate the Logins from the story api.
@userRouter.post("/Login", response_class=UJSONResponse)
def UserLogin(firebase_token:str): # (username:str, password:str):
    try:
        validated_firebase_obj = auth.verify_id_token(firebase_token ,app=fb_ctx)
        if not validated_firebase_obj:
            raise ValueError    
        # validated_firebase_obj = {}
        # validated_firebase_obj['sub'] = firebase_token

        if not dbDAL.get_user(validated_firebase_obj['sub']):
            dbDAL.insert_user(validated_firebase_obj['sub'], validated_firebase_obj['email'])

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
        print(e)
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

def auth_required(firebase_token: str):
    try:
        validated_firebase_obj = auth.verify_id_token(firebase_token, app=fb_ctx)
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
