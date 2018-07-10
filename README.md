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

## Getting started
This documentation assumes that you've downloaded all the project files to your
local machine. To do that [click here](https://github.com/sguzik/Year-in-Review/archive/master.zip).
You can also download all the files by clicking "Clone or download" on the top
right corner of this page and using the .zip option.

The JSON creator script uses the programming language Python, which is installed
on Mac laptops by default. Using this script should not require any customization
or upgrading of Mac's default Python installation. 

## Using the JSON creator script
During the year, we record each editorial in a Google Spreadsheet. The JSON
Creator takes that information (downloaded as a CSV) and reformats it for use
with this project.

The editorials CSV *must* use the following format:

|Date      |Headline|URL           |Keyword1|Keyword2|
|----------|--------|--------------|--------|--------|
|YYYY-MM-DD|Hed     |http://www... |required|optional|

`Keyword1` is required, `Keyword2` is optional.

When you're ready to get started formatting the end of year directory, download
this entire folder to your computer.

Start by getting the editorial CSV from Google. Before downloading it, be sure
to clear any stray columns (for example, notes or alternate tags that were
being saved for future reference). Save the CSV to the `data` directory, with
the filename `editorials.csv`.

Once you've done that, open Terminal on your computer and navigate to the
correct directory. For example, if the project is in a folder called `2017` that
is saved to your desktop, type `cd ~/Desktop/2017/data` and then hit enter. You
should see the folder name (`data`) displayed at the start of the Terminal line.

Next, type `python json_creator.py` to run the JSON creator. If it works, you will
see a number and then a blank Terminal line. That number is the total of
editorials run last year. The file `data2017.json` will be created (or overwritten).

That file needs to get uploaded to Newsday's project server. Someone on the dev
team will be able to help you set that up. Rename it something logical
(`data2018.json`, for example) before uploading. Multiple directories can exist
for the same year (eg, columns and editorials), they just need to have different
file names for the JSON file.

## Other notes
* The project shouldn't require much styling from year to year, but design might
want to take a look in order to be sure nothing is out-dated on the site.
* The search is pretty fuzzy.