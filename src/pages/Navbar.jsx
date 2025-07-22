import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const navStyles = {
    container: {
      width: '100%',
      padding: '15px 0',
      backgroundColor: '#0f172a', // dark background
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderBottom: '1px solid #334155',
    },
    navLinks: {
      display: 'flex',
      gap: '40px',
    },
    link: {
      textDecoration: 'none',
      color: '#f1f5f9',
      fontWeight: '500',
      fontSize: '1.1rem',
    },
  };

  return (
    <nav style={navStyles.container}>
      <div style={navStyles.navLinks}>
        <Link to="/" style={navStyles.link}>Home</Link>
        <Link to="/about" style={navStyles.link}>About Us</Link>
        <Link to="/contact" style={navStyles.link}>Contact Us</Link>
      </div>
    </nav>
  );
}

export default Navbar;
