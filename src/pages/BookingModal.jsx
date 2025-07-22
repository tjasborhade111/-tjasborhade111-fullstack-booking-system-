import React, { useState, useContext, useMemo } from 'react';
import { ThemeContext } from '../context/ThemeContext';

function BookingModal({ category, onClose }) {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  // ----- helpers -----
  const tomorrow = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  }, []);

  // ----- form state -----
  const [formData, setFormData] = useState({
    appointmentWith: '',
    name: '',
    age: '',
    date: '',
    time: '',
    // doctor
    symptoms: '',
    // teacher
    subject: '',
    mode: '',
    // salon
    serviceType: '',
    stylist: '',
  });

  // ----- derived flags -----
  const cat = (category || '').toLowerCase();
  const isDoctor = cat === 'doctor';
  const isTeacher = cat === 'teacher';
  const isSalon  = cat === 'salon';

  // ----- handlers -----
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    if (!user || !user._id || !token) {
      alert('❌ Please log in first');
      return;
    }

    // Build payload: include all possible fields; backend can ignore unused ones.
    const payload = {
      userId: user._id,
      userName: user.name, // from logged-in user
      category,
      appointmentWith: formData.appointmentWith,
      name: formData.name || user.name, // fallback
      age: formData.age || null,
      date: formData.date,
      time: formData.time,
      symptoms: isDoctor ? formData.symptoms : null,
      subject:  isTeacher ? formData.subject : null,
      mode:     isTeacher ? formData.mode : null,
      serviceType: isSalon ? formData.serviceType : null,
      stylist:     isSalon ? formData.stylist : null,
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        alert('✅ Booking saved successfully!');
        onClose();
      } else {
        alert(`❌ ${result.message || 'Booking failed'}`);
      }
    } catch (err) {
      console.error('❌ Booking error:', err);
      alert('❌ Failed to save booking');
    }
  };

  // ----- styles -----
