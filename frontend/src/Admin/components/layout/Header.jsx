import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Layout.css';

const Header = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <span className="logo-icon">📊</span>
          BusinessPro
        </Link>

        <ul className="nav-menu">
          <li className="nav-item">
            <NavLink to="/" className="nav-link" end>
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/about" className="nav-link">
              About
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/contact" className="nav-link">
              Contact
            </NavLink>
          </li>
        </ul>

        <div className="nav-buttons">
          <Link to="/login" className="btn btn-outline">
            Login
          </Link>
          <Link to="/signup" className="btn btn-primary">
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
