// src/App.jsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import TeacherPage from './pages/TeacherPage';
import DoctorPage from './pages/DoctorPage';
import SalonPage from './pages/SalonPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import BookingCategories from './pages/BookingCategories';
import BookingHistory from './pages/BookingHistory';
import ProtectedRoute from './pages/ProtectedRoute';

import FloatingFAB from "./pages/FloatingFAB";
import { ThemeProvider } from "./context/ThemeContext";

import './App.css';

function AppContent() {
  const location = useLocation();

  // ❌ Prevent FloatingFAB on auth routes only
  const authRoutes = ['/login', '/signup'];
  const hideFAB = authRoutes.includes(location.pathname);

  return (
    <div className="app-content">
      <Routes>
        {/* ✅ Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* ✅ Protected Routes */}
        <Route
          path="/categories"
          element={
            <ProtectedRoute>
              <BookingCategories />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher"
          element={
            <ProtectedRoute>
              <TeacherPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor"
          element={
            <ProtectedRoute>
              <DoctorPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/salon"
          element={
            <ProtectedRoute>
              <SalonPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <BookingHistory />
            </ProtectedRoute>
          }
        />
      </Routes>

      {/* ✅ FAB only on non-auth routes */}
      {!hideFAB && <FloatingFAB />}
    </div>
  );
}

function App() {
  useEffect(() => {
    const handleUnload = () => {
      localStorage.removeItem('isLoggedIn');
    };
    window.addEventListener('beforeunload', handleUnload);
    return () => window.removeEventListener('beforeunload', handleUnload);
  }, []);

  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;
