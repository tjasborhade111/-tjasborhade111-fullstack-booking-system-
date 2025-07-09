import React, { useState, useContext } from 'react';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { ThemeContext } from '../context/ThemeContext';

function BookingModal({ category, providerName, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    day: '',
    timing: '',
    symptoms: '',
    subject: '',
    mode: '',
    serviceType: '',
    stylist: '',
    age: ''
  });

  const { theme } = useContext(ThemeContext);

  const isDark = theme === 'dark';

  const dynamicStyles = {
    modal: {
      background: isDark ? '#1e293b' : '#ffffff',
      color: isDark ? '#ffffff' : '#1e293b',
      borderRadius: '12px',
      padding: '30px',
      minWidth: '350px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
    },
    input: {
      padding: '10px',
      borderRadius: '6px',
      border: `1px solid ${isDark ? '#334155' : '#cbd5e1'}`,
      background: isDark ? '#0f172a' : '#f1f5f9',
      color: isDark ? '#fff' : '#1e293b',
    },
    title: {
      fontSize: '1.5rem',
      marginBottom: '20px',
      textAlign: 'center',
      color: isDark ? '#fff' : '#0f172a'
    },
    button: {
      background: '#10b981',
      color: '#fff',
      padding: '10px',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontWeight: 600,
    },
    closeBtn: {
      marginTop: '6px',
      background: '#ef4444',
      color: '#fff',
      border: 'none',
      padding: '8px',
      borderRadius: '6px',
      cursor: 'pointer',
    },
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const userName = localStorage.getItem("userName");

    if (!token || !userId) {
      alert("Please log in first");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          userId,
          userName,
          category,
          provider: providerName
        })
      });

      const result = await response.json();

      if (response.ok) {
        alert("✅ Booking saved successfully!");
        onClose();
      } else {
        alert(`❌ ${result.message}`);
      }
    } catch (err) {
      console.error("❌ Booking error:", err);
      alert("❌ Failed to save booking");
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={dynamicStyles.modal}>
        <h2 style={dynamicStyles.title}>Book Appointment - {providerName}</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input name="name" placeholder="Your Name" required onChange={handleChange} style={dynamicStyles.input} />
          <input name="date" type="date" required onChange={handleChange} style={dynamicStyles.input} />
          <input name="day" placeholder="Day (e.g. Monday)" required onChange={handleChange} style={dynamicStyles.input} />
          <input name="timing" placeholder="Preferred Timing" required onChange={handleChange} style={dynamicStyles.input} />
          <input name="age" placeholder="Age" required onChange={handleChange} style={dynamicStyles.input} />

          {category === 'Doctor' && (
            <input name="symptoms" placeholder="Symptoms" onChange={handleChange} style={dynamicStyles.input} />
          )}

          {category === 'Teacher' && (
            <>
              <input name="subject" placeholder="Subject" onChange={handleChange} style={dynamicStyles.input} />
              <select name="mode" onChange={handleChange} style={dynamicStyles.input}>
                <option value="">Mode</option>
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
              </select>
            </>
          )}

          {category === 'Salon' && (
            <>
              <select name="serviceType" onChange={handleChange} style={dynamicStyles.input}>
                <option value="">Service Type</option>
                <option value="Haircut">Haircut</option>
                <option value="Facial">Facial</option>
                <option value="Manicure">Manicure</option>
              </select>
              <input name="stylist" placeholder="Preferred Stylist" onChange={handleChange} style={dynamicStyles.input} />
            </>
          )}

          <button type="submit" style={dynamicStyles.button}>Confirm Booking</button>
          <button type="button" onClick={onClose} style={dynamicStyles.closeBtn}>Cancel</button>
        </form>
      </div>
    </div>
  );
}

export default BookingModal;

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
};
