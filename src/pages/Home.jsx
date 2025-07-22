import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRegCalendarAlt, FaArrowRight } from 'react-icons/fa';
import { ThemeContext } from '../context/ThemeContext';
import Navbar from './Navbar'; // Make sure Navbar file path is correct

function Home() {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const isDark = theme === 'dark';

  const styles = {
    container: {
      minHeight: '100vh',
      background: isDark ? '#0f172a' : '#f1f5f9',
      backgroundImage: isDark
        ? 'radial-gradient(circle at 25% 25%, rgba(56, 189, 248, 0.1), transparent 50%), radial-gradient(circle at 75% 75%, rgba(94, 234, 212, 0.1), transparent 50%)'
        : 'radial-gradient(circle at 25% 25%, rgba(96, 165, 250, 0.1), transparent 50%), radial-gradient(circle at 75% 75%, rgba(167, 243, 208, 0.1), transparent 50%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '80px 20px 40px',
      position: 'relative',
    },
    backgroundLayer: {
      content: '',
      position: 'absolute',
      inset: 0,
      backgroundImage: isDark
        ? 'radial-gradient(circle at 20% 80%, rgba(94, 234, 212, 0.03), transparent 50%), radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.03), transparent 50%)'
        : 'radial-gradient(circle at 20% 80%, rgba(167, 243, 208, 0.03), transparent 50%), radial-gradient(circle at 80% 20%, rgba(96, 165, 250, 0.03), transparent 50%)',
      animation: 'bgMove 20s ease-in-out infinite',
      zIndex: 1,
    },
    box: {
      position: 'relative',
      zIndex: 2,
      background: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(16px)',
      padding: '40px',
      borderRadius: '20px',
      border: isDark ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid #cbd5e1',
      maxWidth: '800px',
      width: '100%',
      boxShadow: '0 20px 50px rgba(0, 0, 0, 0.2)',
      textAlign: 'center',
      color: isDark ? '#e2e8f0' : '#1e293b',
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: 800,
      background: isDark
        ? 'linear-gradient(135deg, #ffffff, #cbd5e1)'
        : 'linear-gradient(135deg, #1e293b, #0f172a)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginBottom: '20px',
    },
    subtitle: {
      fontSize: '1.2rem',
      color: isDark ? '#cbd5e1' : '#334155',
      marginBottom: '15px',
    },
    text: {
      fontSize: '1.05rem',
      color: isDark ? '#cbd5e1' : '#475569',
      lineHeight: 1.6,
      marginBottom: '30px',
    },
    button: {
      background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
      color: '#fff',
      border: 'none',
      padding: '14px 28px',
      borderRadius: '50px',
      fontSize: '1rem',
      fontWeight: 600,
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px',
      boxShadow: '0 8px 25px rgba(59, 130, 246, 0.4)',
      transition: 'transform 0.2s, box-shadow 0.2s',
    },
  };

  return (
    <>
      <Navbar /> {/* 🟡 Navbar added here */}
      <div style={styles.container}>
        <div style={styles.backgroundLayer}></div>
        <div style={styles.box}>
          <h1 style={styles.title}>
            <FaRegCalendarAlt style={{ marginRight: '10px', verticalAlign: 'middle' }} />
            Welcome to Online Booking System
          </h1>
          <p style={styles.subtitle}>
            Book appointments for Teachers, Doctors, or Salons – all in one place.
          </p>
          <p style={styles.text}>
            Plan your appointments effortlessly. Get connected with the best services tailored to your needs.
            <br /><br />
            Whether you're looking for educational support, health consultation, or grooming, we've got it covered.
            Sign up, log in, and manage all your bookings from one place — anytime, anywhere.
          </p>

          <button
            style={styles.button}
            onClick={() => navigate('/categories')}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 12px 35px rgba(59, 130, 246, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.4)';
            }}
          >
            Get Started Today <FaArrowRight />
          </button>
        </div>
      </div>
    </>
  );
}

export default Home;
