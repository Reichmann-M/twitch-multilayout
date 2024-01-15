const express = require('express');
const router = express.Router();
const fs = require('fs');
const fTwitchCategories = JSON.parse(fs.readFileSync('_storage/twitchCategories.json'))

router.get('/', async (req, res) => {
  const sCategoryAbbr = req.originalUrl.split('/')[req.originalUrl.split('/').length - 1]
  const result = fTwitchCategories.find(category => category.link === "https://www.twitch.tv/directory/category/"+sCategoryAbbr);

  if (result) {
    return res.json(result);
  } else {
    const error = new Error('No Category found for: "'+sCategoryAbbr+'"');
    res.status(404);
    res.json({ error: error.message });
    return;
  }
});
module.exports = router;