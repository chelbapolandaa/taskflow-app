import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import NotificationBell from './NotificationBell';

const Header = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
  };

  if (!user) {
    return null; // Jangan tampilkan header jika belum login
  }

  return (
    <header style={{
      backgroundColor: 'white',
      borderBottom: '1px solid #e0e0e0',
      padding: '0 20px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto',
        height: '60px'
      }}>
        {/* Logo & Brand */}
        <Link 
          to="/dashboard" 
          style={{
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}
        >
          <span style={{
            fontSize: '24px',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #007bff 0%, #6610f2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            🚀 TaskFlow
          </span>
        </Link>

        {/* Navigation Links */}
        <nav style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
          <Link 
            to="/dashboard"
            style={{
              textDecoration: 'none',
              color: location.pathname === '/dashboard' ? '#007bff' : '#666',
              fontWeight: location.pathname === '/dashboard' ? '600' : '400',
              padding: '8px 16px',
              borderRadius: '6px',
              backgroundColor: location.pathname === '/dashboard' ? '#007bff10' : 'transparent'
            }}
          >
            📊 Dashboard
          </Link>
          
          <Link 
            to="/tasks"
            style={{
              textDecoration: 'none',
              color: location.pathname === '/tasks' ? '#007bff' : '#666',
              fontWeight: location.pathname === '/tasks' ? '600' : '400',
              padding: '8px 16px',
              borderRadius: '6px',
              backgroundColor: location.pathname === '/tasks' ? '#007bff10' : 'transparent'
            }}
          >
            📋 Tasks
          </Link>
        </nav>

        {/* User Menu */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <NotificationBell />
        <span style={{ color: '#666', fontSize: '14px' }}>
            Hello, <strong>{user.name}</strong> 👋
        </span>
        <button 
            onClick={handleLogout}
            className="btn btn-danger"
            style={{ 
            padding: '6px 12px', 
            fontSize: '12px',
            width: 'auto'
            }}
        >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;