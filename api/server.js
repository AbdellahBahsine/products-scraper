require('dotenv').config();

const express = require('express');
const mongoose = require('./db');

const app = express();

const port = process.env.PORT || 8000;

const scraper = require('./routes/scraperRoutes');

app.use('/api', scraper);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});