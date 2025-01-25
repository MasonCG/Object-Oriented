import mako.lookup
import mako.template
import os.path
import images
import random

import datetime

#location of this file
lookup = mako.lookup.TemplateLookup(
    directories=[
        os.path.dirname(__file__),
        f"{os.path.dirname(__file__)}/../html"    
    ]
)

imgdict = images.get_images()

def get():
    today=datetime.datetime.now()
    T = lookup.get_template("posts.html")
    return T.render(
        image= imgdict[random.choice(list(imgdict.keys()))],
        postList = imgdict.keys(),
        lastPosted=f"{today.month}/{today.day}/{today.year}",
        views = random.randint(5, 7842)
        )
    
