from PIL import Image
from os import path

def create_picture_thumbnail(image_path: str):
    # creating a object  
    image = Image.open(image_path)
    # TODO: Create configureable photo size
    MAX_SIZE = (100, 100) 
    
    image.thumbnail(MAX_SIZE) 
    
    # creating thumbnail 
    thumbnail_path = path.join(path.dirname(image_path), "Thumbnail_" + path.basename(image_path))
    image.save(thumbnail_path) 

    return thumbnail_path

create_picture_thumbnail("src/Resources/Example.jpg")