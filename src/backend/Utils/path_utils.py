from sys import path

def generate_resource_path(user_id: str, story_id: str, resource_type: str, resource_name: str):
    return path.join("Resources", "User_" + user_id, "Story_" + story_id, resource_type, resource_name)


def generate_sticker_path(user_id: str, sticker_name: str):
    return path.join("Resources", "Stickers", sticker_name)