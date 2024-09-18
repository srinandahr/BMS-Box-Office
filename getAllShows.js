//This file is used to fetch all the available shows for a movie in a day in a particular city

//Imports
import puppeteer  from "puppeteer";
import { closeBrowser, gotoUrl } from "./lib/commonFunctions.js";

//For Testing only
var movieLink = "https://in.bookmyshow.com/bengaluru/movies/ibbani-tabbida-ileyali/ET00348158";

async function getAllShows(movieLink) {
  try{
    console.log("Fecthing: "+movieLink);
    var browser = await puppeteer.launch({headless:true});
    var page = await gotoUrl(movieLink, browser);

    //Click on Book tickets button to fetch all available shows for the day
    var [bookTicketsElement] = await page.$('*//button[@data-phase="postRelease"]');
    if(bookTicketsElement){
      bookTicketsElement[0].click();
    }
      //Get Date and Day
      var [element] = await page.$x('//div[@class="date-numeric"]');
      if (element) {
        var text = await page.evaluate(el => el.textContent.trim(), element);
        console.log(text);  // Output the extracted text
      }
      var [element] = await page.$x('//div[@class="date-month"]');
      if (element) {
        var text = await page.evaluate(el => el.textContent.trim(), element);
        console.log(text);  // Output the extracted text
      }
    }catch(e){
      console.log("Error in getting all shows: "+e);
    }
    

}
getAllShows(movieLink);