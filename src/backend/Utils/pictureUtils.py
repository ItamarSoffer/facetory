from PIL import Image

def create_picture_thumbnail(image_path: str, thumbnail_output_path: str):
    # creating a object  
    image = Image.open(image_path)
    # TODO: Create configureable photo size
    MAX_SIZE = (100, 100) 
    
    image.thumbnail(MAX_SIZE) 
    
    # creating thumbnail 
    image.save(thumbnail_output_path) 
    image.show()

create_picture_thumbnail("src/Resources/Example.jpg", "src/Resources/ExampleThumbnail.jpg")