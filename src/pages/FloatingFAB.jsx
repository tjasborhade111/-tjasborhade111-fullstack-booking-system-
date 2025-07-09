import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';

function FloatingFAB() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    alert('👋 You have been logged out.');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <>
      <div className="fab-container">
        <button className="fab-main" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </button>

        {isOpen && (
          <div className="fab-options">
            {isLoggedIn && (
              <>
                <Link to="/home" className="fab-option">🏠 Home</Link>
                <Link to="/categories" className="fab-option">📅 Booking</Link>
                <Link to="/history" className="fab-option">📜 History</Link>
              </>
            )}
            <Link to="/about" className="fab-option">ℹ️ About</Link>
            <Link to="/contact" className="fab-option">📞 Contact</Link>

            <button className="fab-option" onClick={toggleTheme}>
              {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </button>

            {!isLoggedIn ? (
              <>
                <Link to="/login" className="fab-option">🔐 Login</Link>
                <Link to="/signup" className="fab-option">📝 Signup</Link>
              </>
            ) : (
              <button className="fab-option" onClick={handleLogout}>🚪 Logout</button>
            )}
          </div>
        )}
      </div>

      <style>{`
        .fab-container {
          position: fixed;
          bottom: 25px;
          right: 25px;
          z-index: 1000;
        }

        .fab-main {
          background-color: var(--btn-bg, #1e3a8a);
          color: white;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          border: none;
          font-size: 26px;
          font-weight: bold;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .fab-main:hover {
          background-color: #2563eb;
        }

        .fab-options {
          display: flex;
          flex-direction: column;
          position: absolute;
          bottom: 70px;
          right: 0;
          gap: 10px;
        }

        .fab-option {
          background-color: var(--option-bg, #fff);
          color: var(--option-text, #1e3a8a);
          padding: 10px 14px;
          border-radius: 8px;
          text-decoration: none;
          font-weight: bold;
          font-size: 14px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          transition: background 0.3s;
          border: none;
          cursor: pointer;
        }

        .fab-option:hover {
          background-color: #e0e7ff;
        }

        .dark .fab-option {
          background-color: #1e293b;
          color: #e2e8f0;
        }

        .dark .fab-option:hover {
          background-color: #334155;
        }
      `}</style>
    </>
  );
}

export default FloatingFAB;
