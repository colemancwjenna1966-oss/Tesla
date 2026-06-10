import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import FanDashboard from './pages/FanDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Support from './pages/Support';
import PrizeDetails from './pages/PrizeDetails';
import Profile from './pages/Profile';
import JokeGenerator from './pages/JokeGenerator';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole');
    if (token) {
      setIsAuthenticated(true);
      setUserRole(role);
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    setIsAuthenticated(false);
    setUserRole(null);
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-gray-50">
        {isAuthenticated && <Navbar onLogout={handleLogout} />}
        <Routes>
          {!isAuthenticated ? (
            <>
              <Route path="/" element={<Login setAuth={setIsAuthenticated} setRole={setUserRole} />} />
              <Route path="/login" element={<Login setAuth={setIsAuthenticated} setRole={setUserRole} />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          ) : (
            <>
              {userRole === 'fan' ? (
                <>
                  <Route path="/dashboard" element={<FanDashboard />} />
                  <Route path="/prizes" element={<PrizeDetails />} />
                  <Route path="/support" element={<Support />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/jokes" element={<JokeGenerator />} />
                  <Route path="*" element={<Navigate to="/dashboard" />} />
                </>
              ) : (
                <>
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/support" element={<Support />} />
                  <Route path="/jokes" element={<JokeGenerator />} />
                  <Route path="*" element={<Navigate to="/admin" />} />
                </>
              )}
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
