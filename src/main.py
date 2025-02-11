import cherrypy
import os.path
import mako.template
import mako.lookup

#we have modules for each page we're displaying 
import page_index
import page_header
import page_signup
import page_posts
import page_makepost

import names

#the location where the main.py file is stored: The src folder

lookup = mako.lookup.TemplateLookup(
    directories=[
        os.path.dirname(__file__),
        f"{os.path.dirname(__file__)}/../html"
    ]
)

baseDir = os.path.abspath(os.path.dirname(__file__))

class App:
    @cherrypy.expose
    def index(self):
        return page_index.get(names.get_name())
    @cherrypy.expose
    def header(self):
        return page_header.get(names.get_name())
    @cherrypy.expose
    def signup(self):
        return page_signup.get(names.get_name())
    @cherrypy.expose
    def posts(self):
        return page_posts.get(names.get_name())
    @cherrypy.expose
    def makepost(self):
        return page_makepost.get(names.get_name())

    @cherrypy.expose
    @cherrypy.tools.json_out()
    def do_update(self, title, caption, pic):
        print(title)
        print(caption)
        print(pic)
        return {"ok": True }


app = App()
cherrypy.quickstart(
    app,
    '/',
    {
        "/html": {
            "tools.staticdir.on": True,
            "tools.staticdir.dir": f"{baseDir}/../html"
        }
    }
)
