from abc import ABC, abstractmethod
from src.backend.DAL.facetory_dal import FacetoryDAL
from src.backend.mongo_db import *

from mongoengine import *


class MongoDAL(FacetoryDAL):
    DEFAULT_HOST = '127.0.0.1'
    DEFAULT_PORT = 27017
    DB_NAME = "tell_story"
    DEFAULT_ALIAS = "default_alias"

    def __init__(self, host: str = DEFAULT_HOST, port: int = DEFAULT_PORT):
        self.host = host
        self.port = port

    def insert_story(self, user_id: str, story_name: str, child_name: str, gender: str):
        with connect(MongoDAL.DB_NAME, host=self.host, port=self.port, alias=MongoDAL.DEFAULT_ALIAS):
            story = Story(story_name=story_name, child_name=child_name, gender=gender).save()
            user = AppUser.objects.get(id=user_id)
            user.stories.append(story)
            user.save()
        return story

    def update_story(self, story_id: str, story_name: str, child_name: str, gender: str):
        with connect(MongoDAL.DB_NAME, host=self.host, port=self.port, alias=MongoDAL.DEFAULT_ALIAS):
            story = Story.objects.get(id=story_id)
            story.story_name = story_name
            story.modify(story_name=story_name, child_name=child_name, gender=gender)
            story.save()
        return story

    def get_story(self, story_id: str):
        with connect(MongoDAL.DB_NAME, host=self.host, port=self.port, alias=MongoDAL.DEFAULT_ALIAS):
            return Slide.objects.get(id=story_id)

    def get_stories(self, user_id: str):
        with connect(MongoDAL.DB_NAME, host=self.host, port=self.port, alias=MongoDAL.DEFAULT_ALIAS):
            return AppUser.objects.get(id=user_id).stories

    def insert_slide(self, story_id: str, background_color: str, background_picture_id: str, pictures_list: list):
        with connect(MongoDAL.DB_NAME, host=self.host, port=self.port, alias=MongoDAL.DEFAULT_ALIAS):
            background_pic = Picture.objects.get(id=background_picture_id)
            story_slide = Slide(background_color=background_color, background_picture=background_pic).save()
            for picture_id in pictures_list:
                pic = Picture.objects.get(id=picture_id)
                story_slide.pictures.append(pic)
            story_slide.save()
            story = Story.objects.get(id=story_id)
            story.slides.append(story_slide)
        return story_slide

    def get_slide(self, slide_id: str):
        with connect(MongoDAL.DB_NAME, host=self.host, port=self.port, alias=MongoDAL.DEFAULT_ALIAS):
            return Slide.objects.get(id=slide_id)

    def get_slides(self, story_id: str):
        with connect(MongoDAL.DB_NAME, host=self.host, port=self.port, alias=MongoDAL.DEFAULT_ALIAS):
            return Slide.objects.get(id=story_id)

    def insert_picture(self, path: str, x: float, y: float, angle: float, size: float):
        with connect(MongoDAL.DB_NAME, host=self.host, port=self.port, alias=MongoDAL.DEFAULT_ALIAS):
            pic = Picture(path=path, angle=angle, size=size, coordinate_x=x, coordinate_y=y).save()
        return pic

    def insert_picture_to_slide(self, slide_id: str, path: str, x: float, y: float, angle: float, size: float):
        with connect(MongoDAL.DB_NAME, host=self.host, port=self.port, alias=MongoDAL.DEFAULT_ALIAS):
            pic = Picture(path=path, angle=angle, size=size, coordinate_x=x, coordinate_y=y).save()
            story_slide = Slide.objects.get(id=slide_id)
            story_slide.pictures.append(pic)
        return pic

    def get_picture(self, picture_id: str):
        with connect(MongoDAL.DB_NAME, host=self.host, port=self.port, alias=MongoDAL.DEFAULT_ALIAS):
            return Picture.objects.get(id=picture_id)

    def insert_user(self, google_id: str, username: str):
        with connect(MongoDAL.DB_NAME, host=self.host, port=self.port, alias=MongoDAL.DEFAULT_ALIAS):
            return AppUser(google_id=google_id, name=username).save()

    def get_user(self, google_id: str):
        with connect(MongoDAL.DB_NAME, host=self.host, port=self.port, alias=MongoDAL.DEFAULT_ALIAS):
            if AppUser.objects(google_id=google_id):
                return AppUser.objects.get(google_id=google_id)
