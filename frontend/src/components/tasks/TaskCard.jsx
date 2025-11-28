import React, { useState } from 'react';
import { useTask } from '../../context/TaskContext';

const TaskCard = ({ task }) => {
  const { updateTaskStatus, deleteTask } = useTask();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleStatusChange = async (newStatus) => {
    await updateTaskStatus(task._id, newStatus);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setIsDeleting(true);
      await deleteTask(task._id);
      setIsDeleting(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'todo': return '#6c757d';
      case 'in-progress': return '#fd7e14';
      case 'done': return '#198754';
      case 'backlog': return '#6c757d';
      case 'review': return '#6f42c1';
      default: return '#6c757d';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'low': return '#6c757d';
      case 'medium': return '#ffc107';
      case 'high': return '#dc3545';
      default: return '#6c757d';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'todo': return '📋';
      case 'in-progress': return '⚡';
      case 'done': return '✅';
      case 'backlog': return '📥';
      case 'review': return '👀';
      default: return '📋';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No due date';
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString();
    }
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date();

  return (
    <div 
      className="task-card" 
      style={{
        border: `1px solid ${isHovered ? getStatusColor(task.column || task.status) : '#e9ecef'}`,
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '16px',
        backgroundColor: 'white',
        boxShadow: isHovered ? '0 4px 12px rgba(0,0,0,0.15)' : '0 2px 6px rgba(0,0,0,0.08)',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        transform: isHovered ? 'translateY(-2px)' : 'none'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
        <div style={{ flex: 1 }}>
          <h4 style={{ 
            margin: '0 0 8px 0', 
            fontSize: '16px', 
            fontWeight: '600',
            color: '#333',
            lineHeight: '1.4'
          }}>
            {task.title}
          </h4>
          
          {task.description && (
            <p style={{ 
              margin: '0 0 12px 0', 
              fontSize: '14px', 
              color: '#666',
              lineHeight: '1.5'
            }}>
              {task.description}
            </p>
          )}
        </div>
        
        <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
          {/* Status Dropdown */}
          <select 
            value={task.column || task.status} 
            onChange={(e) => handleStatusChange(e.target.value)}
            style={{
              padding: '6px 10px',
              border: `2px solid ${getStatusColor(task.column || task.status)}`,
              borderRadius: '8px',
              fontSize: '12px',
              backgroundColor: 'white',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            <option value="backlog">📥 Backlog</option>
            <option value="todo">📋 To Do</option>
            <option value="in-progress">⚡ In Progress</option>
            <option value="review">👀 Review</option>
            <option value="done">✅ Done</option>
          </select>
          
          {/* Delete Button */}
          <button 
            onClick={handleDelete}
            disabled={isDeleting}
            style={{
              padding: '6px 10px',
              backgroundColor: isHovered ? '#dc3545' : 'transparent',
              color: isHovered ? 'white' : '#dc3545',
              border: `1px solid #dc3545`,
              borderRadius: '8px',
              fontSize: '12px',
              cursor: isDeleting ? 'not-allowed' : 'pointer',
              opacity: isDeleting ? 0.6 : 1,
              transition: 'all 0.2s ease'
            }}
          >
            {isDeleting ? '...' : '🗑️'}
          </button>
        </div>
      </div>

      {/* Task Metadata */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        fontSize: '12px'
      }}>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {/* Priority Badge */}
          <span style={{
            padding: '4px 10px',
            backgroundColor: getPriorityColor(task.priority) + '20',
            color: getPriorityColor(task.priority),
            borderRadius: '12px',
            fontWeight: '600',
            fontSize: '11px'
          }}>
            {task.priority.toUpperCase()}
          </span>
          
          {/* Status Badge */}
          <span style={{
            padding: '4px 10px',
            backgroundColor: getStatusColor(task.column || task.status) + '20',
            color: getStatusColor(task.column || task.status),
            borderRadius: '12px',
            fontWeight: '600',
            fontSize: '11px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            {getStatusIcon(task.column || task.status)}
            {(task.column || task.status).charAt(0).toUpperCase() + (task.column || task.status).slice(1)}
          </span>
        </div>
        
        {/* Due Date */}
        {task.dueDate && (
          <span style={{ 
            color: isOverdue ? '#dc3545' : '#666',
            fontWeight: isOverdue ? '600' : '400',
            fontSize: '11px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            📅 {formatDate(task.dueDate)}
            {isOverdue && ' ⚠️'}
          </span>
        )}
      </div>

      {/* Created Date */}
      <div style={{ 
        marginTop: '8px',
        fontSize: '10px',
        color: '#999',
        textAlign: 'right'
      }}>
        Created: {new Date(task.createdAt).toLocaleDateString()}
      </div>
    </div>
  );
};

export default TaskCard;