// news-app-backend/config/db.js
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'news_app',
    password: 'asam@2005',
    port: 5432,
});

module.exports = pool;
