const express = require('express');
const router = express.Router();
const fs = require('fs');
const fTwitchCategories = JSON.parse(fs.readFileSync('_storage/twitchCategories.json'))

router.get('/', async (req, res) => {
  res.json(fTwitchCategories);
});


module.exports = router;