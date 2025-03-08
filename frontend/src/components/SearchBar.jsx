// // src/components/SearchBar.js
// import { useState } from 'react';
// import axios from 'axios';
// import './SearchBar.css';
// import ArticleCard from './ArticleCard';

// const SearchBar = () => {
//     const [query, setQuery] = useState('');
//     const [results, setResults] = useState([]);

//     const handleSearch = (e) => {
//         e.preventDefault();
//         if (!query) return;

//         axios.get(`https://newsapi.org/v2/everything?q=${query}&apiKey=35aa8fadad2c40e6978f9fe6c8c91ed4`)
//             .then(res => {
//                 setResults(res.data.articles);
//             })
//             .catch(err => console.error(err));
//     };

//     return (
//         <div className="search-container">
//             <form onSubmit={handleSearch} className="search-form">
//                 <input 
//                     type="text" 
//                     placeholder="Search for news..." 
//                     value={query} 
//                     onChange={(e) => setQuery(e.target.value)} 
//                 />
//                 <button type="submit">Search</button>
//             </form>

//             <div className="search-results">
//                 {results.length > 0 && results.map((article, index) => (
//                     <ArticleCard key={index} article={article} />
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default SearchBar;
