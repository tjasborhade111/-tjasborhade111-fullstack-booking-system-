// ✅ BookingHistory.jsx (Updated with ThemeContext and Enhanced CSS)
import React, { useEffect, useState, useContext } from 'react';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { ThemeContext } from '../context/ThemeContext';

function BookingHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const fetchHistory = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        alert('❌ No userId found. Please login.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/bookings/${userId}`);
        const result = await response.json();
        if (Array.isArray(result)) {
          setHistory(result);
        } else {
          console.error('Unexpected response:', result);
          setHistory([]);
        }
      } catch (error) {
        console.error('❌ Error fetching booking history:', error);
        setHistory([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const getCategoryIcon = (category) => {
    const icons = {
      'education': '📚',
      'health': '🏥',
      'home': '🏠',
      'beauty': '💄',
      'fitness': '💪',
      'technology': '💻',
      'automotive': '🚗',
      'food': '🍕',
      'default': '📋'
    };
    return icons[category?.toLowerCase()] || icons.default;
  };

  const getCategoryColor = (category) => {
    const colors = {
      'education': '#3b82f6',
      'health': '#ef4444',
      'home': '#10b981',
      'beauty': '#f59e0b',
      'fitness': '#8b5cf6',
      'technology': '#06b6d4',
      'automotive': '#f97316',
      'food': '#84cc16',
      'default': '#6b7280'
    };
    return colors[category?.toLowerCase()] || colors.default;
  };

  const bgColor = theme === 'dark' ? '#0f172a' : '#f8fafc';
  const cardBg = theme === 'dark' ? 'rgba(255, 255, 255, 0.06)' : '#ffffff';
  const borderColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.12)' : '#e2e8f0';
  const textColor = theme === 'dark' ? '#cbd5e1' : '#1e293b';
  const subtitleColor = theme === 'dark' ? '#94a3b8' : '#475569';

  return (
    <>
      <style>{`
        .booking-history-container {
          min-height: 100vh;
          background: ${theme === 'dark' 
            ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' 
            : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'};
          padding: 80px 20px;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .history-wrapper {
          max-width: 1200px;
          margin: 0 auto;
        }

        .history-header {
          text-align: center;
          margin-bottom: 50px;
          position: relative;
        }

        .history-header::before {
          content: '';
          position: absolute;
          top: -20px;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 4px;
          background: linear-gradient(90deg, #3b82f6, #8b5cf6);
          border-radius: 2px;
        }

        .history-title {
          color: ${textColor};
          font-size: 3rem;
          font-weight: 700;
          margin-bottom: 16px;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: 0 4px 20px rgba(59, 130, 246, 0.3);
        }

        .history-subtitle {
          color: ${subtitleColor};
          font-size: 1.2rem;
          font-weight: 400;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .loading-spinner {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 200px;
        }

        .spinner {
          width: 60px;
          height: 60px;
          border: 4px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
          border-top: 4px solid #3b82f6;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .no-bookings {
          background: ${cardBg};
          border: 1px solid ${borderColor};
          border-radius: 20px;
          padding: 60px 40px;
          text-align: center;
          max-width: 500px;
          margin: 0 auto;
          box-shadow: ${theme === 'dark' 
            ? '0 20px 40px rgba(0, 0, 0, 0.3)' 
            : '0 20px 40px rgba(0, 0, 0, 0.1)'};
          backdrop-filter: blur(10px);
          border: 1px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.2)'};
        }

        .no-bookings-icon {
          font-size: 4rem;
          margin-bottom: 20px;
          filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
        }

        .no-bookings-title {
          color: ${textColor};
          font-size: 1.8rem;
          font-weight: 600;
          margin-bottom: 12px;
        }

        .no-bookings-text {
          color: ${subtitleColor};
          font-size: 1.1rem;
          line-height: 1.6;
        }

        .booking-stats {
          display: flex;
          gap: 30px;
          justify-content: center;
          margin-bottom: 50px;
          flex-wrap: wrap;
        }

        .stat-item {
          background: ${cardBg};
          border: 1px solid ${borderColor};
          border-radius: 16px;
          padding: 30px 40px;
          text-align: center;
          min-width: 180px;
          position: relative;
          overflow: hidden;
          box-shadow: ${theme === 'dark' 
            ? '0 10px 30px rgba(0, 0, 0, 0.3)' 
            : '0 10px 30px rgba(0, 0, 0, 0.1)'};
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }

        .stat-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #3b82f6, #8b5cf6);
        }

        .stat-item:hover {
          transform: translateY(-5px);
          box-shadow: ${theme === 'dark' 
            ? '0 20px 40px rgba(0, 0, 0, 0.4)' 
            : '0 20px 40px rgba(0, 0, 0, 0.15)'};
        }

        .stat-number {
          display: block;
          font-size: 2.5rem;
          font-weight: 700;
          color: ${textColor};
          margin-bottom: 8px;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .stat-label {
          color: ${subtitleColor};
          font-size: 1rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .booking-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
          gap: 30px;
        }

        .booking-card {
          background: ${cardBg};
          border: 1px solid ${borderColor};
          border-radius: 20px;
          padding: 30px;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
          box-shadow: ${theme === 'dark' 
            ? '0 10px 30px rgba(0, 0, 0, 0.3)' 
            : '0 10px 30px rgba(0, 0, 0, 0.1)'};
          backdrop-filter: blur(10px);
        }

        .booking-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: var(--category-color);
          border-radius: 20px 20px 0 0;
        }

        .booking-card:hover {
          transform: translateY(-8px);
          box-shadow: ${theme === 'dark' 
            ? '0 20px 40px rgba(0, 0, 0, 0.4)' 
            : '0 20px 40px rgba(0, 0, 0, 0.15)'};
          border-color: var(--category-color);
        }

        .card-header {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 25px;
          padding-bottom: 20px;
          border-bottom: 1px solid ${borderColor};
        }

        .category-icon {
          font-size: 2.5rem;
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--category-color);
          border-radius: 16px;
          filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
        }

        .category-title {
          color: ${textColor};
          font-size: 1.4rem;
          font-weight: 600;
          text-transform: capitalize;
          flex: 1;
        }

        .booking-details {
          margin-bottom: 25px;
        }

        .detail-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
          padding: 12px 0;
          border-bottom: 1px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'};
        }

        .detail-row:last-child {
          border-bottom: none;
          margin-bottom: 0;
        }

        .detail-label {
          color: ${subtitleColor};
          font-size: 0.95rem;
          font-weight: 500;
          min-width: 80px;
        }

        .detail-value {
          color: ${textColor};
          font-size: 1rem;
          font-weight: 600;
          text-align: right;
          max-width: 60%;
          word-wrap: break-word;
        }

        .booking-date {
          text-align: center;
          padding-top: 20px;
          border-top: 1px solid ${borderColor};
        }

        .date-text {
          color: ${subtitleColor};
          font-size: 0.9rem;
          font-weight: 500;
          background: ${theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'};
          padding: 8px 16px;
          border-radius: 20px;
          display: inline-block;
        }

        @media (max-width: 768px) {
          .booking-history-container {
            padding: 40px 16px;
          }

          .history-title {
            font-size: 2.2rem;
          }

          .history-subtitle {
            font-size: 1.1rem;
          }

          .booking-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .booking-stats {
            gap: 20px;
          }

          .stat-item {
            min-width: 150px;
            padding: 25px 30px;
          }

          .booking-card {
            padding: 25px;
          }

          .detail-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }

          .detail-value {
            text-align: left;
            max-width: 100%;
          }
        }
      `}</style>

      <div className="booking-history-container">
        <div className="history-wrapper">
          <div className="history-header">
            <h1 className="history-title">📜 Booking History</h1>
            <p className="history-subtitle">Track all your service bookings in one place</p>
          </div>

          {loading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
            </div>
          ) : history.length === 0 ? (
            <div className="no-bookings">
              <div className="no-bookings-icon">📋</div>
              <h3 className="no-bookings-title">No Bookings Yet</h3>
              <p className="no-bookings-text">
                Your booking history will appear here once you make your first booking.
              </p>
            </div>
          ) : (
            <>
              <div className="booking-stats">
                <div className="stat-item">
                  <span className="stat-number">{history.length}</span>
                  <span className="stat-label">Total Bookings</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">
                    {new Set(history.map(b => b.category)).size}
                  </span>
                  <span className="stat-label">Categories</span>
                </div>
              </div>

              <div className="booking-grid">
                {history.map((booking, index) => (
                  <div 
                    key={index} 
                    className="booking-card"
                    style={{ '--category-color': getCategoryColor(booking.category) }}
                  >
                    <div className="card-header">
                      <div className="category-icon">
                        {getCategoryIcon(booking.category)}
                      </div>
                      <div className="category-title">
                        {booking.category || 'General Service'}
                      </div>
                    </div>

                    <div className="booking-details">
                      {booking.provider && (
                        <div className="detail-row">
                          <span className="detail-label">Provider:</span>
                          <span className="detail-value">{booking.provider}</span>
                        </div>
                      )}

                      <div className="detail-row">
                        <span className="detail-label">Service:</span>
                        <span className="detail-value">
                          {booking.serviceType || booking.subject || booking.symptoms || 'N/A'}
                        </span>
                      </div>

                      <div className="detail-row">
                        <span className="detail-label">Name:</span>
                        <span className="detail-value">{booking.name}</span>
                      </div>

                      <div className="detail-row">
                        <span className="detail-label">Age:</span>
                        <span className="detail-value">{booking.age}</span>
                      </div>

                      <div className="detail-row">
                        <span className="detail-label">Time:</span>
                        <span className="detail-value">{booking.timing}</span>
                      </div>
                    </div>

                    <div className="booking-date">
                      <span className="date-text">
                        Booked on {new Date(booking.bookedAt).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default BookingHistory;