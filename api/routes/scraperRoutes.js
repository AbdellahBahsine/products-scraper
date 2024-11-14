const express = require('express');
const router = express.Router();

const { scraper } = require('../controllers/scraperController');

router.get('/scrape', scraper);

module.exports = router;