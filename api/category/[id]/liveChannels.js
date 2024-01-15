/**
 * @fileoverview Live Twitch Channels of a specific category
 * @module liveChannels
 */

const express = require('express');
const router = express.Router();
const fScraperJS = require('../../scraper.js');

/**
 * No Params
 * No Body
 * @returns links for top 30 live channels in given category
*/
router.get('/', async (req, res) => {
  const sCategoryAbbr = req.originalUrl.split('/')[req.originalUrl.split('/').length-2]
  const aLiveChannels = await fScraperJS.getLiveChannels(sCategoryAbbr);
  res.json(aLiveChannels);
});

// Export the router
module.exports = router;