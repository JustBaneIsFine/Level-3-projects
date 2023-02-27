
<h3 align="center">Level 3- Going deeper and learning new things</h3>

#### Projects
- [Web scraper](#web-scraper)
- [Car-scraper](#car-scraper) 


## Web scraper

- [About](#about-the-scraper)
- [**Video demonstration**](#video-demonstration)
- [**Prerequisites**](#prerequisites)
- [**Usage**](#usage)
- [Issues](#issues)

### About the scraper
-----
Scrapes used car websites for cars of chosen make/model/year.
Returns organized and sorted data.

#### Project was created with:
- [express](https://expressjs.com/)
- [puppeteer](https://pptr.dev/)
- [cheerio](https://cheerio.js.org/)
- [node.js](https://nodejs.org/en/)

Scrapes these two websites:
- [Polovni Automobili](https://www.polovniautomobili.com/)
- [Kupujem Prodajem](https://www.kupujemprodajem.com/)
-----
#### Features: 
- Can be sorted in many ways
- Last search is stored in the browsers local storage
- Can be exported to a txt file or google sheets
- Input validation, error handling etc.
- Any page that fails extraction will get 5 more tries
- No limits, can extract 100 pages
- Last update improved the speed a lot: Focused more on server responses instead of relying fully on puppeteer inputing data, waiting for stuff, which is slower.

-----
#### How it works
TLDR version:
- **step 1: Fetch input options, validate selected options and send to server**
- **step 2: Check for data availability and amount of data**
- **step 3: Gather all data and send to front**
- **step 4: Save data, sort and display**

-----
### Prerequisites
Everything you need in order for the scraper to work:
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [Node.js](https://nodejs.org/en/)
- Puppeteer, express, cheerio, etc. will be added automatically

### Usage

- Step 1: [Fork the entire project](https://github.com/JustBaneIsFine/JustBaneIsFine.github.io/fork) , or [download only the web-scraper project files.](https://download-directory.github.io/?url=https%3A%2F%2Fgithub.com%2FJustBaneIsFine%2FJustBaneIsFine.github.io%2Ftree%2Fmain%2Fapps%2FLevel+3%2FWeb+Scraper)
- Step 2: Open the Web-scraper folder and run `npm install`. This will download all the necessary packages.
- Step 3: run `npm start` and in your browser, type `http://localhost:3000/` and you should be good to go..
- Step 4: Enter data -> wait -> repeat step 4


#### Exporting to txt file..

- In order to export the data to txt, all you need to do is uncomment two lines of code in the handleData.js.
- And add the path where you want the file to be created (inside the writeToFile.js file)

``` javascript
// handleData.js file
import {writeToFile} from './writeToFile.js'
writeToFile(content)
```
#### Exporting to google spreadsheet
- Uncomment these two lines in the handleData.js file
```javascript
import {exportDataToSpreadsheet} from './exportToSpreadSheet.js';
exportDataToSpreadsheet(content);
```
- and follow [the instructions](https://developers.google.com/sheets/api/quickstart/nodejs);

### Issues

### **IMPORTANT NOTE:**
**I do not belive that these websites work outside of Europe,Serbia
So this may not work if you are outside this area..**
Because of that, i have created a short [video demonstration](#video-demonstration) of the scraper in action


At the time of posting this and testing it
the max time from data entry to display is about 2 minutes..
That's with a high internet speed and about 10 pages from each website..

### Video demonstration

https://youtu.be/JY5E0nMa6LU


## Car-scraper

Car scraper project has been moved to two seperate repos. And is considered a level 4 projects (Fullstack project)


[Car scraper front](https://github.com/JustBaneIsFine/car-scraper-front)

[Car scraper back](https://github.com/JustBaneIsFine/car-scraper-back)
