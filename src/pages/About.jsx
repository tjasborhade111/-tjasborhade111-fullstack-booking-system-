import React, { useContext } from 'react';
import FloatingFAB from './FloatingFAB';
import Navbar from './Navbar'; // ✅ Add this
import { ThemeContext } from '../context/ThemeContext';
import { FaRegCalendarAlt } from 'react-icons/fa';

function About() {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  const styles = {
    container: {
      minHeight: '100vh',
      background: isDark ? '#0f172a' : '#f8fafc',
      color: isDark ? '#cbd5e1' : '#1e293b',
      backgroundImage: isDark
        ? `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
           radial-gradient(circle at 75% 75%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)`
        : `radial-gradient(circle at 25% 25%, rgba(203, 213, 225, 0.2) 0%, transparent 50%),
           radial-gradient(circle at 75% 75%, rgba(191, 219, 254, 0.2) 0%, transparent 50%)`,
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
      zIndex: 2,
      maxWidth: '900px',
      width: '100%',
      background: isDark ? 'rgba(255, 255, 255, 0.06)' : '#ffffff',
      color: isDark ? '#cbd5e1' : '#1e293b',
      backdropFilter: 'blur(18px)',
      WebkitBackdropFilter: 'blur(18px)',
      padding: '50px',
      borderRadius: '20px',
      boxShadow: '0 20px 50px rgba(0, 0, 0, 0.1)',
      border: isDark ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid #ccc',
      animation: 'fadeInUp 1.2s ease-out',
    },
    title: {
      fontSize: '2.8rem',
      fontWeight: 800,
      textAlign: 'center',
      marginBottom: '20px',
      background: isDark
        ? 'linear-gradient(135deg, #ffffff, #cbd5e1)'
        : 'linear-gradient(135deg, #1e293b, #334155)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    text: {
      fontSize: '1.2rem',
      lineHeight: 1.8,
      textAlign: 'justify',
      marginBottom: '20px',
      animation: 'fadeInUp 1.4s ease',
      color: isDark ? '#cbd5e1' : '#334155',
    },
    icon: {
      fontSize: '2.5rem',
      textAlign: 'center',
      animation: 'pulse 1.5s ease-in-out infinite alternate',
      marginBottom: '20px',
      color: isDark ? '#38bdf8' : '#3b82f6',
    },
    bgAnimation: {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: isDark
        ? `radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.03) 0%, transparent 50%),
           radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.03) 0%, transparent 50%)`
        : `radial-gradient(circle at 20% 80%, rgba(100, 100, 255, 0.05) 0%, transparent 50%),
           radial-gradient(circle at 80% 20%, rgba(255, 200, 200, 0.05) 0%, transparent 50%)`,
      animation: 'backgroundMove 20s ease-in-out infinite',
      pointerEvents: 'none',
      zIndex: 1,
    }
  };

  return (
    <>
      <Navbar /> {/* ✅ Render Navbar at top */}
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

          @keyframes backgroundMove {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(10px, -10px); }
          }

          @media (max-width: 768px) {
            .about-title { font-size: 2rem !important; }
            .about-text { font-size: 1rem !important; }
            .icon-animation { font-size: 2rem !important; }
          }

          @media (max-width: 480px) {
            .about-box { padding: 25px 15px !important; }
            .about-title { font-size: 1.6rem !important; }
            .about-text { font-size: 0.95rem !important; line-height: 1.6 !important; }
            .icon-animation { font-size: 1.8rem !important; }
          }
        `}</style>

        <div style={styles.bgAnimation}></div>

        <div style={styles.box} className="about-box">
          <div style={styles.icon} className="icon-animation"><FaRegCalendarAlt /></div>
          <h2 style={styles.title} className="about-title">About Us</h2>
          <p style={styles.text} className="about-text">
            Welcome to our <strong>Online Booking System</strong> — your trusted platform for seamless and efficient appointment management.
            Whether you're booking a doctor’s appointment, a salon visit, or a home service, we make it fast, simple, and hassle-free.
            Our mission is to bring convenience to your fingertips by providing a one-stop solution for all your booking needs.
            With a user-friendly interface, secure login, and instant confirmations, your time is always respected and managed efficiently.
            Start scheduling smarter — anytime, anywhere. Thank you for choosing us!
          </p>
        </div>

        <FloatingFAB />
      </div>
    </>
  );
}

export default About;
