// Footer.js

import React from 'react';
import './footer.css'; // Optional: You can style your footer using CSS

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <span className="text-muted">© {new Date().getFullYear()} Quickmart. All rights reserved.</span>
      </div>
    </footer>
  );
};

export default Footer;
