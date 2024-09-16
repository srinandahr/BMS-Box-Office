//This file is created to define all the common functions which can be reused

//Imports
// import puppeteer from 'puppeteer';

async function gotoUrl(url, browser){
    var page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    await page.goto(url, { waitUntil: 'networkidle2' });
    return page;
}

async function closeBrowser(browser) {
    await browser.close();
}

export {gotoUrl, closeBrowser}