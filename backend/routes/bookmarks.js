// news-app-backend/routes/bookmarks.js
const express = require('express');
const pool = require('../config/db');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/add', auth, async (req, res) => {
    const { article_url, title, urlToImage, content } = req.body;

    const userId = req.user.userId;
    try {
        await pool.query(
            'INSERT INTO bookmarks (user_id, article_url, title, urlToImage, content) VALUES ($1, $2, $3, $4, $5)',
            [userId, article_url, title, urlToImage, content]
        );
        res.status(201).json({ message: 'Bookmark added' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to add bookmark' });
    }
});

router.delete('/delete/:article_url', auth, async (req, res) => {
    const { article_url } = req.params;
    const userId = req.user.userId;

    try {
        const result = await pool.query(
            'DELETE FROM bookmarks WHERE user_id = $1 AND article_url = $2 RETURNING *',
            [userId, article_url]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Bookmark not found' });
        }

        res.json({ message: 'Bookmark deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete bookmark' });
    }
});


router.get('/', auth, async (req, res) => {
    const userId = req.user.userId;
    try {
        const result = await pool.query('SELECT * FROM bookmarks WHERE user_id = $1', [userId]);

        // Ensure `urlToImage` is correctly mapped
        const bookmarks = result.rows.map(row => ({
            ...row,
            urlToImage: row.urltoimage || row.urlToImage, // Ensure correct key
            content: row.content || row.Content
        }));
        res.json(bookmarks);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to retrieve bookmarks' });
    }
});


module.exports = router;
