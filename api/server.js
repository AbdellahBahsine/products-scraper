const express = require('express');

const app = express();

const port = 3000;

app.get("/", (req, res) => {
    res.send("Hello world");
});

const scraper = require('./routes/scraper');

app.use('/api', scraper);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});