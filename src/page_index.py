import mako.template
import mako.lookup
import os.path
import random


#location of this file
lookup = mako.lookup.TemplateLookup(
    directories=[
        os.path.dirname(__file__),
        f"{os.path.dirname(__file__)}/../html"    
    ]
)

names = ["Mason", "Jimmy", "George", "Wally"]

def get():
    T = lookup.get_template("index.html")
    return T.render(name=random.choice(names))
