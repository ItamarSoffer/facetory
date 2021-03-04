from os import path, makedirs
import errno

def generate_resource_path(user_id: str, story_id: str, resource_type: str, resource_name: str):
    file_name =  path.join("Resources", "User_" + user_id, "Story_" + story_id, resource_type, resource_name)
    if not path.exists(path.dirname(file_name)):
        try:
            makedirs(path.dirname(file_name))
        except OSError as exc: # Guard against race condition
            if exc.errno != errno.EEXIST:
                raise
    return file_name


def generate_sticker_path(sticker_name: str):
    return path.join("Resources", "Stickers", sticker_name)