// src/components/DarkModeToggle.js
import { useEffect, useState } from 'react';
import './DarkModeToggle.css';

const DarkModeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        // Load theme from Local Storage
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            setIsDarkMode(true);
        }
    }, []);

    const toggleDarkMode = () => {
        if (isDarkMode) {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        } else {
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        }
        setIsDarkMode(!isDarkMode);
    };

    return (
        <button onClick={toggleDarkMode} className="dark-mode-toggle">
            {isDarkMode ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </button>
    );
};

export default DarkModeToggle;
