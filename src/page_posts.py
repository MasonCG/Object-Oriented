import mako.lookup
import mako.template
import os.path
import images
import random

#location of this file
lookup = mako.lookup.TemplateLookup(
    directories=[
        os.path.dirname(__file__),
        f"{os.path.dirname(__file__)}/../html"    
    ]
)

imgs = images.get_images()
img = random.choice(imgs)

def get():

    T = lookup.get_template("posts.html")
    return T.render(
        image=img
        )
    
