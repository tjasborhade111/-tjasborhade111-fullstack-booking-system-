import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';

function BookingCategories() {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [activeCard, setActiveCard] = useState(null);

  const isDark = theme === 'dark';
  const bgColor = isDark ? '#0f172a' : '#f8fafc';
  const boxBg = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.95)';
  const borderColor = isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(59, 130, 246, 0.15)';
  const textColor = isDark ? '#f1f5f9' : '#1e293b';
  const cardBg = isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.8)';
  const cardBorder = isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(59, 130, 246, 0.2)';
  const cardHoverBg = isDark ? 'rgba(255, 255, 255, 0.18)' : 'rgba(59, 130, 246, 0.05)';

  const handleTap = (path, id) => {
    setActiveCard(id);
    setTimeout(() => {
      setActiveCard(null);
      navigate(path);
    }, 200); // slight delay to show animation
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

        .contact-container {
          min-height: 100vh;
          background: ${bgColor};
          background-image:
            radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.12), transparent 60%),
            radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.12), transparent 60%),
            radial-gradient(circle at 60% 40%, rgba(14, 165, 233, 0.08), transparent 70%);
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 80px 20px;
          font-family: 'Inter', sans-serif;
          position: relative;
          overflow: hidden;
        }

        .contact-container::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: 
            linear-gradient(45deg, transparent 49%, rgba(59, 130, 246, 0.03) 50%, transparent 51%),
            linear-gradient(-45deg, transparent 49%, rgba(168, 85, 247, 0.03) 50%, transparent 51%);
          background-size: 60px 60px;
          pointer-events: none;
        }

        .contact-box {
          background: ${boxBg};
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          padding: 50px 40px;
          border-radius: 24px;
          border: 1px solid ${borderColor};
          width: 100%;
          max-width: 700px;
          text-align: center;
          color: ${textColor};
          box-shadow: 
            0 20px 40px rgba(0, 0, 0, 0.1),
            0 8px 16px rgba(0, 0, 0, 0.08),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          position: relative;
          z-index: 1;
        }

        .contact-title {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 12px;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .contact-description {
          margin-bottom: 40px;
          font-size: 1.1rem;
          font-weight: 400;
          opacity: 0.8;
        }

        .category-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 24px;
          margin-top: 20px;
        }

        .category-card {
          background: ${cardBg};
          border: 1px solid ${cardBorder};
          border-radius: 16px;
          padding: 32px 24px;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          box-shadow: 
            0 4px 8px rgba(0, 0, 0, 0.08),
            0 2px 4px rgba(0, 0, 0, 0.06);
        }

        .category-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(168, 85, 247, 0.1));
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .category-card:hover {
          transform: translateY(-8px) scale(1.02);
          background: ${cardHoverBg};
          box-shadow: 
            0 20px 40px rgba(0, 0, 0, 0.15),
            0 8px 16px rgba(0, 0, 0, 0.1);
          border-color: ${isDark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(59, 130, 246, 0.3)'};
        }

        .category-card:hover::before {
          opacity: 1;
        }

        .category-card:active {
          transform: translateY(-4px) scale(1.01);
        }

        .emoji {
          font-size: 3rem;
          margin-bottom: 16px;
          display: block;
          transition: transform 0.3s ease;
        }

        .category-card:hover .emoji {
          transform: scale(1.1) rotate(5deg);
        }

        .category-title {
          font-size: 1.3rem;
          font-weight: 600;
          margin-bottom: 20px;
        }

        .book-btn {
          padding: 12px 24px;
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          color: white;
          font-weight: 600;
          font-size: 0.95rem;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          box-shadow: 
            0 4px 12px rgba(59, 130, 246, 0.3),
            0 2px 4px rgba(59, 130, 246, 0.2);
        }

        .book-btn::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: left 0.5s ease;
        }

        .book-btn:hover {
          background: linear-gradient(135deg, #2563eb, #1d4ed8);
          transform: translateY(-2px);
          box-shadow: 
            0 8px 20px rgba(59, 130, 246, 0.4),
            0 4px 8px rgba(59, 130, 246, 0.3);
        }

        .book-btn:hover::before {
          left: 100%;
        }

        .book-btn:active {
          transform: translateY(0px);
        }

        /* Active bump for mobile tap */
        .active-bump {
          transform: translateY(-6px) scale(1.03) !important;
          transition: transform 0.3s ease, box-shadow 0.3s ease !important;
          box-shadow: 
            0 20px 40px rgba(0, 0, 0, 0.2),
            0 8px 16px rgba(0, 0, 0, 0.12);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .contact-container {
            padding: 40px 16px;
          }

          .contact-box {
            padding: 32px 24px;
          }

          .contact-title {
            font-size: 2rem;
          }

          .category-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .category-card {
            padding: 24px 20px;
          }

          .emoji {
            font-size: 2.5rem;
          }
        }

        ${isDark ? `
          .contact-box {
            box-shadow:
              0 20px 40px rgba(0, 0, 0, 0.3),
              0 8px 16px rgba(0, 0, 0, 0.2);
          }

          .category-card {
            box-shadow: 
              0 4px 8px rgba(0, 0, 0, 0.2),
              0 2px 4px rgba(0, 0, 0, 0.15);
          }

          .category-card:hover {
            box-shadow: 
              0 20px 40px rgba(0, 0, 0, 0.4),
              0 8px 16px rgba(0, 0, 0, 0.3);
          }
        ` : ''}
      `}</style>

      <div className="contact-container">
        <div className="contact-box">
          <h2 className="contact-title">Choose a Booking Category</h2>
          <h3 className="contact-description">Note: Date and time may change. You will be notified via email.</h3>
          <p className="contact-description">Click "Book Now" to continue</p>

          <div className="category-grid">
            <div className={`category-card ${activeCard === 'teacher' ? 'active-bump' : ''}`}>
              <div className="emoji">👩‍🏫</div>
              <div className="category-title">Teacher</div>
              <button className="book-btn" onClick={() => handleTap('/teacher', 'teacher')}>Book Now</button>
            </div>

            <div className={`category-card ${activeCard === 'salon' ? 'active-bump' : ''}`}>
              <div className="emoji">💇‍♀️</div>
              <div className="category-title">Salon</div>
              <button className="book-btn" onClick={() => handleTap('/salon', 'salon')}>Book Now</button>
            </div>

            <div className={`category-card ${activeCard === 'doctor' ? 'active-bump' : ''}`}>
              <div className="emoji">🩺</div>
              <div className="category-title">Doctor</div>
              <button className="book-btn" onClick={() => handleTap('/doctor', 'doctor')}>Book Now</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BookingCategories;
