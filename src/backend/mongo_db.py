from mongoengine import *

connect("tell_story")


class Picture(Document):
    picture_id = ObjectIdField()
    path = StringField(required=True)
    angle = IntField(required=True)
    size = IntField(required=True)
    coordinate_x = IntField(required=True)
    coordinate_y = IntField(required=True)


class Slide(Document):
    slide_id = ObjectIdField()
    background_color = StringField(required=True, max_length=50)
    background_picture = ReferenceField(Picture)
    pictures = ListField(ReferenceField(Picture))
    text = StringField(required=True)
    audio = StringField(required=True)


class Story(Document):
    story_id = ObjectIdField()
    name = StringField(required=True, max_length=50)
    child_name = StringField(required=True, max_length=50)
    gender = StringField(required=True)
    thumbnail = StringField(required=True)
    slides = ListField(ReferenceField(Slide))


class AppUser(Document):
    user_id = ObjectIdField()
    name = StringField(max_length=50)
    password = StringField(max_length=50)
    stories = ListField(ReferenceField(Story))


def create_example():
    pictures = Picture(path='Example.jpg', angle=322, coordinat_x=23, coordinat_y=321)
    pictures.save()
    slide = Slide(background_color='#eb34cf', background_picture=pictures, pictures=[pictures], text='hello',
                  audio='Example.jpg')
    slide.save()
    story = Story(name='lefasten', child_name='eliana', gender='girl', thumbnail='Example.jpg', slides=[slide])
    story.save()
    app = AppUser(name='eliana', password='pass', stories=[story])
    app.save()


def create_db():
    con = connect("tell_story")
    db = con.get_database("tell_story")
    # db.create_collection("tell_story")
    create_example()


def return_user():
    print(AppUser.objects(user_id=1).count)


if __name__ == '__main__':
    create_db()
    return_user()
