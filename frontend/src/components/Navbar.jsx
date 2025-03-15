// src/components/Navbar.js
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav className="navbar">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/category/technology" className="nav-link">Technology</Link>
            <Link to="/category/sports" className="nav-link">Sports</Link>
            <Link to="/category/entertainment" className="nav-link">Entertainment</Link>
            
            
            {/* Authentication Links */}
            {!user ? (
                <>
                        <Link to="/login" className="login-btn">Login</Link>
                    {/* <Link to="/signup" className="nav-link">Sign Up</Link> */}
                </>
            ) : (
                <>
                    <Link to="/bookmarks" className="nav-link">Bookmarks</Link>
                    <button onClick={logout} className="logout-btn">Logout</button>
                </>
            )}
            <Link to="/search" className="nav-link">Search</Link>
        </nav>
    );
};

export default Navbar;