from mongoengine import *

connect("tell_story")


class AppUser(Document):
    user_id = IntField(required=True)
    name = StringField(max_length=50)
    password = StringField(max_length=50)
    stories = ListField()


class Slide(Document):
    slide_id = IntField(required=True)
    background_color = StringField(required=True, max_length=50)
    background_picture = ObjectIdField
    pictures = ListField(ObjectIdField)
    text = StringField(required=True, max_length=50)
    audio = ObjectIdField


class Story(Document):
    story_id = IntField(required=True)
    name = StringField(required=True, max_length=50)
    child_name = StringField(required=True, max_length=50)
    gender = StringField(required=True)
    slides = ListField(Slide)


class Pictures(Document):
    picture_id = ObjectIdField(required=True)
    path = StringField(required=True, max_length=50)
    angle = IntField(required=True)
    cordinate_x = IntField(required=True)
    cordinate_y = IntField(required=True)


def create_db():
    con = connect("tell_story")
    db = con.get_database("tell_story")
    # db.create_collection("tell_story")
    # my_user = AppUser(user_id=2)
    # my_user.save()


def return_user():
    print(AppUser.objects(user_id=2).count)


if __name__ == '__main__':
    create_db()
    return_user()
