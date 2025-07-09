import React, { useState, useEffect, useContext } from 'react';
import BookingModal from './BookingModal';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { ThemeContext } from '../context/ThemeContext';

function TeacherPage() {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  const [hoveredCard, setHoveredCard] = useState(null);
  const [columns, setColumns] = useState(3);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const teachers = [
    {
      name: 'Mrs. Arpita Sharma',
      subject: 'Mathematics',
      experience: '8+ years',
      img: 'https://i.pravatar.cc/150?img=14',
      info: 'Expert in Algebra & Calculus. Teaches at DPS with 95% board results.'
    },
    {
      name: 'Mr. Ravi Joshi',
      subject: 'Science',
      experience: '12+ years',
      img: 'https://i.pravatar.cc/150?img=15',
      info: 'Specialized in Biology & Chemistry. Ex-faculty at Aakash Institute.'
    },
    {
      name: 'Ms. Pooja Kaur',
      subject: 'English',
      experience: '6+ years',
      img: 'https://i.pravatar.cc/150?img=16',
      info: 'Literature & Grammar Expert. Author of 3 English grammar books.'
    },
    {
      name: 'Mr. Kiran Shah',
      subject: 'Computer Science',
      experience: '10+ years',
      img: 'https://i.pravatar.cc/150?img=17',
      info: 'Expert in Python & Web Dev. Works with school robotics clubs.'
    },
    {
      name: 'Mrs. Neetu Jain',
      subject: 'History',
      experience: '15+ years',
      img: 'https://i.pravatar.cc/150?img=18',
      info: 'Ancient & Modern History. CBSE textbook reviewer & trainer.'
    },
    {
      name: 'Mr. Tarun Patel',
      subject: 'Physics',
      experience: '9+ years',
      img: 'https://i.pravatar.cc/150?img=19',
      info: 'Mechanics & Electromagnetism. IIT coaching background.'
    }
  ];

  useEffect(() => {
    const updateCols = () => {
      const w = window.innerWidth;
      if (w < 600) setColumns(1);
      else if (w < 900) setColumns(2);
      else setColumns(3);
    };
    updateCols();
    window.addEventListener('resize', updateCols);
    return () => window.removeEventListener('resize', updateCols);
  }, []);

  const handleBook = (teacher) => {
    setSelectedTeacher(teacher);
    setShowModal(true);
  };

  const toggleInfo = (index) => {
    setSelectedIndex(prev => prev === index ? null : index);
  };

  const styles = {
    page: {
      minHeight: '100vh',
      background: isDark ? '#0f172a' : '#f8fafc',
      padding: '60px 20px',
      fontFamily: 'Inter, sans-serif',
      color: isDark ? '#fff' : '#1e293b',
    },
    title: {
      fontSize: '2.4rem',
      fontWeight: '800',
      textAlign: 'center',
      marginBottom: '10px',
      background: isDark ? 'linear-gradient(135deg, #6ee7b7, #3b82f6)' : 'linear-gradient(135deg, #0ea5e9, #10b981)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    subtitle: {
      textAlign: 'center',
      fontSize: '1.1rem',
      color: isDark ? '#94a3b8' : '#475569',
      marginBottom: '40px',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gap: '30px',
      maxWidth: '1200px',
      margin: '0 auto',
    },
    card: (isActive) => ({
      background: isDark ? (isActive ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.06)') : (isActive ? '#f0fdf4' : '#ecfdf5'),
      border: isDark ? (isActive ? '1px solid #34d399' : '1px solid rgba(255,255,255,0.1)') : '1px solid #bbf7d0',
      borderRadius: '20px',
      padding: '30px',
      textAlign: 'center',
      backdropFilter: 'blur(14px)',
      WebkitBackdropFilter: 'blur(14px)',
      color: isDark ? '#cbd5e1' : '#1e293b',
      boxShadow: isActive ? '0 8px 30px rgba(16, 185, 129, 0.25)' : 'none',
      transform: isActive ? 'scale(1.04)' : 'scale(1)',
      transition: 'all 0.3s ease',
    }),
    img: {
      width: '100px',
      height: '100px',
      borderRadius: '50%',
      objectFit: 'cover',
      marginBottom: '10px',
      border: '3px solid #34d399',
    },
    name: {
      fontSize: '1.2rem',
      fontWeight: 700,
      color: isDark ? '#fefce8' : '#0f172a',
      margin: '10px 0 4px',
    },
    subject: {
      color: isDark ? '#6ee7b7' : '#065f46',
      fontSize: '1rem',
      fontWeight: '600',
      marginBottom: '4px',
    },
    experience: {
      fontSize: '0.8rem',
      background: 'linear-gradient(to right, #34d399, #10b981)',
      color: '#111827',
      padding: '4px 12px',
      borderRadius: '9999px',
      display: 'inline-block',
      marginBottom: '8px',
    },
    button: {
      background: 'linear-gradient(to right, #10b981, #059669)',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '9999px',
      color: '#fff',
      fontWeight: 600,
      fontSize: '0.9rem',
      margin: '6px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    infoText: {
      marginTop: '10px',
      fontSize: '0.95rem',
      color: isDark ? '#bef264' : '#14532d',
      fontWeight: '500',
    }
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Meet Our Expert Teachers</h1>
      <p style={styles.subtitle}>
        Learn from the best educators with years of experience and proven track records
      </p>
      <div style={styles.grid}>
        {teachers.map((t, i) => {
          const isActive = hoveredCard === i || selectedIndex === i;
          return (
            <div
              key={i}
              style={styles.card(isActive)}
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <img src={t.img} alt={t.name} style={styles.img} />
              <div style={styles.experience}>{t.experience}</div>
              <div style={styles.name}>{t.name}</div>
              <div style={styles.subject}>{t.subject}</div>

              <button style={styles.button} onClick={() => handleBook(t)}>
                Book Session
              </button>
              <button style={styles.button} onClick={() => toggleInfo(i)}>
                ℹ More Info
              </button>

              {selectedIndex === i && (
                <div style={styles.infoText}>{t.info}</div>
              )}
            </div>
          );
        })}
      </div>

      {showModal && (
        <BookingModal
          onClose={() => setShowModal(false)}
          provider={selectedTeacher}
          category="teacher"
        />
      )}
    </div>
  );
}

export default TeacherPage;
