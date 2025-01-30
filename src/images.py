#taking images and storing them

import os
import random

def get_images():
    imgs = []
    imgdict = {}

    imgdir = f"{os.path.dirname(__file__)}/../html/media"
    keys = [
          "Crashing out", 
          "I'm Bored!!", 
          "Live, Laugh, Loathe.", 
          "I Don't like it here", 
          "Please find someone else", 
          "Tired of work", "Stop crime", 
          "OH how they have fallen", 
          "ERM!!!", 
          "Ummm...", 
          "That's nice", 
          "thats not nice", 
          "Today is the day", 
          "Breaking!!!", 
          "World on fire!"
          ]

    for img in os.listdir(imgdir):
            if img == '.DS_Store':
                  continue
            key = random.choice(keys)
            imgdict[key] = img
            keys.remove(key)

    return imgdict

