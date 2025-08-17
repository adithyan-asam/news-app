import { useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Auth.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await axios.post('https://news-app-ia5i.onrender.com/api/users/login', { username, password });
            login(res.data.token);
            navigate('/');
        } catch {
            setError('Login failed. Please check your credentials.');
        }
        setLoading(false);
    };

    return (
        <div className="auth-container">
            <h2>Login</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                />
                <div className="input-group">
                    <input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                    <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>
                <button className='butt-on' type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
            </form>
            <div className='auth-signup'>
                <p>Don&apos;t have an account? 
                    <Link to="/signup" className="signup-link">Sign Up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;