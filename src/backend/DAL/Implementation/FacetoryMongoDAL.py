from abc import ABC, abstractmethod
from src.backend.DAL.FacetoryDAL import FacetoryDAL
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

    def get_password(self, username: str):
        with connect(MongoDAL.DB_NAME, host=self.host, port=self.port, alias=MongoDAL.DEFAULT_ALIAS):
            return AppUser.objects.get(username=username).password

    def get_stories(self, user_id: int):
        with connect(MongoDAL.DB_NAME, host=self.host, port=self.port, alias=MongoDAL.DEFAULT_ALIAS):
            return AppUser.objects.get(user_id=user_id).stories

    def insert_story(self, user_id: int, story_name: str, child_name: str, gender: str):
        with connect(MongoDAL.DB_NAME, host=self.host, port=self.port, alias=MongoDAL.DEFAULT_ALIAS):
            story = Story(user_id=user_id, story_name=story_name, child_name=child_name, gender=gender).save()
        return story

    def get_slides(self, user_id: int, story_id: int):
        with connect(MongoDAL.DB_NAME, host=self.host, port=self.port, alias=MongoDAL.DEFAULT_ALIAS):
            return Slide.objects(user_id=user_id, story_id=story_id)

    def get_slide_by_id(self, slide_id: int):
        with connect(MongoDAL.DB_NAME, host=self.host, port=self.port, alias=MongoDAL.DEFAULT_ALIAS):
            return Slide.objects(slide_id=slide_id)
