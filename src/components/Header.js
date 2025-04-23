import React, { useState } from "react";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
    const [theme, setTheme] = useState('light');

    const themeChange = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };


    return (
        <header>
            <h1>Goals Dashboard</h1>
            <ThemeToggle theme={theme} onToggle={themeChange} />
        </header>
    );
}
