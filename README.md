# Amazon Products Scraper

This web scraper extracts product data from Amazon and displays the results in the front-end of my application. It was a valuable learning experience, where I encountered and overcame several challenges.

## Tech Stack

- **Express**: A lightweight and flexible Node.js web application framework for building the server.
- **Puppeteer**: A powerful library for headless browsing and scraping dynamic content.
- **Cheerio**: Used for parsing and traversing HTML when scraping simpler, static pages.
- **MongoDB**: A NoSQL database for storing the scraped product data.
- **React**: A front-end library for building the user interface to display the scraped data.

## Challenges Faced

This was my first time creating a web scraper, and I had to figure out the best practices along the way. Here are some of the key challenges I encountered and how I resolved them:

### 1. Fetching HTML Content
Initially, I tried to fetch the HTML content using `axios`. However, due to Amazon's extensive use of JavaScript, this approach didn't work. After investigating the issue, I realized I needed a tool that could handle JavaScript-rendered websites. Switching to **Puppeteer** solved this problem by allowing me to fully render and interact with dynamic content.

### 2. Bypassing Anti-Bot Measures
After installing Puppeteer, I faced another hurdle: Amazon's anti-bot mechanisms blocked my requests. I discovered that setting a custom **User-Agent** to mimic a real browser successfully bypassed these restrictions, enabling me to scrape the data without getting blocked.

### 3. Selecting Reliable CSS Selectors
A significant challenge was deciding which selectors to use for scraping. Through experimentation, I found that **data attributes** were often the most stable and reliable choice, so I prioritized them when available. As a fallback, I used **class names**. However, I quickly realized that both data attributes and class names are prone to changes as the website’s structure evolves. To address this, I concluded that it’s essential to **regularly test** the scraper to ensure it remains functional over time.

## How to Run the Project

1. **Clone the Repository**
    ```bash
    git clone https://github.com/AbdellahBahsine/products-scraper.git
    cd products-scraper
    ```

2. **Install Dependencies**
    ```bash
    npm install
    ```

3. **Run the Scraper**
    ```bash
    node server.js
    ```