const dynamicStyles = {
  modal: {
    background: isDark 
      ? 'linear-gradient(135deg, #1e293b 0%, #334155 100%)' 
      : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
    color: isDark ? '#f8fafc' : '#1e293b',
    borderRadius: '20px',
    padding: '40px',
    minWidth: '400px',
    maxWidth: '95vw',
    maxHeight: '90vh',
    overflowY: 'auto',
    boxShadow: isDark 
      ? '0 25px 60px -10px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05)' 
      : '0 25px 60px -10px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05)',
    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
    transform: 'scale(1)',
    backdropFilter: 'blur(20px)',
    position: 'relative',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 800,
    marginBottom: '32px',
    textAlign: 'center',
    color: isDark ? '#f1f5f9' : '#1e293b',
    letterSpacing: '-0.025em',
    lineHeight: '1.2',
    background: isDark 
      ? 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%)' 
      : 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  label: {
    fontSize: '0.875rem',
    fontWeight: 600,
    marginBottom: '8px',
    color: isDark ? '#e2e8f0' : '#475569',
    letterSpacing: '0.025em',
    textTransform: 'uppercase',
  },
  input: {
    padding: '14px 16px',
    borderRadius: '12px',
    border: `2px solid ${isDark ? '#475569' : '#e2e8f0'}`,
    background: isDark 
      ? 'rgba(15, 23, 42, 0.8)' 
      : 'rgba(255, 255, 255, 0.8)',
    color: isDark ? '#f1f5f9' : '#1e293b',
    fontSize: '1rem',
    fontWeight: 500,
    outline: 'none',
    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
    backdropFilter: 'blur(8px)',
    '&:focus': {
      borderColor: isDark ? '#60a5fa' : '#3b82f6',
      boxShadow: `0 0 0 4px ${isDark ? 'rgba(96, 165, 250, 0.2)' : 'rgba(59, 130, 246, 0.2)'}`,
      transform: 'translateY(-1px)',
    },
    '&:hover': {
      borderColor: isDark ? '#64748b' : '#cbd5e1',
      transform: 'translateY(-1px)',
    },
  },
  select: {
    padding: '14px 16px',
    borderRadius: '12px',
    border: `2px solid ${isDark ? '#475569' : '#e2e8f0'}`,
    background: isDark 
      ? 'rgba(15, 23, 42, 0.8)' 
      : 'rgba(255, 255, 255, 0.8)',
    color: isDark ? '#f1f5f9' : '#1e293b',
    fontSize: '1rem',
    fontWeight: 500,
    width: '100%',
    outline: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
    backdropFilter: 'blur(8px)',
    appearance: 'none',
    backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='${isDark ? '%23cbd5e1' : '%23475569'}' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 12px center',
    backgroundSize: '20px',
    paddingRight: '45px',
    '&:focus': {
      borderColor: isDark ? '#60a5fa' : '#3b82f6',
      boxShadow: `0 0 0 4px ${isDark ? 'rgba(96, 165, 250, 0.2)' : 'rgba(59, 130, 246, 0.2)'}`,
      transform: 'translateY(-1px)',
    },
    '&:hover': {
      borderColor: isDark ? '#64748b' : '#cbd5e1',
      transform: 'translateY(-1px)',
    },
  },
  buttonPrimary: {
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    color: '#ffffff',
    padding: '16px 24px',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    fontWeight: 700,
    fontSize: '1rem',
    letterSpacing: '0.025em',
    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 4px 20px rgba(16, 185, 129, 0.3)',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 30px rgba(16, 185, 129, 0.4)',
      background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
    },
    '&:active': {
      transform: 'translateY(0px)',
      boxShadow: '0 2px 10px rgba(16, 185, 129, 0.3)',
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: '-100%',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
      transition: 'left 0.5s',
    },
    '&:hover::before': {
      left: '100%',
    },
  },
  buttonCancel: {
    marginTop: '16px',
    background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
    color: '#ffffff',
    border: 'none',
    padding: '14px 20px',
    borderRadius: '12px',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: '0.95rem',
    letterSpacing: '0.025em',
    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
    boxShadow: '0 4px 20px rgba(239, 68, 68, 0.2)',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 30px rgba(239, 68, 68, 0.3)',
      background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
    },
    '&:active': {
      transform: 'translateY(0px)',
      boxShadow: '0 2px 10px rgba(239, 68, 68, 0.2)',
    },
  },
  fieldGroup: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  twoCol: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
  },
  half: {
    flex: '1 1 180px',
    minWidth: '180px',
  },
  // Additional utility styles
  inputFocus: {
    borderColor: isDark ? '#60a5fa' : '#3b82f6',
    boxShadow: `0 0 0 4px ${isDark ? 'rgba(96, 165, 250, 0.2)' : 'rgba(59, 130, 246, 0.2)'}`,
    transform: 'translateY(-1px)',
  },
  inputError: {
    borderColor: '#ef4444',
    boxShadow: '0 0 0 4px rgba(239, 68, 68, 0.2)',
  },
  helperText: {
    fontSize: '0.8rem',
    color: isDark ? '#94a3b8' : '#64748b',
    marginTop: '6px',
    fontWeight: 400,
  },
  errorText: {
    fontSize: '0.8rem',
    color: '#ef4444',
    marginTop: '6px',
    fontWeight: 500,
  },
  // Loading state for buttons
  buttonLoading: {
    opacity: 0.7,
    cursor: 'not-allowed',
    transform: 'none',
  },
  // Responsive breakpoints
