// news-app-backend/routes/news.js
const express = require('express');
const axios = require('axios');
const router = express.Router();
const cheerio = require('cheerio');
const authenticateToken = require('../middleware/auth');

router.get('/', async (req, res) => {
    try {
        const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}&timestamp=${Date.now()}`, {
            timeout: 10000,
        });
        res.json(response.data);
    } catch (err) {
        console.error('Error details:', {
            message: err.message,
            code: err.code,
            config: err.config,
            response: err.response?.data,
        });
        if (err.code === 'ETIMEDOUT') {
            res.status(504).json({ error: 'Request timed out. Please try again later.' });
        } else {
            res.status(500).json({ error: 'Failed to fetch news' });
        }
    }
});

// news-app-backend/routes/news.js
router.get('/category/:category', async (req, res) => {
    const category = req.params.category;
    try {
        const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${process.env.NEWS_API_KEY}`);
        res.json(response.data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch news by category' });
    }
});

// news-app-backend/routes/news.js
router.get('/search', async (req, res) => {
    const query = req.query.q;
    try {
        const response = await axios.get(`https://newsapi.org/v2/everything?q=${query}&apiKey=${process.env.NEWS_API_KEY}`);
        res.json(response.data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch search results' });
    }
});

router.get('/detail', authenticateToken ,async (req, res) => {
    const articleUrl = req.query.url; // Get the article URL from query params
    if (!articleUrl) {
        return res.status(400).json({ error: 'Article URL is required' });
    }

    try {
        // Fetch the HTML content of the article's webpage
        const { data: html } = await axios.get(articleUrl);

        // Load the HTML into cheerio
        const $ = cheerio.load(html);

        // Extract the title and image
        const title = $('meta[property="og:title"]').attr('content') || $('title').text();
        const urlToImage = $('meta[property="og:image"]').attr('content') || $('img').attr('src');

        // Extract the first few paragraphs or a portion of the content
        let content = '';
        $('article p').each((i, el) => {
            if (content.length < 500) { // Changed from 500 to 1000
                // Extract only the text content and remove any HTML tags or CSS classes
                const paragraphText = $(el).text().trim();
                content += paragraphText + ' ';
            }
        });

        // If no content is found in <article>, fallback to <body>
        if (!content.trim()) {
            $('body p').each((i, el) => {
                if (content.length < 500) { // Changed from 500 to 1000
                    const paragraphText = $(el).text().trim();
                    content += paragraphText + ' ';
                }
            });
        }

        // Clean up the content
        content = content
            .replace(/\.css-\w+-\w+\{.*?\}/g, '') // Remove CSS classes like `.css-9d8khp-TimeTag`
            // .replace(/LIVE UPDATES \| CONCLUDED/g, '') // Remove unwanted phrases
            .replace(/Copyright © \d{4} .*? Inc\. All rights? reserved\.?/g, '')
            .replace(/Last Updated:/g, '') // Remove "Last Updated:"
            .replace(/\s+/g, ' ') // Replace multiple spaces with a single space
            .trim();

        // Trim and add ellipsis if content exceeds 1000 characters
        if (content.length > 500) { // Changed from 500 to 1000
            content = content.substring(0, 500) + '...'; // Changed from 500 to 1000
        }

        // Return the extracted data
        const article = {
            url: articleUrl,
            title,
            content, // Return only a clean snippet of the content
            urlToImage,
        };

        res.json({ article });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch article details' });
    }
});

module.exports = router;