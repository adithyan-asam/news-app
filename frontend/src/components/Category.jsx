// src/components/Category.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './Category.css';

const Category = () => {
    const { category } = useParams();
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/news/category/${category}`)
            .then(res => setArticles(res.data.articles))
            .catch(err => console.log(err));
    }, [category]);

    return (
        <div className="category-page">
            <h1 className="category-title">{category.toUpperCase()} News</h1>
            <div className="articles-grid">
                {articles.map(article => (
                    <div key={article.url} className="article-card">
                        <img src={article.urlToImage} alt={article.title} className="article-image"/>
                        <h2>{article.title}</h2>
                        <p>{article.description}</p>
                        <Link to={`/article/${encodeURIComponent(article.url)}`} className="read-more">Read More</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Category;
