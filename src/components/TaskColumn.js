import React from 'react';
import { Typography, List } from '@mui/material';
import TaskItem from './TaskItem';

function TaskColumn({ title, tasks }) {
  return (
    <div style={{ margin: '0 20px', flex: 1 }}>
      <Typography variant="h6" style={{ textAlign: 'center', marginBottom: '10px' }}>{title}</Typography>
      <List style={{ minHeight: '200px', backgroundColor: '#f0f0f0', borderRadius: '8px', padding: '10px' }}>
        {tasks.length > 0 ? (
          tasks.map((task) => <TaskItem key={task.id} task={task} />)
        ) : (
          <Typography variant="body2" style={{ textAlign: 'center' }}>Sin tareas</Typography>
        )}
      </List>
    </div>
  );
}

export default TaskColumn;
