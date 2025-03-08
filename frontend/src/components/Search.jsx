// src/components/Search.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Search.css';

const Search = () => {
    const [query, setQuery] = useState('');
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (query) {
            setLoading(true);
            const delayDebounceFn = setTimeout(() => {
                axios.get(`http://localhost:5000/api/news/search?q=${query}`)
                    .then(res => {
                        setArticles(res.data.articles);
                        setError(null);
                    })
                    .catch(err => {
                        console.error(err);
                        setError('Failed to fetch search results');
                        setArticles([]);
                    })
                    .finally(() => setLoading(false));
            }, 500); // Adjust the delay as needed

            return () => clearTimeout(delayDebounceFn);
        } else {
            // Reset everything when the query is empty
            setArticles([]);
            setError(null);
            setLoading(false); // Ensure loading is set to false
        }
    }, [query]);

    return (
        <div className="search-page">
            <div className="search-container">
                <input 
                    type="text" 
                    placeholder="Search news..." 
                    value={query} 
                    onChange={(e) => setQuery(e.target.value)}
                    className="search-input"
                />
            </div>

            {loading && <div className="loading">Loading...</div>}
            {error && <div className="error">{error}</div>}
            {!loading && !error && articles.length === 0 && query && (
                <div className="no-results">No matching results found.</div>
            )}

            <div className="article-grid">
                {articles.map(article => (
                    <div key={article.url} className="article-card">
                        <img src={article.urlToImage} alt={article.title} className="article-image"/>
                        <h2>{article.title}</h2>
                        <p>{article.description}</p>
                        <Link to={`/article/${encodeURIComponent(article.url)}`} className="read_more">Read More</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Search;