// Update this part in your `dynamicStyles` object
'@media (max-width: 480px)': {
  modal: {
    padding: '20px',
    minWidth: 'unset',
    width: '100%',
    margin: '16px',
    borderRadius: '12px',
    maxHeight: '90vh',
    overflowY: 'auto',
  },
  title: {
    fontSize: '1.5rem',
    marginBottom: '20px',
  },
  twoCol: {
    flexDirection: 'column',
    gap: '16px',
  },
  half: {
    flex: '1 1 100%',
    minWidth: '100%',
  },
  input: {
    fontSize: '0.95rem',
    padding: '12px 14px',
  },
  select: {
    fontSize: '0.95rem',
    padding: '12px 14px',
    paddingRight: '40px',
  },
  buttonPrimary: {
    fontSize: '0.95rem',
    padding: '14px 18px',
  },
  buttonCancel: {
    fontSize: '0.9rem',
    padding: '12px 16px',
  },
  label: {
    fontSize: '0.8rem',
  },
}

};


  return (
    <div style={overlayStyles}>
      <div style={dynamicStyles.modal}>
        <h2 style={dynamicStyles.title}>Book Appointment – {category}</h2>

        <form onSubmit={handleSubmit} style={dynamicStyles.form}>

          {/* Appointment With */}
          <div style={dynamicStyles.fieldGroup}>
            <label style={dynamicStyles.label} htmlFor="appointmentWith">
              {isDoctor ? 'Doctor / Clinic' :
               isTeacher ? 'Teacher / Tutor' :
               isSalon  ? 'Salon / Technician' :
               'Appointment With'}
            </label>
            <input
              id="appointmentWith"
              name="appointmentWith"
              placeholder="e.g. Dr. Smith"
              onChange={handleChange}
              value={formData.appointmentWith}
              style={dynamicStyles.input}
              required
            />
          </div>

          {/* Name + Age (two columns) */}
          <div style={dynamicStyles.twoCol}>
            <div style={dynamicStyles.half}>
              <label style={dynamicStyles.label} htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                placeholder="Your name"
                onChange={handleChange}
                value={formData.name}
                style={dynamicStyles.input}
              />
            </div>
            <div style={dynamicStyles.half}>
              <label style={dynamicStyles.label} htmlFor="age">Age</label>
              <input
                id="age"
                name="age"
                type="number"
                min="0"
                max="120"
                placeholder="Age"
                onChange={handleChange}
                value={formData.age}
                style={dynamicStyles.input}
              />
            </div>
          </div>

          {/* Doctor-only: Symptoms */}
          {isDoctor && (
            <div style={dynamicStyles.fieldGroup}>
              <label style={dynamicStyles.label} htmlFor="symptoms">Symptoms</label>
              <input
                id="symptoms"
                name="symptoms"
                placeholder="Headache, fever..."
                onChange={handleChange}
                value={formData.symptoms}
                style={dynamicStyles.input}
              />
            </div>
          )}

          {/* Teacher-only: Subject + Mode */}
          {isTeacher && (
            <>
              <div style={dynamicStyles.fieldGroup}>
                <label style={dynamicStyles.label} htmlFor="subject">Subject</label>
                <input
                  id="subject"
                  name="subject"
                  placeholder="Math, English..."
                  onChange={handleChange}
                  value={formData.subject}
                  style={dynamicStyles.input}
                />
              </div>
              <div style={dynamicStyles.fieldGroup}>
                <label style={dynamicStyles.label} htmlFor="mode">Mode</label>
                <select
                  id="mode"
                  name="mode"
                  onChange={handleChange}
                  value={formData.mode}
                  style={dynamicStyles.select}
                >
                  <option value="">-- Select Mode --</option>
                  <option value="Online">Online</option>
                  <option value="In-Person">In-Person</option>
                </select>
              </div>
            </>
          )}

          {/* Salon-only: Service Type + Stylist */}
          {isSalon && (
            <>
              <div style={dynamicStyles.fieldGroup}>
                <label style={dynamicStyles.label} htmlFor="serviceType">Service Type</label>
                <input
                  id="serviceType"
                  name="serviceType"
                  placeholder="Haircut, Facial..."
                  onChange={handleChange}
                  value={formData.serviceType}
                  style={dynamicStyles.input}
                />
              </div>
              <div style={dynamicStyles.fieldGroup}>
                <label style={dynamicStyles.label} htmlFor="stylist">Stylist</label>
                <input
                  id="stylist"
                  name="stylist"
                  placeholder="Stylist name"
                  onChange={handleChange}
                  value={formData.stylist}
                  style={dynamicStyles.input}
                />
              </div>
            </>
          )}

          {/* Date + Time */}
          <div style={dynamicStyles.twoCol}>
            <div style={dynamicStyles.half}>
              <label style={dynamicStyles.label} htmlFor="date">Date</label>
              <input
                id="date"
                name="date"
                type="date"
                min={tomorrow}
                onChange={handleChange}
                value={formData.date}
                style={dynamicStyles.input}
                required
              />
            </div>
            <div style={dynamicStyles.half}>
              <label style={dynamicStyles.label} htmlFor="time">Time</label>
              <input
                id="time"
                name="time"
                type="time"
                onChange={handleChange}
                value={formData.time}
                style={dynamicStyles.input}
                required
              />
            </div>
          </div>

          <button type="submit" style={dynamicStyles.buttonPrimary}>
            Confirm Booking
          </button>
          <button type="button" onClick={onClose} style={dynamicStyles.buttonCancel}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default BookingModal;

// Overlay outside component to avoid re-creation
const overlayStyles = {
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
};
