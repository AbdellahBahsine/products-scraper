const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

const { logger } = require('../utils/logger');

const Product = require('../models/productModel');

const scrapePage = async (page, products) => {
    const pageContent = await page.content();

    const $ = cheerio.load(pageContent);

    const baseURL = 'https://www.amazon.com';

    $('div[data-component-type=s-search-result]').each((index, element) => {
        const $name = $(element)
            .find('div[data-cy=title-recipe] > h2')
            .text()
            .trim();

        const $relativeURL = $(element)
            .find('div[data-cy=title-recipe] > h2 > a')
            .attr('href');
        const $url = `${baseURL}${$relativeURL}`;

        const $imageURL = $(element)
            .find('span[data-component-type=s-product-image] img')
            .attr('src');

        const $delivery_text = $(element)
            .find('[data-cy=delivery-recipe]')
            .first()
            .find('span[aria-label]')
            .first()
            .attr('aria-label') || '';

        const match = $delivery_text.match(/Delivery (.+)/);
        const $delivery = match ? match[1].trim() : '-';

        products.push({
            'name': $name,
            'url': $url,
            'image_url': $imageURL,
            // 'delivery': $delivery
        });
    });

    return products;
};

const scrapePages = async (page) => {
    let products = [];
    products = await scrapePage(page, products);

    const nextPageButton = await page.$('.s-pagination-container .s-pagination-next');

    if (nextPageButton) {
        const isDisabled = await page.evaluate(el => el.getAttribute('aria-disabled') === 'true', nextPageButton);

        if (isDisabled) {
            logger.debug("Next button is disabled. Exiting loop.");
            return products;
        }

        await nextPageButton.click();

        await page.waitForSelector('span[data-component-type=s-search-results]', {timeout: 2000});

        products = await scrapePage(page, products);
    } else {
        logger.debug("Next button not found.");
        return products;
    }

    return products;
};

const scrapeCategory = async (page, category) => {
    await page.goto(category.url, {timeout: 60000});

    await page.waitForSelector('span[data-component-type=s-search-results]', {timeout: 2000});

    const products = await scrapePages(page);

    return products;
};

exports.scraper = async (req, res) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36');

    const categories = [
        {
            name: 'Computer Printers',
            url: 'https://www.amazon.com/s?i=specialty-aps&bbn=16225007011&rh=n%3A16225007011%2Cn%3A172635'
        },
        {
            name: 'Computer Monitors',
            url: 'https://www.amazon.com/s?i=specialty-aps&bbn=16225007011&rh=n%3A16225007011%2Cn%3A1292115011'
        }
    ];

    let results = [];

    for (const category of categories) {
        let products = await scrapeCategory(page, category);

        results.push(...products);

        if (results.length > 0) {
            // await Product.deleteMany({ category: category.name });
            // await Product.insertMany(results);
        }
    }

    // await browser.close();

    res.json({results});
};