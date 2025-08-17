// src/context/AuthContext.js
import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.get('https://news-app-ia5i.onrender.com/api/users/me', {
                headers: { 'x-auth-token': token }
            })
            .then(res => setUser(res.data))
            .catch(() => localStorage.removeItem('token'));
        }
    }, []);

    const login = (token) => {
        localStorage.setItem('token', token);
        axios.get('https://news-app-ia5i.onrender.com/api/users/me', {
            headers: { 'x-auth-token': token }
        }).then(res => setUser(res.data));
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Adding PropTypes validation
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthContext;
