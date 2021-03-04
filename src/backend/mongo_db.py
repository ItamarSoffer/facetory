from mongoengine import *

connect("tell_story")


class Picture(Document):
    picture_id = ObjectIdField()
    path = StringField(required=True)
    angle = FloatField(required=True)
    size = FloatField(required=True)
    coordinate_x = FloatField(required=True)
    coordinate_y = FloatField(required=True)


class Slide(Document):
    slide_id = ObjectIdField()
    background_color = StringField(required=True, max_length=50)
    background_picture = ReferenceField(Picture)
    pictures = ListField(ReferenceField(Picture))
    thumbnail = StringField(required=True)
    text = StringField(required=True)
    audio = StringField(required=True)


class Story(Document):
    story_id = ObjectIdField()
    name = StringField(required=True, max_length=50)
    child_name = StringField(required=True, max_length=50)
    gender = StringField(required=True)
    slides = ListField(ReferenceField(Slide))


class AppUser(Document):
    user_id = ObjectIdField()
    google_id = StringField()
    name = StringField(max_length=50, unique=True)
    stories = ListField(ReferenceField(Story))


def create_example():
    pictures = Picture(path='Example.jpg', angle=322, size=24, coordinate_x=23, coordinate_y=321)
    pictures.save()
    slide = Slide(background_color='#eb34cf', background_picture=pictures, pictures=[pictures], text='hello',
                  audio='Example.jpg', thumbnail='Example.jpg')
    slide.save()
    story = Story(name='lefasten', child_name='eliana', gender='girl', slides=[slide])
    story.save()
    app = AppUser(google_id='1231', name='eliana', stories=[story])
    app.save()


def create_db():
    con = connect("tell_story")
    db = con.get_database("tell_story")
    db.create_collection("tell_story")
    create_example()


if __name__ == '__main__':
    create_db()

