import React, { useState, useEffect } from 'react';
import { useTask } from '../context/TaskContext';
import TaskCard from '../components/tasks/TaskCard';
import TaskForm from '../components/tasks/TaskForm';
import KanbanBoard from '../components/tasks/KanbanBoard';

const Tasks = () => {
  const { tasks, loading, error, fetchTasks } = useTask();
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('all');
  const [view, setView] = useState('kanban'); // DEFAULT SET TO KANBAN 🎯
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  // Filter tasks berdasarkan status dan search term
  const filteredTasks = tasks.filter(task => {
    const matchesFilter = filter === 'all' || task.status === filter || task.column === filter;
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         task.description?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getTaskCount = (status) => {
    return tasks.filter(task => task.status === status || task.column === status).length;
  };

  const getTotalTasks = () => tasks.length;
  const getCompletedTasks = () => getTaskCount('done');

  if (loading && tasks.length === 0) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '50vh',
        flexDirection: 'column',
        gap: '15px'
      }}>
        <div style={{ fontSize: '48px' }}>⏳</div>
        <div style={{ fontSize: '18px', color: '#666' }}>Loading your tasks...</div>
      </div>
    );
  }

  return (
    <div className="container">
      {/* Header Section */}
      <div style={{ 
        padding: '30px 0 20px 0',
        borderBottom: '1px solid #e9ecef',
        marginBottom: '30px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
          <div>
            <h1 style={{ 
              margin: '0 0 8px 0', 
              fontSize: '32px',
              background: 'linear-gradient(135deg, #333 0%, #666 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              My Tasks
            </h1>
            <p style={{ margin: 0, color: '#666', fontSize: '16px' }}>
              Manage and organize your tasks efficiently
            </p>
          </div>
          
          <button 
            onClick={() => setShowForm(true)}
            className="btn btn-primary"
            style={{ 
              width: 'auto', 
              padding: '12px 24px',
              fontSize: '16px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <span>+</span>
            New Task
          </button>
        </div>

        {/* Quick Stats */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(4, 1fr)', 
          gap: '15px',
          marginBottom: '25px'
        }}>
          <div style={{ 
            padding: '20px', 
            backgroundColor: 'white', 
            borderRadius: '12px',
            textAlign: 'center',
            borderLeft: '4px solid #007bff',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
          }}>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#007bff' }}>
              {getTotalTasks()}
            </div>
            <div style={{ color: '#666', fontWeight: '500', fontSize: '14px' }}>Total Tasks</div>
          </div>
          
          <div style={{ 
            padding: '20px', 
            backgroundColor: 'white', 
            borderRadius: '12px',
            textAlign: 'center',
            borderLeft: '4px solid #fd7e14',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
          }}>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#fd7e14' }}>
              {getTaskCount('in-progress')}
            </div>
            <div style={{ color: '#666', fontWeight: '500', fontSize: '14px' }}>In Progress</div>
          </div>
          
          <div style={{ 
            padding: '20px', 
            backgroundColor: 'white', 
            borderRadius: '12px',
            textAlign: 'center',
            borderLeft: '4px solid #198754',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
          }}>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#198754' }}>
              {getCompletedTasks()}
            </div>
            <div style={{ color: '#666', fontWeight: '500', fontSize: '14px' }}>Completed</div>
          </div>
          
          <div style={{ 
            padding: '20px', 
            backgroundColor: 'white', 
            borderRadius: '12px',
            textAlign: 'center',
            borderLeft: '4px solid #6c757d',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
          }}>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#6c757d' }}>
              {getTaskCount('todo')}
            </div>
            <div style={{ color: '#666', fontWeight: '500', fontSize: '14px' }}>To Do</div>
          </div>
        </div>

        {/* Controls Bar */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          gap: '20px',
          flexWrap: 'wrap'
        }}>
          {/* View Switcher */}
          <div style={{ 
            display: 'flex', 
            backgroundColor: '#f8f9fa', 
            borderRadius: '10px', 
            padding: '4px',
            border: '1px solid #e9ecef'
          }}>
            <button
              onClick={() => setView('list')}
              style={{
                padding: '10px 20px',
                backgroundColor: view === 'list' ? '#007bff' : 'transparent',
                color: view === 'list' ? 'white' : '#666',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s ease'
              }}
            >
              <span>📋</span>
              List View
            </button>
            <button
              onClick={() => setView('kanban')}
              style={{
                padding: '10px 20px',
                backgroundColor: view === 'kanban' ? '#007bff' : 'transparent',
                color: view === 'kanban' ? 'white' : '#666',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s ease'
              }}
            >
              <span>🎯</span>
              Kanban Board
            </button>
          </div>

          {/* Search and Filters */}
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center', flexWrap: 'wrap' }}>
            {/* Search Input */}
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  padding: '10px 15px 10px 35px',
                  border: '1px solid #e9ecef',
                  borderRadius: '8px',
                  fontSize: '14px',
                  width: '200px',
                  backgroundColor: '#f8f9fa'
                }}
              />
              <span style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#666'
              }}>
                🔍
              </span>
            </div>

            {/* Filter Dropdown - Only show in List view */}
            {view === 'list' && (
              <select 
                value={filter} 
                onChange={(e) => setFilter(e.target.value)}
                style={{
                  padding: '10px 15px',
                  border: '1px solid #e9ecef',
                  borderRadius: '8px',
                  fontSize: '14px',
                  backgroundColor: 'white',
                  cursor: 'pointer'
                }}
              >
                <option value="all">All Tasks</option>
                <option value="backlog">Backlog</option>
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="review">Review</option>
                <option value="done">Done</option>
              </select>
            )}
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="alert alert-error" style={{ 
          marginBottom: '20px',
          borderRadius: '8px',
          fontSize: '14px'
        }}>
          {error}
        </div>
      )}

      {/* Content based on view */}
      {view === 'list' ? (
        /* List View */
        <div>
          {filteredTasks.length === 0 ? (
            <div style={{ 
              textAlign: 'center', 
              padding: '60px 20px', 
              color: '#666',
              backgroundColor: 'white',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
            }}>
              <div style={{ fontSize: '64px', marginBottom: '20px' }}>📝</div>
              <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>
                {searchTerm ? 'No tasks found' : 'No tasks yet'}
              </h3>
              <p style={{ margin: '0 0 20px 0' }}>
                {searchTerm 
                  ? 'Try adjusting your search terms' 
                  : 'Create your first task to get started!'
                }
              </p>
              <button 
                onClick={() => setShowForm(true)}
                className="btn btn-primary"
                style={{ width: 'auto' }}
              >
                + Create Task
              </button>
            </div>
          ) : (
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '20px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
            }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '20px',
                paddingBottom: '15px',
                borderBottom: '1px solid #f1f3f4'
              }}>
                <div style={{ fontWeight: '600', color: '#333' }}>
                  {filteredTasks.length} task{filteredTasks.length !== 1 ? 's' : ''} found
                </div>
                <div style={{ fontSize: '14px', color: '#666' }}>
                  Sorted by: Recently Created
                </div>
              </div>
              
              {filteredTasks.map(task => (
                <TaskCard key={task._id} task={task} />
              ))}
            </div>
          )}
        </div>
      ) : (
        /* Kanban View - DEFAULT VIEW 🎯 */
        <KanbanBoard />
      )}

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