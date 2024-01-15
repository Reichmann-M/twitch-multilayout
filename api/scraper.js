const puppeteer = require('puppeteer');

module.exports.getLiveChannels = async (sCategoryAbbr) => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        const categoryUrl = 'https://www.twitch.tv/directory/category/' + sCategoryAbbr;
        await page.goto(categoryUrl);
        // Wait for the page to load and display the live channels
        await page.waitForSelector('p[data-a-target="preview-card-channel-link"]');

        // Extract the channel names
        const elements = await page.$$('p[data-a-target="preview-card-channel-link"]');
        const elementTexts = await Promise.all(elements.map(element => page.evaluate(el => el.textContent, element)));
        console.log('Element Texts:', elementTexts); //TODO: remove

        await browser.close();
        return elementTexts;
    } catch (error) {
        return 'Puppeteer Error'
    }

}