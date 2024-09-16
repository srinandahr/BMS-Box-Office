// This file is used to fetch the names of the movies from all the locations where BMS provies their services

//Imports
import puppeteer from 'puppeteer';
import {gotoUrl, closeBrowser} from './lib/commonFunctions.js';

/*This function is used to get list of movie names, links and posters based on the Base Location of the Movie Language
Ex: Kannada -> Bengaluru */
async function getAllMovies(){
  try{
    var movieMap = new Map();
    var language = "Kannada";
    var location = "bengaluru";
    var type = "movies";
    var url = "https://in.bookmyshow.com/explore/"+type+"-"+location+"?languages="+language.toLowerCase();
    console.log("Fecthing: "+url);
    var browser = await puppeteer.launch({headless:true});
    var page = await gotoUrl(url, browser);
    

    //Extract List of Movies running in the Particular location
    const links = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('a'))
          .filter(a => a.href.includes("bengaluru/movies"))
          .map(a => a.outerHTML);
      });
      console.log("Count of "+ language +" Movies Runing:"+ links.length);
   
      
      //Loop through the Array to get Name, link, Certificate, poster and rating
      for(var i=0;i<links.length;i++){
        try{
            var movieLink = links[i].split('href="')[1].split('"')[0];
            var movieName = links[i].split('data-content="')[1].split('"')[0];
            var moviePoster = links[i].split('src="')[1].split('"')[0];
            movieMap.set(movieName, {movieLink, movieName, moviePoster});
        }
        catch{
            moviePoster = "";
            movieMap.set(movieName, {movieLink, movieName, moviePoster})
        }
      }
    await closeBrowser(browser);
    console.log(movieMap);
    return movieMap;
  }catch(e){
    console.log("Error in fetching all movies: "+e);
  }
}

getAllMovies();