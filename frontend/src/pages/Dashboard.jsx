import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTask } from '../context/TaskContext';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { tasks, fetchTasks } = useTask();
  const [recentTasks, setRecentTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    // Ambil 5 task terbaru
    setRecentTasks(tasks.slice(0, 5));
  }, [tasks]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const getTaskCount = (status) => {
    return tasks.filter(task => task.status === status || task.column === status).length;
  };

  const getPriorityCount = (priority) => {
    return tasks.filter(task => task.priority === priority).length;
  };

  return (
    <div>
      {/* Welcome Section */}
      <div style={{ 
        background: 'linear-gradient(135deg, #007bff 0%, #0056b3 100%)',
        color: 'white',
        padding: '40px 20px',
        marginBottom: '30px'
      }}>
        <div className="container">
          <h1 style={{ margin: '0 0 10px 0', fontSize: '32px' }}>
            Welcome back, {user?.name}! 👋
          </h1>
          <p style={{ margin: 0, fontSize: '16px', opacity: 0.9 }}>
            Here's what's happening with your tasks today.
          </p>
        </div>
      </div>

      <div className="container">
        {/* Quick Stats */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '20px', 
          marginBottom: '30px' 
        }}>
          <div style={{ 
            padding: '25px', 
            backgroundColor: 'white', 
            borderRadius: '12px',
            textAlign: 'center',
            borderLeft: '4px solid #007bff',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#007bff' }}>
              {tasks.length}
            </div>
            <div style={{ color: '#666', fontWeight: '500' }}>Total Tasks</div>
          </div>

          <div style={{ 
            padding: '25px', 
            backgroundColor: 'white', 
            borderRadius: '12px',
            textAlign: 'center',
            borderLeft: '4px solid #fd7e14',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#fd7e14' }}>
              {getTaskCount('in-progress')}
            </div>
            <div style={{ color: '#666', fontWeight: '500' }}>In Progress</div>
          </div>

          <div style={{ 
            padding: '25px', 
            backgroundColor: 'white', 
            borderRadius: '12px',
            textAlign: 'center',
            borderLeft: '4px solid #dc3545',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#dc3545' }}>
              {getPriorityCount('high')}
            </div>
            <div style={{ color: '#666', fontWeight: '500' }}>High Priority</div>
          </div>

          <div style={{ 
            padding: '25px', 
            backgroundColor: 'white', 
            borderRadius: '12px',
            textAlign: 'center',
            borderLeft: '4px solid #198754',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#198754' }}>
              {getTaskCount('done')}
            </div>
            <div style={{ color: '#666', fontWeight: '500' }}>Completed</div>
          </div>
        </div>

        {/* Action Cards */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '25px',
          marginBottom: '30px'
        }}>
          <Link 
            to="/tasks" 
            style={{
              display: 'block',
              padding: '30px',
              backgroundColor: 'white',
              color: '#333',
              textDecoration: 'none',
              borderRadius: '12px',
              textAlign: 'center',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              transition: 'all 0.3s ease',
              border: '2px solid transparent'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-5px)';
              e.target.style.borderColor = '#007bff';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.borderColor = 'transparent';
            }}
          >
            <div style={{ fontSize: '48px', marginBottom: '15px' }}>📋</div>
            <h3 style={{ margin: '0 0 10px 0' }}>Manage Tasks</h3>
            <p style={{ margin: 0, color: '#666' }}>
              View and organize all your tasks in list or Kanban view
            </p>
          </Link>

          <div style={{
            padding: '30px',
            backgroundColor: 'white',
            borderRadius: '12px',
            textAlign: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            border: '2px solid #6c757d'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '15px' }}>📊</div>
            <h3 style={{ margin: '0 0 10px 0' }}>Analytics</h3>
            <p style={{ margin: 0, color: '#666' }}>
              Coming soon - Track your productivity and progress
            </p>
          </div>

          <div style={{
            padding: '30px',
            backgroundColor: 'white',
            borderRadius: '12px',
            textAlign: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            border: '2px solid #6c757d'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '15px' }}>👥</div>
            <h3 style={{ margin: '0 0 10px 0' }}>Team Collaboration</h3>
            <p style={{ margin: 0, color: '#666' }}>
              Coming soon - Work together with your team
            </p>
          </div>
        </div>

        {/* Recent Tasks */}
        <div style={{ 
          backgroundColor: 'white', 
          padding: '30px', 
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ margin: 0 }}>Recent Tasks</h2>
            <Link 
              to="/tasks" 
              style={{
                color: '#007bff',
                textDecoration: 'none',
                fontWeight: '500'
              }}
            >
              View All →
            </Link>
          </div>
          
          {recentTasks.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
              <p>No tasks yet. Create your first task to get started!</p>
              <Link 
                to="/tasks" 
                className="btn btn-primary"
                style={{ marginTop: '10px', display: 'inline-block' }}
              >
                Create Task
              </Link>
            </div>
          ) : (
            <div>
              {recentTasks.map(task => (
                <div key={task._id} style={{
                  padding: '15px',
                  border: '1px solid #e9ecef',
                  borderRadius: '8px',
                  marginBottom: '10px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <div style={{ fontWeight: '600', marginBottom: '5px' }}>
                      {task.title}
                    </div>
                    <div style={{ 
                      display: 'flex', 
                      gap: '10px', 
                      fontSize: '12px',
                      color: '#666'
                    }}>
                      <span style={{
                        padding: '2px 8px',
                        backgroundColor: task.priority === 'high' ? '#dc354520' : 
                                       task.priority === 'medium' ? '#ffc10720' : '#6c757d20',
                        color: task.priority === 'high' ? '#dc3545' : 
                              task.priority === 'medium' ? '#856404' : '#6c757d',
                        borderRadius: '12px'
                      }}>
                        {task.priority}
                      </span>
                      <span style={{
                        padding: '2px 8px',
                        backgroundColor: '#007bff20',
                        color: '#007bff',
                        borderRadius: '12px'
                      }}>
                        {task.column || task.status}
                      </span>
                    </div>
                  </div>
                  {task.dueDate && (
                    <div style={{ fontSize: '12px', color: '#666' }}>
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;