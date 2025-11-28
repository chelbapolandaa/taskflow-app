import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer style={{
      backgroundColor: '#f8f9fa',
      borderTop: '1px solid #e9ecef',
      padding: '25px 20px',
      marginTop: '40px',
      textAlign: 'center'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        color: '#666',
        fontSize: '14px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '8px',
          flexWrap: 'wrap',
          marginBottom: '8px'
        }}>
          <span>TaskFlow © {currentYear} • Created with</span>
          <span style={{ color: '#dc3545', fontSize: '16px' }}>❤️</span>
          <span>by <strong style={{ color: '#333' }}>Chelba Polanda</strong></span>
        </div>
        <div style={{ fontSize: '12px', color: '#999' }}>
          Manage your tasks efficiently with our beautiful Kanban board
        </div>
      </div>
    </footer>
  );
};

export default Footer;