const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

const Product = require('../models/productModel');

const {getName, getURL, getImage, getDeliveryDate, getPrice} = require('../utils/scraperUtils');

const scrapePage = async (page, category) => {
    const pageContent = await page.content();
    const $ = cheerio.load(pageContent);
    const products = [];
  
    $('div[data-component-type=s-search-result]').each((_, element) => {
        const name = getName($, element);
        const url = getURL($, element);
        const image = getImage($, element);
        const delivery = getDeliveryDate($, element);
        const price = getPrice($, element);

        if (name) {
            products.push({ name, url, image, category, delivery, price });
        }
    });
  
    return products;
};

const scrapeCategoryPages = async (page, category, maxPages = 2) => {
    let allProducts = [];
    let currentPage = 0;

    while (currentPage < maxPages) {
        const products = await scrapePage(page, category.name);
        allProducts.push(...products);

        const nextPageButton = await page.$('.s-pagination-container .s-pagination-next');

        if (nextPageButton) {
            const isDisabled = await page.evaluate((el) => el.getAttribute('aria-disabled') === 'true', nextPageButton);
            if (isDisabled) break;

            await nextPageButton.click();
            await page.waitForNavigation({ waitUntil: 'networkidle2' });
        } else {
            break;
        }
        currentPage += 1;
    }

    return allProducts;
};

exports.scrapeAmazon = async () => {
    const categories = [
        {
            name: 'Printers',
            url: 'https://www.amazon.com/s?i=specialty-aps&bbn=16225007011&rh=n%3A16225007011%2Cn%3A172635',
        },
        {
            name: 'Monitors',
            url: 'https://www.amazon.com/s?i=specialty-aps&bbn=16225007011&rh=n%3A16225007011%2Cn%3A1292115011',
        },
    ];
  
    const browser = await puppeteer.launch();
  
    try {
        for (const category of categories) {
            console.log(`Scraping category: ${category.name}`);
            
            const page = await browser.newPage();
            await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36');
            await page.goto(category.url, { timeout: 60000, waitUntil: 'domcontentloaded' });
    
            const products = await scrapeCategoryPages(page, category);
    
            if (products.length > 0) {
                await Product.deleteMany({ category: category.name });
                await Product.insertMany(products);
                console.log(`Updated ${products.length} products for category: ${category.name}`);
            }
    
            await page.close();
        }
    } catch (error) {
        console.error('Error during scraping:', error);
    } finally {
        await browser.close();
    }
};
