import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ArticleDetail from './components/ArticleDetail';
import Category from './components/Category';
import Search from './components/Search';
import ProtectedRoute from './components/ProtectedRoute';
import Bookmarks from './components/Bookmarks';
import { AuthProvider } from './context/AuthContext';
import DarkModeToggle from './components/DarkModeToggle';
import Login from './components/Login';
import Signup from './components/Signup';
// import './App.css'


function App() {
    return (
        <AuthProvider>
            <Router>
                {/* Navbar and Dark Mode Toggle */}
                <Navbar />
                <DarkModeToggle />
                
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/article/:url" element={<ArticleDetail />} />
                    <Route path="/category/:category" element={<Category />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />

                    {/* Protected Routes */}
                    <Route path="/bookmarks" element={
                        <ProtectedRoute>
                            <Bookmarks />
                        </ProtectedRoute>
                    } />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;