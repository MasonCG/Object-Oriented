import mako.lookup
import mako.template
import os.path
import random

import images
import names

import datetime

#location of this file
lookup = mako.lookup.TemplateLookup(
    directories=[
        os.path.dirname(__file__),
        f"{os.path.dirname(__file__)}/../html"    
    ]
)

daysAgo = []
views = []
imgdict = images.get_images()
imgKeys = list(imgdict.keys())
random.shuffle(imgKeys)

for i in range(len(imgKeys)):
    daysAgo.append(random.randint(0, 365))

daysAgo.sort()

for i in range(len(imgKeys)):
    views.append(random.randint(0, 10000))

views.sort()

descriptions = [
    "A breakthrough in medical research promises a new treatment for a rare disease.",
    "A high-profile trial reached a verdict, sparking nationwide debate on social media.",
    "A wildfire in the western region forced thousands to evacuate, with firefighters working tirelessly to contain it.",
    "The stock market saw a sharp rise after unexpected positive economic data was released.",
    "A world-famous artist unveiled a controversial new exhibit that divided critics and fans alike.",
    "The first human mission to Mars completed a successful launch, marking a milestone in space exploration.",
    "A beloved author released a highly anticipated sequel to their best-selling novel.",
    "Floods in a coastal town caused significant damage, with rescue teams helping stranded residents.",
    "A groundbreaking film from an independent studio won multiple awards at an international film festival.",
    "An international sports event brought athletes from over 50 countries together to compete in various categories.",
    "A protest in the capital drew thousands, demanding action on pressing environmental issues.",
    "A tech startup raised millions in funding to develop its innovative approach to renewable energy."
]

description_dict= {}

for key in imgKeys:
    description_dict[key] = descriptions[imgKeys.index(key)]

random.shuffle(imgKeys)


def get():
    T = lookup.get_template("posts.html")
    random.shuffle(imgKeys)
    return T.render(
        name = names.get_name(),
        image= imgdict,
        postList = imgKeys,
        description = description_dict,
        lastPosted=daysAgo,
        views = views
        )

    
