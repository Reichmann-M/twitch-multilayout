const puppeteer = require('puppeteer');

module.exports.getLiveChannels = async (sCategoryAbbr) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
  
    let categoryUrl;
    //TODO: add support for different categories apart from gta san
    // TODO: load _storage JSON for category links ("grand-theft-auto-san-andreas")
    if (sCategoryAbbr === "6521") {
        categoryUrl = 'https://www.twitch.tv/directory/category/grand-theft-auto-san-andreas';
    } else {
        categoryUrl = 'https://www.twitch.tv/directory/category/pools-hot-tubs-and-beaches';
    }
    await page.goto(categoryUrl);
    // Wait for the page to load and display the live channels
    await page.waitForSelector('p[data-a-target="preview-card-channel-link"]');
  
    // Extract the channel names
    // Select the elements
    const elements = await page.$$('p[data-a-target="preview-card-channel-link"]');
    
    // Do something with the elements
    const elementTexts = await Promise.all(elements.map(element => page.evaluate(el => el.textContent, element)));
    console.log('Element Texts:', elementTexts);
  
    await browser.close();
    return elementTexts;
}