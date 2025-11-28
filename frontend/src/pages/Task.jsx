import React, { useState, useEffect } from 'react';
import { useTask } from '../context/TaskContext';
import TaskCard from '../components/tasks/TaskCard';
import TaskForm from '../components/tasks/TaskForm';

const Tasks = () => {
  const { tasks, loading, error, fetchTasks } = useTask();
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  const getTaskCount = (status) => {
    return tasks.filter(task => task.status === status).length;
  };

  if (loading && tasks.length === 0) {
    return <div className="loading">Loading tasks...</div>;
  }

  return (
    <div className="container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">My Tasks</h1>
        <button 
          onClick={() => setShowForm(true)}
          className="btn btn-primary"
          style={{ width: 'auto', padding: '10px 20px' }}
        >
          + New Task
        </button>
      </div>

      {error && (
        <div className="alert alert-error" style={{ marginBottom: '20px' }}>
          {error}
        </div>
      )}

      {/* Stats */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(4, 1fr)', 
        gap: '15px', 
        marginBottom: '30px' 
      }}>
        <div style={{ 
          padding: '20px', 
          backgroundColor: 'white', 
          borderRadius: '8px',
          textAlign: 'center',
          border: '2px solid #6c757d'
        }}>
          <h3 style={{ margin: 0, color: '#6c757d' }}>Total</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '10px 0 0 0' }}>
            {tasks.length}
          </p>
        </div>
        <div style={{ 
          padding: '20px', 
          backgroundColor: 'white', 
          borderRadius: '8px',
          textAlign: 'center',
          border: '2px solid #6c757d'
        }}>
          <h3 style={{ margin: 0, color: '#6c757d' }}>To Do</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '10px 0 0 0' }}>
            {getTaskCount('todo')}
          </p>
        </div>
        <div style={{ 
          padding: '20px', 
          backgroundColor: 'white', 
          borderRadius: '8px',
          textAlign: 'center',
          border: '2px solid #fd7e14'
        }}>
          <h3 style={{ margin: 0, color: '#fd7e14' }}>In Progress</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '10px 0 0 0' }}>
            {getTaskCount('in-progress')}
          </p>
        </div>
        <div style={{ 
          padding: '20px', 
          backgroundColor: 'white', 
          borderRadius: '8px',
          textAlign: 'center',
          border: '2px solid #198754'
        }}>
          <h3 style={{ margin: 0, color: '#198754' }}>Done</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '10px 0 0 0' }}>
            {getTaskCount('done')}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ marginRight: '10px', fontWeight: '500' }}>Filter by status:</label>
        <select 
          value={filter} 
          onChange={(e) => setFilter(e.target.value)}
          className="form-input"
          style={{ width: 'auto', display: 'inline-block' }}
        >
          <option value="all">All Tasks</option>
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>

      {/* Task List */}
      <div className="dashboard-content">
        {filteredTasks.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
            <h3>No tasks found</h3>
            <p>Create your first task to get started!</p>
          </div>
        ) : (
          filteredTasks.map(task => (
            <TaskCard key={task._id} task={task} />
          ))
        )}
      </div>

      {/* Task Form Modal */}
      {showForm && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            width: '90%',
            maxWidth: '500px',
            maxHeight: '90vh',
            overflow: 'auto'
          }}>
            <TaskForm onClose={() => setShowForm(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;