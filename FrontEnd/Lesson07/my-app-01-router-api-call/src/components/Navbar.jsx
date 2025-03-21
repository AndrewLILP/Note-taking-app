import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="logo">My App</Link>
                <div className="nav-links">
                    <Link to="/">Home</Link>
                    <Link to="/users">Users</Link>
                    <Link to="/notes">Notes</Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;