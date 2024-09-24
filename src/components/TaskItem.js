import React from 'react';
import { ListItem, ListItemText, ListItemSecondaryAction, IconButton, Checkbox, Chip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function TaskItem({ task, onEdit, onDelete }) {
  const getPriorityChip = (priority) => {
    let color;
    switch (priority) {
      case 'Baja':
        color = 'success';
        break;
      case 'Media':
        color = 'warning';
        break;
      case 'Alta':
        color = 'error';
        break;
      default:
        color = 'default';
    }
    return <Chip label={priority} color={color} variant="outlined" style={{ marginLeft: '8px' }} />;
  };

  return (
    <ListItem className="task-item">
      <Checkbox
        checked={task.isComplete}
        onChange={() => (task.isComplete = !task.isComplete)}
        color="primary"
      />
      <ListItemText 
        primary={task.title} 
        secondary={
          <>
            {task.description}
            {getPriorityChip(task.priority)}
            {task.dueDate && <Chip label={`Vence: ${new Date(task.dueDate).toLocaleDateString()}`} color="info" variant="outlined" style={{ marginLeft: '8px' }} />}
          </>
        } 
        primaryTypographyProps={{
          style: { fontWeight: 'bold', textDecoration: task.isComplete ? 'line-through' : 'none' }
        }}
      />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="edit" color="primary" onClick={() => onEdit(task)}>
          <EditIcon />
        </IconButton>
        <IconButton edge="end" aria-label="delete" color="secondary" onClick={() => onDelete(task.id)}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default TaskItem;
