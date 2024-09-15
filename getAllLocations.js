//This file is used get all the locations in which BookMyShow operates and filter it by the movies playing

//Imports
import puppeteer  from "puppeteer";

async function getAllLocations(params) {
try{
   var url = "https://in.bookmyshow.com/";
   console.log("Fecthing: "+url);
    var browser = await puppeteer.launch({headless:true});
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    await page.goto(url, { waitUntil: 'networkidle2' });

    //Extract all the locations and push it into an array
    await page.click('#common-header-region span');
    await page.evaluate(() => {
        const spans = Array.from(document.querySelectorAll('span'));
        const targetSpan = spans.find(span => span.textContent.trim() === 'View All Cities');
        if (targetSpan) {
          targetSpan.click();
        }
      });
    const locations = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('li'))
        //   .filter(a => a.href.includes("bengaluru/movies"))
          .map(a => a.textContent);
      });
      return locations;
    }catch(e){
        console.log("Error in fetching locations: "+e);
    }
}

getAllLocations();