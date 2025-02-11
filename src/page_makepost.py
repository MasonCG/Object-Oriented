import mako.template
import mako.lookup
import os.path
import names

#location of this file
lookup = mako.lookup.TemplateLookup(
    directories=[
        os.path.dirname(__file__),
        f"{os.path.dirname(__file__)}/../html"    
    ]
)

def get(name):
    T = lookup.get_template("makepost.html")
    return T.render(name=name)
