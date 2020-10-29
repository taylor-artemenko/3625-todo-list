import React, { useContext } from "react";
import { AppContext } from "../App";
import { Link } from 'react-router-dom';

function Navbar() {

    const { dispatch } = useContext(AppContext);

    const toggleTheme = () => {
        dispatch({ type: "toggleTheme" });
    };

    const navItemStyle = {
        display: "flex",
        justifyContent: "space-evenly"
    }

    const buttonStyle = {
        textDecoration: 'underline'
    }

    return (
        <nav style={navItemStyle}>
            <Link to="/">Home</Link>
            <Link to="/about">About Us</Link>
            <Link to="/api">API</Link>
            <button style={buttonStyle} onClick={toggleTheme}>Toggle Theme</button>
        </nav>
    )
}
export default Navbar;