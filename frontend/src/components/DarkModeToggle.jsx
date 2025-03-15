import { useEffect, useState } from 'react';
import './DarkModeToggle.css';

const DarkModeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useState(
        localStorage.getItem('theme') === 'dark'
    );

    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    return (
        <label className="toggle-container" aria-label="Toggle dark mode">
            <input 
                type="checkbox" 
                checked={isDarkMode} 
                onChange={() => setIsDarkMode(!isDarkMode)} 
            />
            <span className="slider"></span>
        </label>
    );
};

export default DarkModeToggle;