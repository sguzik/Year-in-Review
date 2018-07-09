# Editorial Year in Review
This project displays all of the topics Newsday's editorial board wrote about in 2017.

Live version: https://projects.newsday.com/opinion/editorials-year-review-2017/

## Project overview
This project was first used in 2017 as a way to showcase every position Newsday's
editorial board took during the year (and to encourage reader interaction around
those arguments).

Parts of this project:
1. The basic page that lives in Newsday's WordPress projects environment. In this
directory, that's represented by `index.html`.
2. The Python script that converts the editorial directory CSV into a JSON file.
That lives at `data/json_creator.py`. It is run from your local machine and
outputs a JSON file (that gets uploaded to Newsday's projects server).
3. JavaScript file, `js/main.js`, that loads headlines and links form the JSON
file into the furniture that's in the HTML page.

The project also uses Isotope, a JavaScript library, to handle layout.
