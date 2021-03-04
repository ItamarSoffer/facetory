from sys import path

def generate_resource_path(user_id: str, story_id: str, resource_type: str, resource_name: str):
    return path.join("Resources", "User_" + user_id, "Story_" + story_id, resource_type, )