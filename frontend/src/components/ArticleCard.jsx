// src/components/ArticleCard.js
import { Link } from 'react-router-dom';
import './ArticleCard.css';
import PropTypes from 'prop-types';

const ArticleCard = ({ article }) => {
    return (
        <div className="card">
            <img src={article.urlToImage} alt={article.title} className="card-img" />
            <h3>{article.title}</h3>
            <p>{article.description}</p>
            <Link to={`/article/${encodeURIComponent(article.url)}`} className="read-more">
                Read More
            </Link>
        </div>
    );
};

ArticleCard.propTypes = {
    article: PropTypes.shape({
        urlToImage: PropTypes.string,
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
        url: PropTypes.string.isRequired
    }).isRequired
};


export default ArticleCard;
