import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ onLogout }) {
  const navigate = useNavigate();
  const userRole = localStorage.getItem('userRole');

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to={userRole === 'admin' ? '/admin' : '/dashboard'} className="text-2xl font-bold flex items-center gap-2">
          <span className="text-3xl">⚡</span> Tesla Prize Portal
        </Link>
        <div className="flex gap-6 items-center">
          {userRole === 'fan' ? (
            <>
              <Link to="/dashboard" className="hover:text-red-100 transition font-semibold">Dashboard</Link>
              <Link to="/prizes" className="hover:text-red-100 transition font-semibold">My Prizes</Link>
              <Link to="/jokes" className="hover:text-red-100 transition font-semibold">Fun 😂</Link>
              <Link to="/support" className="hover:text-red-100 transition font-semibold">Support</Link>
              <Link to="/profile" className="hover:text-red-100 transition font-semibold">Profile</Link>
            </>
          ) : (
            <>
              <Link to="/admin" className="hover:text-red-100 transition font-semibold">Admin Panel</Link>
              <Link to="/jokes" className="hover:text-red-100 transition font-semibold">Fun 😂</Link>
              <Link to="/support" className="hover:text-red-100 transition font-semibold">Support</Link>
            </>
          )}
          <button
            onClick={handleLogout}
            className="bg-white text-red-600 px-4 py-2 rounded-lg font-semibold hover:bg-red-50 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
