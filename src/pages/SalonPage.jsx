import React, { useState, useEffect, useContext } from 'react';
import BookingModal from './BookingModal';
import { ThemeContext } from '../context/ThemeContext';

function SalonPage() {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  const [hovered, setHovered] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [columns, setColumns] = useState(3);
  const [showModal, setShowModal] = useState(false);
  const [selectedSalon, setSelectedSalon] = useState(null);

  const salons = [
    {
      name: 'Glow Salon',
      service: 'Haircut & Styling',
      img: 'https://i.pravatar.cc/150?img=21',
      info: 'Stylists with 10+ years experience in modern haircuts and grooming.'
    },
    {
      name: 'Bliss Beauty',
      service: 'Facials & Skincare',
      img: 'https://i.pravatar.cc/150?img=22',
      info: 'Known for natural facials and personalized skincare treatments.'
    },
    {
      name: 'Style Studio',
      service: 'Hair Color & Spa',
      img: 'https://i.pravatar.cc/150?img=23',
      info: 'Premium hair color services using ammonia-free organic products.'
    },
    {
      name: 'Urban Beauty',
      service: 'Makeup & Grooming',
      img: 'https://i.pravatar.cc/150?img=24',
      info: 'Specialists in bridal, HD and event makeup styles.'
    },
    {
      name: 'Elite Salon',
      service: 'Nail Art & Manicure',
      img: 'https://i.pravatar.cc/150?img=25',
      info: 'Trendy nail designs and long-lasting manicures using gel polish.'
    },
    {
      name: 'Luxe Looks',
      service: 'Massage & Relaxation',
      img: 'https://i.pravatar.cc/150?img=26',
      info: 'Full-body massages and therapeutic spa sessions by certified pros.'
    }
  ];

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 600) setColumns(1);
      else if (width < 900) setColumns(2);
      else setColumns(3);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleInfo = (index) => {
    setSelectedIndex(prev => (prev === index ? null : index));
  };

  const handleBook = (salon) => {
    setSelectedSalon(salon);
    setShowModal(true);
  };

  const styles = {
    wrapper: {
      minHeight: '100vh',
      background: isDark ? '#0f172a' : '#f8fafc',
      backgroundImage: isDark
        ? 'radial-gradient(circle at 25% 25%, rgba(236, 72, 153, 0.08), transparent 50%), radial-gradient(circle at 75% 75%, rgba(251, 191, 36, 0.08), transparent 50%)'
        : 'radial-gradient(circle at 25% 25%, rgba(252, 165, 165, 0.08), transparent 50%), radial-gradient(circle at 75% 75%, rgba(253, 224, 71, 0.08), transparent 50%)',
      padding: '40px 20px',
      fontFamily: 'Inter, sans-serif',
      color: isDark ? '#fff' : '#1e293b'
    },
    title: {
      fontSize: '2.2rem',
      textAlign: 'center',
      fontWeight: '800',
      marginBottom: '10px',
      background: isDark ? 'linear-gradient(135deg, #f472b6, #facc15)' : 'linear-gradient(135deg, #be185d, #ca8a04)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    subtitle: {
      textAlign: 'center',
      fontSize: '1rem',
      color: isDark ? '#fcd34d' : '#78350f',
      marginBottom: '30px',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gap: '24px',
      maxWidth: '1200px',
      margin: '0 auto',
    },
    card: (isActive) => ({
      background: isDark ? (isActive ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.06)') : (isActive ? '#fff7ed' : '#fff1f2'),
      border: isDark ? (isActive ? '1px solid #f472b6' : '1px solid rgba(255,255,255,0.1)') : '1px solid #fca5a5',
      borderRadius: '20px',
      padding: '24px',
      textAlign: 'center',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      color: isDark ? '#cbd5e1' : '#1e293b',
      transition: 'all 0.3s ease',
      transform: isActive ? 'scale(1.04)' : 'scale(1)',
      boxShadow: isActive ? '0 8px 30px rgba(236, 72, 153, 0.25)' : 'none',
    }),
    img: {
      width: '90px',
      height: '90px',
      borderRadius: '50%',
      objectFit: 'cover',
      marginBottom: '12px',
      border: '3px solid #f472b6',
    },
    name: {
      fontSize: '1.1rem',
      fontWeight: 600,
      marginBottom: '5px',
      color: isDark ? '#fefce8' : '#1e293b',
    },
    service: {
      fontSize: '0.95rem',
      color: isDark ? '#fcd34d' : '#ea580c',
      marginBottom: '10px',
    },
    button: {
      marginTop: '10px',
      padding: '10px 20px',
      borderRadius: '9999px',
      background: 'linear-gradient(135deg, #ec4899, #f59e0b)',
      color: 'white',
      fontWeight: '600',
      border: 'none',
      cursor: 'pointer',
      margin: '6px',
      transition: 'all 0.3s ease',
    },
    info: {
      marginTop: '10px',
      fontSize: '0.95rem',
      color: isDark ? '#f9a8d4' : '#7f1d1d',
    },
  };

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.title}>Top Rated Salons</h2>
      <p style={styles.subtitle}>Pamper yourself with premium beauty services</p>
      <div style={styles.grid}>
        {salons.map((s, i) => {
          const isActive = hovered === i || selectedIndex === i;
          return (
            <div
              key={i}
              style={styles.card(isActive)}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <img src={s.img} alt={s.name} style={styles.img} />
              <div style={styles.name}>{s.name}</div>
              <div style={styles.service}>{s.service}</div>

              <button
                style={styles.button}
                onClick={() => handleBook(s)}
              >
                Book Now
              </button>

              <button style={styles.button} onClick={() => toggleInfo(i)}>
                ℹ More Info
              </button>

              {selectedIndex === i && <div style={styles.info}>{s.info}</div>}
            </div>
          );
        })}
      </div>

      {showModal && (
        <BookingModal
          onClose={() => setShowModal(false)}
          providerName={selectedSalon.name}
          category="Salon"
        />
      )}
    </div>
  );
}

export default SalonPage;
