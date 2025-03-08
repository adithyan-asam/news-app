// src/components/Home.js
import { useState, useEffect } from 'react';
import axios from 'axios';
// import SearchBar from '../components/SearchBar';
import './Home.css';
import ArticleCard from './ArticleCard'; // Importing ArticleCard component

const Home = () => {
    const [, setArticles] = useState([]);
    const [filteredArticles, setFilteredArticles] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/news')
            .then(res => {
                setArticles(res.data.articles);
                setFilteredArticles(res.data.articles); // Initially, all articles are displayed
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
        <div className="p-4">
            <h1 className="text-2xl font-bold">Latest News</h1>
            
            {/* Search Bar */}
            {/* <SearchBar onSearch={handleSearch} /> */}

            <div className="articles-grid">
                {filteredArticles.map(article => (
                    // Using ArticleCard for each article
                    <ArticleCard key={article.url} article={article} />
                ))}
            </div>
        </div>
    );
};

export default Home;
