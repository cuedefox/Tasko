import React, { useState } from 'react';
import { List } from '@mui/material';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  const handleSaveTask = (task) => {
    if (editingTask) {
      setTasks(tasks.map(t => (t.id === editingTask.id ? { ...task, id: editingTask.id } : t)));
      setEditingTask(null);
    } else {
      setTasks([...tasks, { ...task, id: Date.now() }]);
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div>
      <TaskForm onSave={handleSaveTask} existingTask={editingTask} />
      <List>
        {tasks.map(task => (
          <TaskItem 
            key={task.id} 
            task={task} 
            onEdit={handleEditTask} 
            onDelete={handleDeleteTask} 
          />
        ))}
      </List>
    </div>
  );
}

export default TaskList;
