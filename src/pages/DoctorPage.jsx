import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import BookingModal from './BookingModal'; // ✅ Make sure path is correct

function DoctorPage() {
  const [hovered, setHovered] = useState(null);
  const [columns, setColumns] = useState(3);
  const [selectedDoctorIndex, setSelectedDoctorIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null); // ✅ single source

  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  const doctors = [
    {
      name: 'Dr. Ansh Mehta',
      specialty: 'Cardiologist',
      img: 'https://i.pravatar.cc/150?img=8',
      info: 'Over 15 years of experience in cardiac surgery at Fortis Hospital.'
    },
    {
      name: 'Dr. Riya Singh',
      specialty: 'Dermatologist',
      img: 'https://i.pravatar.cc/150?img=9',
      info: 'Skin and hair specialist practicing at DermaPlus Clinic.'
    },
    {
      name: 'Dr. Neha Roy',
      specialty: 'Pediatrician',
      img: 'https://i.pravatar.cc/150?img=10',
      info: '12 years of pediatric care at Apollo Hospital.'
    },
    {
      name: 'Dr. Amit Verma',
      specialty: 'Neurologist',
      img: 'https://i.pravatar.cc/150?img=11',
      info: 'Expert in brain and spine disorders, works at Max Healthcare.'
    },
    {
      name: 'Dr. Vedante Rao',
      specialty: 'Gynecologist',
      img: 'https://i.pravatar.cc/150?img=12',
      info: 'Women’s health expert with 10+ years at Cloudnine Hospital.'
    },
    {
      name: 'Dr. Kunal Das',
      specialty: 'General Physician',
      img: 'https://i.pravatar.cc/150?img=13',
      info: 'Family doctor and general physician available on weekdays.'
    }
  ];

  useEffect(() => {
    const updateCols = () => {
      const width = window.innerWidth;
      if (width < 600) setColumns(1);
      else if (width < 900) setColumns(2);
      else setColumns(3);
    };
    updateCols();
    window.addEventListener('resize', updateCols);
    return () => window.removeEventListener('resize', updateCols);
  }, []);

  const handleInfo = (index) => {
    setSelectedDoctorIndex(prev => prev === index ? null : index);
  };

  const styles = {
    wrapper: {
      minHeight: '100vh',
      background: isDark ? '#0f172a' : '#f9fafb',
      padding: '60px 20px',
      fontFamily: 'Inter, sans-serif',
      color: isDark ? '#fff' : '#1e293b',
    },
    title: {
      fontSize: '2.4rem',
      textAlign: 'center',
      fontWeight: '800',
      marginBottom: '10px',
      background: isDark ? 'linear-gradient(135deg, #38bdf8, #14b8a6)' : 'linear-gradient(135deg, #0ea5e9, #1e3a8a)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    subtitle: {
      textAlign: 'center',
      fontSize: '1.1rem',
      color: isDark ? '#7dd3fc' : '#475569',
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
      background: isDark ? (isActive ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.06)') : '#ffffff',
      border: isDark ? (isActive ? '1px solid #38bdf8' : '1px solid rgba(255,255,255,0.1)') : '1px solid #cbd5e1',
      borderRadius: '20px',
      padding: '30px',
      textAlign: 'center',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      color: isDark ? '#cbd5e1' : '#1e293b',
      boxShadow: isActive ? '0 8px 30px rgba(56, 189, 248, 0.25)' : 'none',
      transform: isActive ? 'scale(1.04)' : 'scale(1)',
      transition: 'all 0.3s ease',
    }),
    img: {
      width: '100px',
      height: '100px',
      borderRadius: '50%',
      objectFit: 'cover',
      marginBottom: '12px',
      border: '3px solid #38bdf8',
    },
    name: {
      fontSize: '1.2rem',
      fontWeight: 600,
      marginBottom: '5px',
      color: isDark ? '#fefce8' : '#1e293b',
    },
    specialty: {
      fontSize: '0.95rem',
      color: isDark ? '#7dd3fc' : '#2563eb',
      marginBottom: '10px',
    },
    button: {
      margin: '6px',
      padding: '10px 18px',
      borderRadius: '9999px',
      background: isDark ? 'linear-gradient(135deg, #0ea5e9, #14b8a6)' : 'linear-gradient(135deg, #3b82f6, #2563eb)',
      color: 'white',
      fontWeight: '600',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    infoText: {
      marginTop: '12px',
      fontSize: '0.95rem',
      color: isDark ? '#bef264' : '#166534',
      fontWeight: '500',
      animation: 'fadeIn 0.4s ease-in-out',
    }
  };

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.title}>Meet Our Doctors</h2>
      <p style={styles.subtitle}>Experienced specialists for all your healthcare needs</p>

      <div style={styles.grid}>
        {doctors.map((doc, i) => {
          const isActive = hovered === i || selectedDoctorIndex === i;

          return (
            <div
              key={i}
              style={styles.card(isActive)}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <img src={doc.img} alt={doc.name} style={styles.img} />
              <div style={styles.name}>{doc.name}</div>
              <div style={styles.specialty}>{doc.specialty}</div>

              <button
                style={styles.button}
                onClick={() => {
                  setSelectedDoctor(doc);  // ✅ Pass full doctor object
                  setShowModal(true);      // ✅ Show booking modal
                }}
              >
                Book Now
              </button>

              <button style={styles.button} onClick={() => handleInfo(i)}>
                ℹ More Info
              </button>

              {selectedDoctorIndex === i && (
                <div style={styles.infoText}>{doc.info}</div>
              )}
            </div>
          );
        })}
      </div>

      {showModal && selectedDoctor && (
        <BookingModal
          category="Doctor"
          provider={selectedDoctor}         // ✅ full doctor object
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default DoctorPage;
