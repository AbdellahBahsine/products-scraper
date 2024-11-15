require('dotenv').config();

const express = require('express');
const mongoose = require('./db');

const app = express();

const host = process.env.HOST || "http://localhost:5173";

const cors = require('cors');
const corsConfiguration = {
    origin: host,
}

app.use(cors(corsConfiguration));
app.use(express.json());

const port = process.env.PORT || 8000;

const scraper = require('./routes/scraperRoutes');
const {scrapeAmazon} = require('./controllers/scraperController');

app.use('/api', scraper);

const cron = require('node-cron');
cron.schedule('0 0 * * *', async () => {
    console.log('Running scheduled scraping job...');
    try {
        await scrapeAmazon();
    } catch (err) {
        console.err("err:", err);
    }
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});