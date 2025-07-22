import React, { useState, useContext } from 'react';
import FloatingFAB from './FloatingFAB';
import { ThemeContext } from '../context/ThemeContext';
import Navbar from './Navbar';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log('Contact message:', formData);
    // TODO: Send message to backend
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: isDark ? '#0f172a' : '#f9fafb',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '80px 20px',
      fontFamily: 'Inter, sans-serif',
      position: 'relative',
      overflowY: 'auto',
    },
    box: {
      position: 'relative',
      maxWidth: '800px',
      width: '100%',
      background: isDark ? 'rgba(255, 255, 255, 0.06)' : '#ffffff',
      backdropFilter: 'blur(18px)',
      WebkitBackdropFilter: 'blur(18px)',
      padding: '50px',
      borderRadius: '20px',
      boxShadow: '0 20px 50px rgba(0, 0, 0, 0.2)',
      border: isDark ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid #e5e7eb',
      animation: 'fadeInUp 1.2s ease-out',
      zIndex: 2,
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: 800,
      textAlign: 'center',
      marginBottom: '10px',
      color: isDark ? '#e2e8f0' : '#1e293b',
    },
    description: {
      textAlign: 'center',
      fontSize: '1.1rem',
      marginBottom: '30px',
      color: isDark ? '#cbd5e1' : '#475569',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    },
    label: {
      display: 'block',
      marginBottom: '6px',
      fontSize: '1rem',
      fontWeight: '600',
      color: isDark ? '#e0e7ff' : '#1e293b',
    },
    input: {
      width: '100%',
      padding: '12px 14px',
      fontSize: '1rem',
      border: isDark ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid #cbd5e1',
      borderRadius: '8px',
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : '#f8fafc',
      color: isDark ? '#f8fafc' : '#1e293b',
    },
    textarea: {
      width: '100%',
      padding: '12px 14px',
      fontSize: '1rem',
      border: isDark ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid #cbd5e1',
      borderRadius: '8px',
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : '#f8fafc',
      color: isDark ? '#f8fafc' : '#1e293b',
    },
    button: {
      padding: '14px',
      background: isDark ? '#3b82f6' : '#2563eb',
      color: 'white',
      border: 'none',
      borderRadius: '10px',
      fontSize: '1.05rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      transition: 'all 0.3s ease',
    },
    icon: {
      fontSize: '2.2rem',
      textAlign: 'center',
      marginBottom: '20px',
      animation: 'pulse 1.5s ease-in-out infinite alternate',
      color: isDark ? '#38bdf8' : '#0ea5e9',
    }
  };

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <style>{`
          @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(30px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @keyframes pulse {
            from { transform: scale(1); opacity: 0.7; }
            to { transform: scale(1.05); opacity: 1; }
          }
        `}</style>

        <div style={styles.box} className="contact-box">
          <div style={styles.icon} className="icon-animation">📞</div>
          <h2 style={styles.title} className="contact-title">Contact Us</h2>
          <p style={styles.description} className="contact-description">
            Have questions or need help with your bookings? Fill out the form below and we'll get back to you shortly.
          </p>

          <form style={styles.form} onSubmit={handleSubmit}>
            <div className="form-group">
              <label style={styles.label} htmlFor="name">Name</label>
              <input
                style={styles.input}
                id="name"
                name="name"
                type="text"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label style={styles.label} htmlFor="email">Email</label>
              <input
                style={styles.input}
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
              <label style={styles.label} htmlFor="message">Message</label>
              <textarea
                style={styles.textarea}
                id="message"
                name="message"
                placeholder="Write your message..."
                rows="4"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button type="submit" style={styles.button}>Send Message</button>
          </form>
        </div>

        <FloatingFAB />
      </div>
    </>
  );
}

export default Contact;
