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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
            <Route
              path="/bookmarks"
              element={
                <ProtectedRoute>
                  <Bookmarks />
                </ProtectedRoute>
              }
            />
          </Routes>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            pauseOnHover
            draggable
            theme="light" // will adapt with your light/dark toggle
          />
        </Router>
      </AuthProvider>
    );
}

export default App;