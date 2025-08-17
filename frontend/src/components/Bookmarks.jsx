import { useEffect, useState } from 'react';
import axios from 'axios';
import './Bookmarks.css';

const Bookmarks = () => {
    const [bookmarks, setBookmarks] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get('https://news-app-ia5i.onrender.com/api/bookmarks', {
            headers: { 'x-auth-token': token }
        }).then(res => {
            console.log(res.data); // Log bookmarks data
            setBookmarks(res.data);
        })
        .catch(err => console.log(err));
    }, []);

    const handleArticleClick = (articleUrl) => {
        window.open(articleUrl, '_blank');
    };

    const handleDelete = async (e, articleUrl) => {
        e.stopPropagation(); // Prevent the article from opening
        e.preventDefault(); // ✅ Prevents default behavior
        const token = localStorage.getItem('token');

        if (!window.confirm("Are you sure you want to delete this bookmark?")) {
            return;
        }

        try {
            await axios.delete(`https://news-app-ia5i.onrender.com/api/bookmarks/delete/${encodeURIComponent(articleUrl)}`, {
                headers: { 'x-auth-token': token }
            });

            // Remove the deleted bookmark from state
            setBookmarks(bookmarks.filter(b => b.article_url !== articleUrl));
        } catch (error) { // Renamed from err to error
            console.error("Error deleting bookmark:", error);
            alert('Failed to delete bookmark');
        }
    };

    return (
        <div className="bookmarks-page">
            <h1>Your Bookmarks</h1>
            {bookmarks.length === 0 ? <p>No bookmarks found.</p> : null}
            {bookmarks.map(b => {
                return (
                  <div
                    key={b.article_url}
                    className="bookmark-card"
                    onClick={() => handleArticleClick(b.article_url)}
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src={b.urlToImage || "https://via.placeholder.com/100"}
                      alt={b.title}
                      onError={(e) => {
                        console.error("Image failed to load:", b.urlToImage); // Log the error
                        e.target.src = "https://via.placeholder.com/100"; // Fallback to a placeholder image
                      }}
                    />
                    <div className="bookmark-content">
                      <h2>{b.title}</h2>
                      <p>{b.content || "No content available."}</p>
                    </div>
                    <button
                      className="delete-button"
                      onClick={(e) => handleDelete(e, b.article_url)}
                    >
                      🗑
                    </button>
                  </div>
                );
            })}
        </div>
    );
};

export default Bookmarks;