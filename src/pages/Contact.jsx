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
      padding: '80px 16px 40px 16px',
      fontFamily: 'Inter, sans-serif',
    },
    box: {
      width: '100%',
      maxWidth: '480px',
      background: isDark ? 'rgba(255, 255, 255, 0.05)' : '#ffffff',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      padding: '40px 32px',
      borderRadius: '16px',
      boxShadow: '0 16px 40px rgba(0, 0, 0, 0.2)',
      border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #e5e7eb',
      animation: 'fadeInUp 1s ease-out',
      boxSizing: 'border-box',
      margin: '0 auto',
    },
    title: {
      fontSize: '1.8rem',
      fontWeight: 800,
      textAlign: 'center',
      marginBottom: '12px',
      color: isDark ? '#e2e8f0' : '#1e293b',
    },
    description: {
      textAlign: 'center',
      fontSize: '1rem',
      marginBottom: '32px',
      color: isDark ? '#cbd5e1' : '#475569',
      lineHeight: '1.5',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    },
    fieldContainer: {
      marginBottom: '4px',
    },
    label: {
      display: 'block',
      fontSize: '0.95rem',
      fontWeight: '600',
      color: isDark ? '#e0e7ff' : '#1e293b',
      marginBottom: '8px',
    },
    input: {
      width: '100%',
      padding: '14px 16px',
      fontSize: '1rem',
      border: isDark ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid #cbd5e1',
      borderRadius: '8px',
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.08)' : '#f9fafb',
      color: isDark ? '#f8fafc' : '#1e293b',
      boxSizing: 'border-box',
      transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    },
    textarea: {
      width: '100%',
      padding: '14px 16px',
      fontSize: '1rem',
      border: isDark ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid #cbd5e1',
      borderRadius: '8px',
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.08)' : '#f9fafb',
      color: isDark ? '#f8fafc' : '#1e293b',
      resize: 'vertical',
      minHeight: '120px',
      boxSizing: 'border-box',
      fontFamily: 'Inter, sans-serif',
      lineHeight: '1.5',
      transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    },
    button: {
      padding: '16px 24px',
      background: isDark ? '#3b82f6' : '#2563eb',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '1rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      textTransform: 'uppercase',
      letterSpacing: '0.8px',
      transition: 'all 0.3s ease',
      marginTop: '12px',
      boxSizing: 'border-box',
    },
    icon: {
      fontSize: '2rem',
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
          
          @media (max-width: 768px) {
            .contact-container {
              padding: 60px 12px 30px 12px !important;
            }
            .contact-box {
              padding: 32px 24px !important;
              max-width: 100% !important;
              margin: 0 8px !important;
            }
            .contact-title {
              font-size: 1.6rem !important;
            }
            .contact-description {
              font-size: 0.95rem !important;
              margin-bottom: 28px !important;
            }
            .contact-form {
              gap: 18px !important;
            }
            .contact-input, .contact-textarea {
              padding: 12px 14px !important;
              font-size: 0.95rem !important;
            }
            .contact-button {
              padding: 14px 20px !important;
              font-size: 0.95rem !important;
            }
          }
          
          @media (max-width: 480px) {
            .contact-container {
              padding: 50px 8px 25px 8px !important;
            }
            .contact-box {
              padding: 28px 20px !important;
              border-radius: 12px !important;
            }
            .contact-title {
              font-size: 1.5rem !important;
            }
            .contact-form {
              gap: 16px !important;
            }
            .contact-textarea {
              min-height: 100px !important;
            }
          }
          
          .contact-input:focus, .contact-textarea:focus {
            outline: none;
            border-color: ${isDark ? '#60a5fa' : '#3b82f6'};
            box-shadow: 0 0 0 3px ${isDark ? 'rgba(96, 165, 250, 0.1)' : 'rgba(59, 130, 246, 0.1)'};
          }
          
          .contact-button:hover {
            background: ${isDark ? '#2563eb' : '#1d4ed8'} !important;
            transform: translateY(-1px);
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
          }
          
          .contact-button:active {
            transform: translateY(0);
          }
        `}</style>

        <div 
          className="contact-box"
          style={{
            ...styles.box,
          }}
        >
          <div style={styles.icon}>📞</div>
          <h2 
            className="contact-title"
            style={styles.title}
          >
            Contact Us
          </h2>
          <p 
            className="contact-description"
            style={styles.description}
          >
            Have questions or need help with your bookings? Fill out the form below and we'll get back to you shortly.
          </p>

          <form 
            className="contact-form"
            style={styles.form} 
            onSubmit={handleSubmit}
          >
            <div style={styles.fieldContainer}>
              <label style={styles.label} htmlFor="name">Name</label>
              <input
                className="contact-input"
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

            <div style={styles.fieldContainer}>
              <label style={styles.label} htmlFor="email">Email</label>
              <input
                className="contact-input"
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

            <div style={styles.fieldContainer}>
              <label style={styles.label} htmlFor="message">Message</label>
              <textarea
                className="contact-textarea"
                style={styles.textarea}
                id="message"
                name="message"
                placeholder="Write your message..."
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button 
              className="contact-button"
              type="submit" 
              style={styles.button}
            >
              Send Message
            </button>
          </form>
        </div>
        <FloatingFAB />
      </div>
    </>
  );
}

export default Contact;