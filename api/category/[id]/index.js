const express = require('express');
const router = express.Router();
router.get('/', async (req, res) => {
  res.json(JSON.stringify("specificCategoryRouter"));
});
module.exports = router;