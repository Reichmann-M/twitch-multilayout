const express = require('express');
const router = express.Router();
const fScraperJS = require('../../scraper.js');

// Define routes related to the resource with ID
router.get('/', async (req, res) => {
  const sCategoryID = req.originalUrl.split('/')[req.originalUrl.split('/').length-2]
  const aLiveChannels = await fScraperJS.getLiveChannels(sCategoryID);
  res.json(aLiveChannels);
});

// Export the router
module.exports = router;