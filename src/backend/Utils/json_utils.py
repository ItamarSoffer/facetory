import json

def format_slide_json(slide):
    print(slide)
    slide_json = {"slideId": str(slide.id),
        "background_color": slide.background_color,
        "background_picture": format_picture_json(slide.background_picture),
        "text": slide.text,
        "audio_path": slide.audio,
        "Thumbnail": slide.thumbnail,
        "picture": [format_picture_json(picture) for picture in slide.pictures]}
    return slide_json

def format_picture_json(picture):
    picture_json = json.loads(picture.to_json())
    picture_json["id"] = picture_json["_id"]["$oid"]
    del picture_json["_id"]
    return picture_json