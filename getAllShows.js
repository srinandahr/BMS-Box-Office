//This file is used to fetch all the available shows for a movie in a day in a particular city

//Imports
import puppeteer  from "puppeteer";
import { closeBrowser, gotoUrl } from "./lib/commonFunctions.js";

//For Testing only
var movieLink = "https://in.bookmyshow.com/bengaluru/movies/ibbani-tabbida-ileyali/ET00348158";

async function getAllShows(movieLink) {
    console.log("Fecthing: "+movieLink);
    var browser = await puppeteer.launch({headless:true});
    var page = await gotoUrl(movieLink, browser);

    //Click on Book tickets button to fetch all available shows for the day
    await page.evaluate(() => {
        const spans = Array.from(document.querySelectorAll('span'));
        const targetSpan = spans.find(span => span.textContent.trim() === 'Book tickets');
        if (targetSpan) {
          targetSpan.click();
        }
      });
      //Get Date and Day
      var [element] = await page.$$('//div[@class="date-numeric"]');
      if (element) {
        var text = await page.evaluate(el => el.textContent.trim(), element);
        console.log(text);  // Output the extracted text
      }
      var [element] = await page.$$('//div[@class="date-month"]');
      if (element) {
        var text = await page.evaluate(el => el.textContent.trim(), element);
        console.log(text);  // Output the extracted text
      }
    

}
getAllShows(movieLink);