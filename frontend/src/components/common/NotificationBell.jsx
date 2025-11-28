import React, { useState, useRef, useEffect } from 'react';
import { useNotification } from '../../context/NotificationContext';
import { useNavigate } from 'react-router-dom';

const NotificationBell = () => {
  const { notifications, unreadCount, markAsRead, markAllAsRead, deleteNotification, fetchNotifications } = useNotification();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('🔔 NotificationBell - Unread count:', unreadCount);
    console.log('🔔 NotificationBell - Notifications:', notifications);
  }, [unreadCount, notifications]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNotificationClick = async (notification) => {
    console.log('📨 Clicked notification:', notification);
    await markAsRead(notification._id);
    
    if (notification.actionUrl) {
      navigate(notification.actionUrl);
    }
    
    setIsOpen(false);
  };

  const handleBellClick = () => {
    console.log('🔔 Bell clicked, fetching fresh notifications...');
    fetchNotifications(); // Refresh ketika bell diklik
    setIsOpen(!isOpen);
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'urgent': return '🔴';
      case 'warning': return '🟡';
      case 'success': return '🟢';
      default: return '🔵';
    }
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div style={{ position: 'relative' }} ref={dropdownRef}>
      {/* Notification Bell */}
      <button
        onClick={handleBellClick}
        style={{
          position: 'relative',
          background: 'none',
          border: 'none',
          fontSize: '20px',
          cursor: 'pointer',
          padding: '8px',
          borderRadius: '50%',
          transition: 'background-color 0.2s'
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#f8f9fa'}
        onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
      >
        🔔
        {unreadCount > 0 && (
          <span style={{
            position: 'absolute',
            top: '0',
            right: '0',
            backgroundColor: '#dc3545',
            color: 'white',
            borderRadius: '50%',
            width: '18px',
            height: '18px',
            fontSize: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold'
          }}>
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          right: '0',
          width: '350px',
          backgroundColor: 'white',
          border: '1px solid #e0e0e0',
          borderRadius: '12px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
          zIndex: 1000,
          maxHeight: '400px',
          overflow: 'hidden'
        }}>
          {/* Header */}
          <div style={{
            padding: '16px',
            borderBottom: '1px solid #f0f0f0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <h4 style={{ margin: 0, fontSize: '16px' }}>Notifications</h4>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#007bff',
                  fontSize: '12px',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                Mark all as read
              </button>
            )}
          </div>

          {/* Notifications List */}
          <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {notifications.length === 0 ? (
              <div style={{ 
                padding: '40px 20px', 
                textAlign: 'center', 
                color: '#666',
                fontSize: '14px'
              }}>
                No notifications yet
                <div style={{ marginTop: '10px', fontSize: '12px' }}>
                  Create tasks with due dates to see notifications
                </div>
              </div>
            ) : (
              notifications.map(notification => (
                <div
                  key={notification._id}
                  onClick={() => handleNotificationClick(notification)}
                  style={{
                    padding: '12px 16px',
                    borderBottom: '1px solid #f8f9fa',
                    cursor: 'pointer',
                    backgroundColor: notification.read ? 'white' : '#f8f9fa',
                    transition: 'background-color 0.2s',
                    position: 'relative'
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = notification.read ? '#f8f9fa' : '#e9ecef'}
                  onMouseOut={(e) => e.target.style.backgroundColor = notification.read ? 'white' : '#f8f9fa'}
                >
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <div style={{ fontSize: '16px' }}>
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ 
                        fontWeight: notification.read ? '400' : '600',
                        fontSize: '14px',
                        marginBottom: '4px',
                        color: '#333'
                      }}>
                        {notification.title}
                      </div>
                      <div style={{ 
                        fontSize: '13px',
                        color: '#666',
                        lineHeight: '1.3',
                        marginBottom: '4px'
                      }}>
                        {notification.message}
                      </div>
                      <div style={{ 
                        fontSize: '11px',
                        color: '#999'
                      }}>
                        {formatTime(notification.createdAt)}
                      </div>
                    </div>
                    {!notification.read && (
                      <div style={{
                        width: '8px',
                        height: '8px',
                        backgroundColor: '#007bff',
                        borderRadius: '50%',
                        marginTop: '8px'
                      }} />
                    )}
                  </div>
                  
                  {/* Delete Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteNotification(notification._id);
                    }}
                    style={{
                      position: 'absolute',
                      top: '8px',
                      right: '8px',
                      background: 'none',
                      border: 'none',
                      color: '#999',
                      cursor: 'pointer',
                      fontSize: '12px',
                      padding: '4px'
                    }}
                    onMouseOver={(e) => e.target.style.color = '#dc3545'}
                    onMouseOut={(e) => e.target.style.color = '#999'}
                  >
                    ×
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div style={{
              padding: '12px 16px',
              borderTop: '1px solid #f0f0f0',
              textAlign: 'center'
            }}>
              <button
                onClick={() => navigate('/tasks')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#007bff',
                  fontSize: '12px',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                View all tasks
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;