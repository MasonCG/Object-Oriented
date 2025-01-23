import mako.lookup
import mako.template
import os.path

#location of this file
lookup = mako.lookup.TemplateLookup(
    directories=[
        os.path.abspath(__file__),
        f"{os.path.abspath(__file__)}../html"    
    ]
)

def get():

    T = lookup.get_template("posts.html")
    return T.render()
    
