import React, { createContext, useState, useContext } from 'react';
import { taskService } from '../services/taskService';

const TaskContext = createContext();

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Get all tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await taskService.getTasks();
      setTasks(response.data);
    } catch (error) {
      setError('Failed to fetch tasks');
      console.error('Fetch tasks error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Create new task
  const createTask = async (taskData) => {
    try {
      setError('');
      const response = await taskService.createTask(taskData);
      setTasks(prev => [response.data, ...prev]);
      return { success: true, data: response.data };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to create task';
      setError(message);
      return { success: false, error: message };
    }
  };

  // Update task
  const updateTask = async (id, taskData) => {
    try {
      setError('');
      const response = await taskService.updateTask(id, taskData);
      setTasks(prev => prev.map(task => 
        task._id === id ? response.data : task
      ));
      return { success: true, data: response.data };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update task';
      setError(message);
      return { success: false, error: message };
    }
  };

  // Update task status
  const updateTaskStatus = async (id, status) => {
    try {
      setError('');
      const response = await taskService.updateTaskStatus(id, status);
      setTasks(prev => prev.map(task => 
        task._id === id ? response.data : task
      ));
      return { success: true, data: response.data };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update task status';
      setError(message);
      return { success: false, error: message };
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      setError('');
      await taskService.deleteTask(id);
      setTasks(prev => prev.filter(task => task._id !== id));
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to delete task';
      setError(message);
      return { success: false, error: message };
    }
  };

  const value = {
    tasks,
    loading,
    error,
    fetchTasks,
    createTask,
    updateTask,
    updateTaskStatus,
    deleteTask
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};