import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Footer from '../components/common/Footer'; // Import Footer

const Home = () => {
  const { user } = useAuth();

  // Jika sudah login, redirect ke dashboard
  if (user) {
    window.location.href = '/dashboard';
    return null;
  }

  const features = [
    {
      icon: '📋',
      title: 'Task Management',
      description: 'Create, organize, and track your tasks efficiently',
      status: 'active'
    },
    {
      icon: '🎯',
      title: 'Kanban Board',
      description: 'Drag & drop interface for visual task management',
      status: 'active'
    },
    {
      icon: '🔔',
      title: 'Due Date Notifications',
      description: 'Smart reminders for upcoming and overdue tasks',
      status: 'active'
    },
    {
      icon: '⚡',
      title: 'Real-time Collaboration',
      description: 'Live updates with Socket.io for team collaboration',
      status: 'coming-soon'
    },
    {
      icon: '💬',
      title: 'Comments System',
      description: 'Discuss tasks with your team members in real-time',
      status: 'coming-soon'
    },
    {
      icon: '👥',
      title: 'Team Management',
      description: 'Invite team members and assign tasks collaboratively',
      status: 'coming-soon'
    },
    {
      icon: '⏱️',
      title: 'Time Tracking',
      description: 'Track time spent on tasks and generate reports',
      status: 'coming-soon'
    },
    {
      icon: '📊',
      title: 'Analytics Dashboard',
      description: 'Advanced insights and productivity analytics',
      status: 'coming-soon'
    },
    {
      icon: '🔔',
      title: 'Advanced Notifications',
      description: 'Customizable notifications and email reminders',
      status: 'coming-soon'
    }
  ];

  const activeFeatures = features.filter(f => f.status === 'active');
  const comingSoonFeatures = features.filter(f => f.status === 'coming-soon');

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '20px',
        padding: '60px 40px',
        textAlign: 'center',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        maxWidth: '1200px',
        width: '100%'
      }}>
        {/* Header Section */}
        <div style={{ marginBottom: '50px' }}>
          <h1 style={{ 
            fontSize: '48px', 
            marginBottom: '10px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold'
          }}>
            🚀 TaskFlow
          </h1>
          
          <p style={{ 
            fontSize: '20px', 
            color: '#666',
            marginBottom: '30px',
            maxWidth: '600px',
            margin: '0 auto 30px'
          }}>
            The ultimate task management platform with powerful collaboration features
          </p>

          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link 
              to="/login" 
              className="btn btn-primary"
              style={{ 
                padding: '15px 30px',
                fontSize: '16px',
                textDecoration: 'none',
                display: 'inline-block',
                fontWeight: '600',
                borderRadius: '10px'
              }}
            >
              Get Started
            </Link>
            <Link 
              to="/register" 
              className="btn btn-success"
              style={{ 
                padding: '15px 30px',
                fontSize: '16px',
                textDecoration: 'none',
                display: 'inline-block',
                fontWeight: '600',
                borderRadius: '10px'
              }}
            >
              Sign Up Free
            </Link>
          </div>
        </div>

        {/* Active Features Grid */}
        <div style={{ marginBottom: '50px' }}>
          <h2 style={{ 
            fontSize: '32px', 
            marginBottom: '30px',
            color: '#333',
            textAlign: 'center'
          }}>
            🎉 Currently Available Features
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '25px',
            marginBottom: '40px'
          }}>
            {activeFeatures.map((feature, index) => (
              <div key={index} style={{
                padding: '25px',
                backgroundColor: '#f8f9fa',
                borderRadius: '15px',
                textAlign: 'center',
                border: '2px solid #28a745',
                transition: 'transform 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => e.target.style.transform = 'translateY(-5px)'}
              onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
              >
                <div style={{ fontSize: '48px', marginBottom: '15px' }}>
                  {feature.icon}
                </div>
                <h3 style={{ 
                  margin: '0 0 10px 0', 
                  fontSize: '20px',
                  color: '#333',
                  fontWeight: '600'
                }}>
                  {feature.title}
                </h3>
                <p style={{ 
                  margin: 0, 
                  color: '#666',
                  fontSize: '14px',
                  lineHeight: '1.5'
                }}>
                  {feature.description}
                </p>
                <div style={{
                  marginTop: '15px',
                  padding: '5px 12px',
                  backgroundColor: '#28a745',
                  color: 'white',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: '600',
                  display: 'inline-block'
                }}>
                  ✅ Available Now
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Coming Soon Features */}
        <div style={{ marginBottom: '50px' }}>
          <h2 style={{ 
            fontSize: '32px', 
            marginBottom: '30px',
            color: '#333',
            textAlign: 'center'
          }}>
            🚧 Coming Soon - Exciting New Features
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '25px'
          }}>
            {comingSoonFeatures.map((feature, index) => (
              <div key={index} style={{
                padding: '25px',
                backgroundColor: '#fff',
                borderRadius: '15px',
                textAlign: 'center',
                border: '2px solid #6c757d',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-5px)';
                e.target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
              }}
              >
                {/* Shine Effect */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                  transition: 'left 0.5s ease'
                }}
                onMouseOver={(e) => e.target.style.left = '100%'}
                ></div>
                
                <div style={{ fontSize: '48px', marginBottom: '15px', opacity: 0.7 }}>
                  {feature.icon}
                </div>
                <h3 style={{ 
                  margin: '0 0 10px 0', 
                  fontSize: '20px',
                  color: '#6c757d',
                  fontWeight: '600'
                }}>
                  {feature.title}
                </h3>
                <p style={{ 
                  margin: 0, 
                  color: '#999',
                  fontSize: '14px',
                  lineHeight: '1.5'
                }}>
                  {feature.description}
                </p>
                <div style={{
                  marginTop: '15px',
                  padding: '5px 12px',
                  backgroundColor: '#6c757d',
                  color: 'white',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: '600',
                  display: 'inline-block'
                }}>
                  🚧 Coming Soon
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Bar */}
        <div style={{
          backgroundColor: '#f8f9fa',
          borderRadius: '15px',
          padding: '30px',
          marginBottom: '40px',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 20px 0', color: '#333' }}>
            Development Progress
          </h3>
          <div style={{
            width: '100%',
            backgroundColor: '#e9ecef',
            borderRadius: '10px',
            height: '20px',
            marginBottom: '15px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: '33%',
              backgroundColor: '#28a745',
              height: '100%',
              borderRadius: '10px',
              transition: 'width 0.5s ease'
            }}></div>
          </div>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            fontSize: '14px',
            color: '#666'
          }}>
            <span>3/9 Features Complete</span>
            <span>33%</span>
          </div>
        </div>

        {/* Demo Account Info */}
        <div style={{ 
          marginTop: '40px', 
          padding: '25px',
          backgroundColor: '#e7f3ff',
          borderRadius: '15px',
          fontSize: '16px',
          border: '2px solid #007bff'
        }}>
          <h4 style={{ margin: '0 0 15px 0', color: '#007bff' }}>
            🎯 Try It Out Now!
          </h4>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap' }}>
            <div style={{ textAlign: 'center' }}>
              <strong>Demo Account:</strong><br />
              📧 Email: demo@taskflow.com<br />
              🔑 Password: password
            </div>
            <div style={{ textAlign: 'center' }}>
              <strong>Or</strong><br />
              Create your own account<br />
              in 30 seconds!
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Home;