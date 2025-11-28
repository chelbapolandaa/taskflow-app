import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useTask } from '../../context/TaskContext';

const KanbanBoard = () => {
  const { tasks, updateTaskStatus, fetchTasks } = useTask();
  const [columns, setColumns] = useState({
    backlog: [],
    todo: [],
    'in-progress': [],
    review: [],
    done: []
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    // Group tasks by column
    const grouped = {
      backlog: tasks.filter(task => task.column === 'backlog' || (!task.column && task.status === 'todo')),
      todo: tasks.filter(task => task.column === 'todo'),
      'in-progress': tasks.filter(task => task.column === 'in-progress' || (!task.column && task.status === 'in-progress')),
      review: tasks.filter(task => task.column === 'review'),
      done: tasks.filter(task => task.column === 'done' || (!task.column && task.status === 'done'))
    };
    setColumns(grouped);
  }, [tasks]);

  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;

    console.log('Drag result:', {
      from: source.droppableId,
      to: destination.droppableId,
      taskId: draggableId
    });

    // Jika pindah kolom
    if (source.droppableId !== destination.droppableId) {
      try {
        await updateTaskStatus(draggableId, destination.droppableId);
        console.log('Task moved successfully!');
      } catch (error) {
        console.error('Failed to move task:', error);
      }
    }
  };

  const columnConfig = {
    backlog: { title: '📥 Backlog', color: '#6c757d', emoji: '📥' },
    todo: { title: '📋 To Do', color: '#007bff', emoji: '📋' },
    'in-progress': { title: '⚡ In Progress', color: '#fd7e14', emoji: '⚡' },
    review: { title: '👀 Review', color: '#6f42c1', emoji: '👀' },
    done: { title: '✅ Done', color: '#198754', emoji: '✅' }
  };

  return (
    <div style={{ padding: '20px 0' }}>
      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '16px',
          alignItems: 'flex-start'
        }}>
          {Object.entries(columnConfig).map(([columnId, config]) => (
            <div key={columnId} style={{
              backgroundColor: '#f8f9fa',
              borderRadius: '12px',
              padding: '16px',
              minHeight: '70vh',
              border: `2px solid ${config.color}20`
            }}>
              {/* Column Header */}
              <div style={{
                padding: '12px 16px',
                backgroundColor: config.color,
                color: 'white',
                borderRadius: '8px',
                marginBottom: '16px',
                textAlign: 'center',
                fontWeight: '600',
                fontSize: '14px'
              }}>
                {config.title} ({columns[columnId]?.length || 0})
              </div>
              
              {/* Droppable Area */}
              <Droppable droppableId={columnId}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={{
                      minHeight: '60vh',
                      backgroundColor: snapshot.isDraggingOver ? `${config.color}10` : 'transparent',
                      borderRadius: '8px',
                      padding: '8px',
                      transition: 'background-color 0.2s'
                    }}
                  >
                    {columns[columnId]?.map((task, index) => (
                      <Draggable key={task._id} draggableId={task._id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              ...provided.draggableProps.style,
                              marginBottom: '12px',
                              transform: snapshot.isDragging ? 'rotate(5deg)' : 'none',
                              opacity: snapshot.isDragging ? 0.8 : 1
                            }}
                          >
                            {/* Task Card */}
                            <div style={{
                              border: `2px solid ${config.color}40`,
                              borderRadius: '8px',
                              padding: '12px',
                              backgroundColor: 'white',
                              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                              cursor: 'grab',
                              transition: 'all 0.2s'
                            }}>
                              <h4 style={{ 
                                margin: '0 0 8px 0', 
                                fontSize: '14px', 
                                fontWeight: '600',
                                color: '#333'
                              }}>
                                {task.title}
                              </h4>
                              
                              {task.description && (
                                <p style={{ 
                                  margin: '0 0 8px 0', 
                                  fontSize: '12px', 
                                  color: '#666',
                                  lineHeight: '1.3'
                                }}>
                                  {task.description.length > 60 
                                    ? `${task.description.substring(0, 60)}...` 
                                    : task.description
                                  }
                                </p>
                              )}

                              <div style={{ 
                                display: 'flex', 
                                justifyContent: 'space-between', 
                                alignItems: 'center',
                                fontSize: '11px'
                              }}>
                                <span style={{
                                  padding: '2px 6px',
                                  backgroundColor: task.priority === 'high' ? '#dc354520' : 
                                                 task.priority === 'medium' ? '#ffc10720' : '#6c757d20',
                                  color: task.priority === 'high' ? '#dc3545' : 
                                        task.priority === 'medium' ? '#856404' : '#6c757d',
                                  borderRadius: '8px',
                                  fontWeight: '500'
                                }}>
                                  {task.priority}
                                </span>
                                
                                {task.dueDate && (
                                  <span style={{ color: '#666' }}>
                                    📅 {new Date(task.dueDate).toLocaleDateString()}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}

                    {/* Empty State */}
                    {columns[columnId]?.length === 0 && (
                      <div style={{
                        textAlign: 'center',
                        padding: '40px 20px',
                        color: '#999',
                        fontSize: '14px'
                      }}>
                        No tasks
                      </div>
                    )}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>

      {/* Instructions */}
      <div style={{
        marginTop: '20px',
        padding: '15px',
        backgroundColor: '#e7f3ff',
        borderRadius: '8px',
        fontSize: '14px',
        textAlign: 'center'
      }}>
        🎯 <strong>Drag & Drop</strong> tasks between columns to update their status!
      </div>
    </div>
  );
};

export default KanbanBoard;