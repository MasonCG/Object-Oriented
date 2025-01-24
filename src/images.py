#taking images and storing them

import os

def get_images():
    imgs = []

    imgdir = f"{os.path.dirname(__file__)}/../html/media"


    for img in os.scandir(imgdir):
        if img.is_file():
            imgs.append(img)

    return imgs