import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [theme, setTheme] = useState('dark');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (token && isLoggedIn) {
      navigate('/home');
    }
  }, [navigate]);

  const togglePassword = () => setShowPassword(prev => !prev);
  const toggleTheme = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
          alert("❌ Invalid login response");
          return;
        }
        localStorage.setItem('token', token);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('user', JSON.stringify(user));
        alert('✅ Login successful!');
        navigate('/home');
      } else {
        alert(`❌ ${result.message || 'Login failed'}`);
      }
    } catch (err) {
      console.error("Login error:", err);
      alert('❌ Something went wrong. Please try again.');
    }
  };

  return (
    <>
      <style>{`/* Your Integrated CSS */ 
        :root {
          --bg-color: #f9fafb;
          --box-bg: rgba(255, 255, 255, 0.9);
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
          padding: 80px 20px;
          font-family: 'Inter', sans-serif;
          position: relative;
          overflow-y: auto;
        }

        .contact-box {
          max-width: 500px;
          width: 100%;
          background: var(--box-bg);
          backdrop-filter: blur(18px);
          padding: 50px;
          border-radius: 20px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
          border: 1px solid var(--input-border);
          animation: fadeInUp 1.2s ease-out;
          position: relative;
          z-index: 2;
        }

        .icon-animation {
          font-size: 2.5rem;
          text-align: center;
          animation: pulse 1.5s ease-in-out infinite alternate;
          margin-bottom: 20px;
          color: #38bdf8;
        }

        .contact-title {
          font-size: 2.4rem;
          font-weight: 800;
          text-align: center;
          margin-bottom: 20px;
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
          gap: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          position: relative;
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

        .toggle-password {
          position: absolute;
          right: 12px;
          top: 38px;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1.2rem;
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

        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes pulse {
          from { transform: scale(1); opacity: 0.7; }
          to   { transform: scale(1.05); opacity: 1; }
        }

        @media (max-width: 768px) {
          .contact-box {
            padding: 30px 20px;
            border-radius: 15px;
          }

          .contact-title {
            font-size: 2rem;
          }

          .contact-description {
            font-size: 0.95rem;
          }

          .icon-animation {
            font-size: 2rem;
          }
        }

        @media (max-width: 480px) {
          .contact-container {
            padding: 60px 15px;
          }

          .contact-box {
            padding: 25px 15px;
          }

          .contact-title {
            font-size: 1.6rem;
          }

          .contact-description {
            font-size: 0.9rem;
          }

          .icon-animation {
            font-size: 1.8rem;
          }

          input {
            padding: 10px;
            font-size: 0.95rem;
          }

          .contact-btn {
            font-size: 0.95rem;
            padding: 10px;
          }
        }
          .password-input-wrapper {
  position: relative;
}

.password-input-wrapper input {
  width: 100%;
  padding-right: 2.5rem; /* Give space for the icon */
}

.toggle-password {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  font-size: 1.1rem;
  cursor: pointer;
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
      placeholder="e.g. user@example.com"
      value={formData.email}
      onChange={handleChange}
      required
    />
  </div>

  <div className="form-group password-group">
    <label htmlFor="password">Password</label>
    <div className="password-input-wrapper">
      <input
        id="password"
        name="password"
        type={showPassword ? 'text' : 'password'}
        placeholder="••••••••"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <button
        type="button"
        className="toggle-password"
        onClick={togglePassword}
        aria-label="Toggle Password"
      >
        {showPassword ? '🔓' : '🔒'}
      </button>
    </div>
  </div>

  <button type="submit" className="contact-btn">Login</button>
</form>


          <p className="contact-description">
            Don’t have an account? <Link to="/signup">Sign up</Link>
          </p>

          <div className="toggle-theme" onClick={toggleTheme}>
            Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
