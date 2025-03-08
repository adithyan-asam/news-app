// src/components/Navbar.js
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import './Navbar.css'; // Import CSS for styling

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav className="navbar">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/category/technology" className="nav-link">Technology</Link>
            <Link to="/category/sports" className="nav-link">Sports</Link>
            <Link to="/category/entertainment" className="nav-link">Entertainment</Link>
            <Link to="/search" className="nav-link">Search</Link>
            
            {/* Authentication Links */}
            {!user ? (
                <>
                    <Link to="/login" className="nav-link">Login</Link>
                    <Link to="/signup" className="nav-link">Sign Up</Link>
                </>
            ) : (
                <>
                    <Link to="/bookmarks" className="nav-link">Bookmarks</Link>
                    <button onClick={logout} className="nav-link">Logout</button>
                </>
            )}
        </nav>
    );
};

export default Navbar;
