import mako.template
import os.path

#demo
import datetime

#location of this file
srcdir = os.path.dirname(__file__)

def get():
    T = mako.template.Template(filename=f"{srcdir}/../html/index.html")
    return T.render()
    
