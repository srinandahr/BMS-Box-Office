//This file is used get all the locations in which BookMyShow operates and filter it by the movies playing

//Imports
import puppeteer  from "puppeteer";
import { closeBrowser, gotoUrl } from "./lib/commonFunctions.js";

async function getAllLocations(params) {
try{
   var url = "https://in.bookmyshow.com/";
   console.log("Fecthing: "+url);
    var browser = await puppeteer.launch({headless:true});
   var page = await gotoUrl(url, browser);

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
    await closeBrowser(browser);
    console.log(locations);
    return locations;
    }catch(e){
        console.log("Error in fetching locations: "+e);
    }
}

getAllLocations();