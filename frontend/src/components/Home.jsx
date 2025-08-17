// src/components/Home.js
import { useState, useEffect } from 'react';
import axios from 'axios';
// import SearchBar from '../components/SearchBar';
import './Home.css';
import ArticleCard from './ArticleCard'; // Importing ArticleCard component

const Home = () => {
    const [articles , setArticles] = useState([]);

    useEffect(() => {
        axios.get('https://news-app-ia5i.onrender.com/api/news')
            .then(res => {
                setArticles(res.data.articles);
            })
            .catch(err => console.log(err));
    }, []);

    // Function to handle search
    // const handleSearch = (query) => {
    //     if (query.trim() === '') {
    //         setFilteredArticles(articles); // Show all articles if search is empty
    //     } else {
    //         const filtered = articles.filter(article =>
    //             article.title.toLowerCase().includes(query.toLowerCase()) ||
    //             article.description.toLowerCase().includes(query.toLowerCase())
    //         );
    //         setFilteredArticles(filtered);
    //     }
    // };   

    return (
        <div className="home-page">     
            <h1 className="home-title">Latest News</h1>
            <div className="articles-grid">
                {articles.map(article => (
                    <ArticleCard key={article.url} article={article} />
                ))}
            </div>
        </div>
    );
};

export default Home;
