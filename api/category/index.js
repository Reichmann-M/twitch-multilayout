const express = require('express');
const router = express.Router();
router.get('/', async (req, res) => {
  res.json(JSON.stringify("generalCategoryRouter"));
});
module.exports = router;