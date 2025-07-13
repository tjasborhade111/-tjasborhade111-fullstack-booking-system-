import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL; // ✅ Declare at the top once
console.log("🌐 VITE_API_URL:", API_URL);
function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [theme, setTheme] = useState('dark');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (token && isLoggedIn) {
      navigate('/categories');
    }
  }, [navigate]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!API_URL) {
      alert("❌ VITE_API_URL is not defined. Check your .env and restart.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/auth`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        const { token, user } = result;

        if (!token || !user || !user._id) {
          alert("❌ Invalid login response. Please try again.");
          return;
        }

        localStorage.setItem('token', token);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userId', user._id);
        localStorage.setItem('userName', user.name || '');
        localStorage.setItem('userEmail', user.email || '');

        alert('✅ Login successful!');
        navigate('/categories');
      } else {
        alert(`❌ ${result.message || 'Login failed'}`);
      }
    } catch (err) {
      console.error("❌ Login error:", err);
      alert('❌ Something went wrong. Please try again.');
    }
  };

  return (
    <>
       <style>{`
        :root {
          --bg-color: #f9fafb;
          --box-bg: rgba(255, 255, 255, 0.8);
          --text-color: #0f172a;
          --input-bg: #fff;
          --input-border: #cbd5e1;
          --btn-bg: #4f46e5;
          --btn-hover: #3730a3;
        }

        .dark {
          --bg-color: #0f172a;
          --box-bg: rgba(255, 255, 255, 0.06);
          --text-color: #e2e8f0;
          --input-bg: #1e293b;
          --input-border: #334155;
          --btn-bg: #4f46e5;
          --btn-hover: #3730a3;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .contact-container {
          min-height: 100vh;
          background: var(--bg-color);
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 60px 20px;
          font-family: 'Inter', sans-serif;
        }

        .contact-box {
          max-width: 480px;
          width: 100%;
          background: var(--box-bg);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          padding: 40px;
          border-radius: 16px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
          border: 1px solid var(--input-border);
        }

        .icon-animation {
          font-size: 2.2rem;
          text-align: center;
          animation: pulse 1.5s ease-in-out infinite alternate;
          margin-bottom: 20px;
          color: #38bdf8;
        }

        .contact-title {
          font-size: 2rem;
          font-weight: 800;
          text-align: center;
          margin-bottom: 16px;
          color: var(--text-color);
        }

        .contact-description {
          font-size: 1rem;
          text-align: center;
          color: var(--text-color);
          margin-bottom: 20px;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        label {
          margin-bottom: 6px;
          font-weight: 500;
          color: var(--text-color);
        }

        input {
          padding: 12px;
          border: 1px solid var(--input-border);
          border-radius: 8px;
          background-color: var(--input-bg);
          color: var(--text-color);
          font-size: 1rem;
        }

        input::placeholder {
          color: #94a3b8;
        }

        .contact-btn {
          padding: 12px;
          background-color: var(--btn-bg);
          color: white;
          font-weight: bold;
          font-size: 1rem;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .contact-btn:hover {
          background-color: var(--btn-hover);
        }

        .toggle-theme {
          margin-top: 16px;
          text-align: center;
          color: var(--text-color);
          font-size: 0.9rem;
          cursor: pointer;
        }

        @keyframes pulse {
          from { transform: scale(1); opacity: 0.7; }
          to   { transform: scale(1.05); opacity: 1; }
        }

        @media (max-width: 480px) {
          .contact-box { padding: 30px 16px; }
          .contact-title { font-size: 1.6rem; }
          .contact-description { font-size: 0.95rem; }
          .contact-btn { font-size: 0.95rem; }
        }
      `}</style>

      <div className={`${theme} contact-container`}>
        <div className="contact-box">
          <div className="icon-animation">🔐</div>
          <h2 className="contact-title">Login</h2>
          <p className="contact-description">Enter your credentials to access your account</p>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="contact-btn">Login</button>
          </form>

          <p className="contact-description">
            Don’t have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
