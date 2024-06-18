import React from 'react';
import '../style.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-logo">
        <img src="/path/to/logo.png" alt="Company Logo" className="logo" />
        <span className="company-name">JOB SPHERE</span>
      </div>
      <div className="footer-details">
        <p>1234 Job Street, Employment City, Jobland</p>
        <p>Email: info@jobsphere.com | Phone: (123) 456-7890</p>
      </div>
    </footer>
  );
};

export default Footer;
