import React from 'react';
import '../style.css';

const Nav = () => {
  return (
    <nav className="nav">
      <div className="nav-logo">
        <img src="/path/to/logo.png" alt="Company Logo" className="logo" />
        <span className="company-name">JOB SPHERE</span>
      </div>
      <button className="sign-in-button">Sign In</button>
    </nav>
  );
};

export default Nav;

