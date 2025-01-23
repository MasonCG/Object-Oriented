import cherrypy
import os.path
import mako.template
import mako.lookup

#we have modules for each page we're displaying 
import page_index
import page_signup
import page_posts

#the location where the main.py file is stored: The src folder

lookup = mako.lookup.TemplateLookup(
    directories=[
        os.path.dirname(__file__),
        f"{os.path.dirname(__file__)}/../html"
    ]
)

class App:
    @cherrypy.expose
    def index(self):
        return page_index.get()
    @cherrypy.expose
    def signup(self):
        return page_signup.get()
    @cherrypy.expose
    def posts(self):
        return page_posts.get()

app = App()
cherrypy.quickstart(
    app,
    '/',
    {
        "/html": {
            "tools.staticdir.on": True,
            "tools.staticdir.dir": f"{os.path.abspath(__file__)}/../html"
        }
    }
)
