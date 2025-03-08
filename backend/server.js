// news-app-backend/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const newsRoutes = require('./routes/news');

dotenv.config({ path: './config/config.env' });

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/news', newsRoutes);

// news-app-backend/server.js
const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);

// news-app-backend/server.js
const bookmarkRoutes = require('./routes/bookmarks');
app.use('/api/bookmarks', bookmarkRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
