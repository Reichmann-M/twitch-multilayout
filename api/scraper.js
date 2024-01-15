const puppeteer = require('puppeteer');

module.exports.getLiveChannels = async (sCategoryAbbr) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const categoryUrl = 'https://www.twitch.tv/directory/category/' + sCategoryAbbr;
    await page.goto(categoryUrl);
    // Wait for the page to load and display the live channels
    try {
        await page.waitForSelector('p[data-a-target="preview-card-channel-link"]', {timeout: 5000});
    } catch (error) {
        console.error('Could not find the channel element. Probably no live channels for '+sCategoryAbbr)
        return [];
    }

    // Extract the channel names
    const elements = await page.$$('p[data-a-target="preview-card-channel-link"]');

    let elementTexts;
    try {
        elementTexts = await Promise.all(elements.map(element => page.evaluate(el => el.textContent, element)));
        console.log('Element Texts:', elementTexts); //TODO: remove
    } catch (error) {
        console.error('Could not scrape the live channel URL')
        return [];
    }

    await browser.close();
    return elementTexts;
}