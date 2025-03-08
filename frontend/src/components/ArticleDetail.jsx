// src/components/ArticleDetail.js
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ClipLoader from 'react-spinners/ClipLoader';
import './ArticleDetail.css';

const ArticleDetail = () => {
  const { url } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false); // Track bookmark status

  console.log('URL from useParams:', url);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token){
      alert('You need to be logged in to view this news.');
      navigate('/login');
      return;
    }

    axios
      .get(`http://localhost:5000/api/news/detail?url=${encodeURIComponent(url)}`, {
        headers: { 'x-auth-token': token },
        timeout: 10000,
      })
      .then((res) => {
        console.log('Fetched article:', res.data);  // Log fetched article
        setArticle(res.data.article);
        setLoading(false);
        checkIfBookmarked(url, token); // Check if article is already bookmarked
      })
      .catch((err) => {
        console.log('Error fetching news:', err);
        alert('Failed to fetch news');
        if (err.code === 'ETIMEDOUT') {
          alert('Request timed out. Please try again later.');
        } else {
          alert('Failed to fetch article details.');
        }
        setLoading(false);
    });
  }, [url, navigate]);

  const checkIfBookmarked = async (articleUrl, token) => {
    try {
      const res = await axios.get('http://localhost:5000/api/bookmarks', {
        headers: { 'x-auth-token': token },
      });

      const isAlreadyBookmarked = res.data.some((b) => b.article_url === articleUrl);
      setIsBookmarked(isAlreadyBookmarked);
    } catch (err) {
      console.error('Error checking bookmark status:', err);
    }
  };

  const handleBookmark = async() => {
    if (isBookmarked) return; // Prevents function execution if already bookmarked
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Login to bookmark');
      return;
    }

    const { title, urlToImage, content } = article;
    try {
      const res = await axios.post(
        'http://localhost:5000/api/bookmarks/add',
        { article_url: url, title, urlToImage, content },
        { headers: { 'x-auth-token': token } }
      );

      alert(res.data.message);
      setIsBookmarked(true); // Disable button after bookmarking
    } catch (err) {
      if (err.response && err.response.status === 400) {
        alert('Already bookmarked!');
      } else {
        alert('Failed to bookmark');
      }
    }
  };

  if (loading) {
    return (
      <div className="loader-container">
        <ClipLoader color="#3498db" size={50} />
      </div>
    );
  }

  if (!article) return <p>No news found.</p>;

  return (
    <div className="article-content">
      <h1>{article.title}</h1>
      {article.urlToImage && (
        <img src={article.urlToImage} alt={article.title} />
      )}
      <p className="content-snippet">
        {article.content}...
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="read-full-link"
        >
          Read Full Article
        </a>
      </p>{" "}
      {/* Display the content snippet */}
      {isBookmarked ? (
        <p className="bookmarked-label">✅ Bookmarked</p> // Show text instead of button
      ) : (
        <button onClick={handleBookmark} className="bookmark-button">
          Bookmark
        </button>
      )}
    </div>
  );
};


export default ArticleDetail;
