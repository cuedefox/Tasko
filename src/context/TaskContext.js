import React, { createContext, useContext, useState, useEffect } from 'react';

const TaskContext = createContext();

export const useTasks = () => {
  return useContext(TaskContext);
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  const saveTask = (task) => {
    const updatedTasks = [...tasks, { ...task, id: tasks.length + 1 }];
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const editTask = (task) => {
    setEditingTask(task);
  };

  return (
    <TaskContext.Provider value={{ tasks, saveTask, deleteTask, editTask }}>
      {children}
    </TaskContext.Provider>
  );
};
