from abc import ABC, abstractmethod


class FacetoryDAL(ABC):
    @abstractmethod
    def insert_story(self, user_id: str, story_name: str, child_name: str, gender: str):
        pass

    @abstractmethod
    def update_story(self, story_id: str, story_name: str, child_name: str, gender: str):
        pass

    @abstractmethod
    def get_story(self, story_id: str):
        pass

    @abstractmethod
    def get_stories(self, user_id: str):
        pass

    @abstractmethod
    def insert_slide(self, story_id: str, background_color: str, background_picture_id: str, pictures_list: list[int],
                     thumbnail: str):
        pass

    @abstractmethod
    def get_slide(self, slide_id: str):
        pass

    @abstractmethod
    def get_slides(self, story_id: str):
        pass

    @abstractmethod
    def insert_picture(self, path: str, x: float, y: float, angle: float, size: float):
        pass

    @abstractmethod
    def insert_picture_to_slide(self, slide_id: str, path: str, x: float, y: float, angle: float, size: float):
        pass

    @abstractmethod
    def get_picture(self, picture_id: str):
        pass

    @abstractmethod
    def insert_user(self, google_id: str, username: str):
        pass

    @abstractmethod
    def get_user(self, google_id: str):
        pass
