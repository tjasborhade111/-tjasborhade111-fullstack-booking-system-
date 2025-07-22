import React, { useEffect, useState, useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

function BookingHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const fetchHistory = async () => {
      const user = JSON.parse(localStorage.getItem('user'));

      if (!user || !user._id) {
        alert("❌ No user found. Please login.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/bookings/user/${user._id}`
        );

        if (!res.ok) {
          throw new Error(`Server responded with status ${res.status}`);
        }

        const data = await res.json();
        setHistory(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("❌ Failed to fetch booking history:", err.message);
        setHistory([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const getCategoryIcon = (category) => {
    const icons = {
      doctor: '🏥',
      teacher: '📚',
      salon: '💇‍♀️',
      default: '📋',
    };
    return icons[category?.toLowerCase()] || icons.default;
  };

  const getCategoryColor = (category) => {
    const colors = {
      doctor: '#ef4444',
      teacher: '#3b82f6',
      salon: '#f59e0b',
      default: '#6b7280',
    };
    return colors[category?.toLowerCase()] || colors.default;
  };

  const formatBookedAt = (datetime) => {
    return new Date(datetime || Date.now()).toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  };

  const textColor = theme === 'dark' ? '#cbd5e1' : '#1e293b';
  const subtitleColor = theme === 'dark' ? '#94a3b8' : '#475569';

  return (
    <>
    <style>{`
  .booking-history-container {
    padding: 2rem;
    background-color: white;
    color: black;
    min-height: 100vh;
  }
     .dark .booking-history-container {
    background-color: #0f172a;
    color: #f1f5f9;
  }

  .history-wrapper {
    max-width: 1000px;
    margin: 0 auto;
  }

  .history-title {
    font-size: 2rem;
    margin-bottom: 0.25rem;
    color: #334155;
  }

  .history-subtitle {
    color: #64748b;
    margin-bottom: 2rem;
  }

  .loading-spinner {
    display: flex;
    justify-content: center;
    margin-top: 3rem;
  }

  .spinner {
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3b82f6;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  .booking-stats {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-bottom: 2rem;
  }

  .stat-item {
    text-align: center;
  }

  .stat-number {
    font-size: 1.75rem;
    font-weight: bold;
    color: #0f172a;
  }

  .stat-label {
    color: #64748b;
  }

  .booking-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
  }

  .booking-card {
   background-color: #1e293b;
   color: #f1f5f9;
   border-color: #334155;
    border: 1px solid #e2e8f0;
    border-left: 6px solid var(--category-color, #6b7280);
    border-radius: 8px;
    padding: 1.25rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.04);
    transition: transform 0.2s;
  }

  .booking-card:hover {
    transform: translateY(-4px);
  }

  .card-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  .category-icon {
    font-size: 1.5rem;
  }

  .category-title {
    font-size: 1.125rem;
    color: var(--category-color, #6b7280);
    color: #334155;
  }

  .dark .category-title {
    color: #cbd5e1;
  }

  .booking-details {
    margin-bottom: 1rem;
  }

  .detail-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    font-size: 0.95rem;
  }

  .detail-label {
    font-weight: 500;
    color: #64748b; 
  }

   .dark .detail-label {
    color: #cbd5e1;
  }

  .detail-value {
    color: #f8fafc;
    max-width: 60%;
    text-align: right;
  }

  .booking-date {
    font-size: 0.85rem;
    color: #64748b;
    text-align: right;
  }
       .dark .booking-date {
    color: #94a3b8;
  }
  .no-bookings {
    text-align: center;
    margin-top: 3rem;
  }
`}
</style>

    <div className="booking-history-container">
      <div className="history-wrapper">
        <h1 className="history-title" style={{ textAlign: 'center' }}>
          📜 Booking History
        </h1>
        <p className="history-subtitle" style={{ textAlign: 'center' }}>
          Track all your service bookings in one place
        </p>

        {loading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
        ) : history.length === 0 ? (
          <div className="no-bookings">
            <h3 style={{ color: textColor }}>No Bookings Yet</h3>
            <p style={{ color: subtitleColor }}>
              Make your first booking to see history here.
            </p>
          </div>
        ) : (
          <>
            <div className="booking-stats">
  <div className="stat-item">
    <div
      className="stat-number"
      style={{ color: theme === 'dark' ? '#f1f5f9' : '#0f172a' }}
    >
      {history.length}
    </div>
    <div
      className="stat-label"
      style={{ color: theme === 'dark' ? '#cbd5e1' : '#64748b' }}
    >
      Total Bookings
    </div>
  </div>
  <div className="stat-item">
    <div
      className="stat-number"
      style={{ color: theme === 'dark' ? '#f1f5f9' : '#0f172a' }}
    >
      {new Set(history.map((b) => b.category)).size}
    </div>
    <div
      className="stat-label"
      style={{ color: theme === 'dark' ? '#cbd5e1' : '#64748b' }}
    >
      Categories
    </div>
  </div>
</div>

            <div className="booking-grid">
              {history.map((booking, index) => {
                const category = booking.category?.toLowerCase();

                return (
                  <div
                    key={index}
                    className="booking-card"
                    style={{
                      '--category-color': getCategoryColor(category),
                    }}
                  >
                    <div className="card-header">
                      <div className="category-icon">
                        {getCategoryIcon(category)}
                      </div>
                      <div className="category-title">
                        {booking.category || "Service"}
                      </div>
                    </div>

                    <div className="booking-details">
                      {booking.appointmentWith && (
                        <div className="detail-row">
                          <span className="detail-label">Appointment With:</span>
                          <span className="detail-value">
                            {booking.appointmentWith}
                          </span>
                        </div>
                      )}

                      {category === "doctor" && booking.symptoms && (
                        <div className="detail-row">
                          <span className="detail-label">Symptoms:</span>
                          <span className="detail-value">{booking.symptoms}</span>
                        </div>
                      )}

                      {category === "teacher" && (
                        <>
                          <div className="detail-row">
                            <span className="detail-label">Subject:</span>
                            <span className="detail-value">
                              {booking.subject || "N/A"}
                            </span>
                          </div>
                          <div className="detail-row">
                            <span className="detail-label">Mode:</span>
                            <span className="detail-value">
                              {booking.mode || "N/A"}
                            </span>
                          </div>
                        </>
                      )}

                      {category === "salon" && (
                        <>
                          <div className="detail-row">
                            <span className="detail-label">Service Type:</span>
                            <span className="detail-value">
                              {booking.serviceType || "N/A"}
                            </span>
                          </div>
                          <div className="detail-row">
                            <span className="detail-label">Stylist:</span>
                            <span className="detail-value">
                              {booking.stylist || "N/A"}
                            </span>
                          </div>
                        </>
                      )}

                      <div className="detail-row">
                        <span className="detail-label">Name:</span>
                        <span className="detail-value">
                          {booking.name || "N/A"}
                        </span>
                      </div>

                      <div className="detail-row">
                        <span className="detail-label">Age:</span>
                        <span className="detail-value">
                          {booking.age || "N/A"}
                        </span>
                      </div>

                      <div className="detail-row">
                        <span className="detail-label">Appointment:</span>
                        <span className="detail-value">
                          {booking.date && booking.time
                            ? `${booking.date} at ${booking.time}`
                            : "N/A"}
                        </span>
                      </div>
                    </div>

                    <div className="booking-date">
                      <span className="date-text">
                        Booked on {formatBookedAt(booking.createdAt)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
</>
  )
}
export default BookingHistory;
