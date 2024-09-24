import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/TaskForm.css';

function TaskForm({ onSave, existingTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Media');
  const [dueDate, setDueDate] = useState(null);

  useEffect(() => {
    if (existingTask) {
      setTitle(existingTask.title);
      setDescription(existingTask.description);
      setPriority(existingTask.priority);
      setDueDate(existingTask.dueDate ? new Date(existingTask.dueDate) : null);
    } else {
      setTitle('');
      setDescription('');
      setPriority('Media');
      setDueDate(null);
    }
  }, [existingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ title, description, priority, dueDate, isComplete: false });
    setTitle('');
    setDescription('');
    setPriority('Media');
    setDueDate(null);
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <Typography variant="h6" className="form-title">
        {existingTask ? 'Editar Tarea' : 'Agregar Nueva Tarea'}
      </Typography>
      <TextField
        label="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        margin="normal"
        fullWidth
      />
      <TextField
        label="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        margin="normal"
        fullWidth
      />
      <TextField
        select
        label="Prioridad"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        margin="normal"
        fullWidth
        SelectProps={{
          native: true,
        }}
      >
        {['Baja', 'Media', 'Alta'].map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </TextField>
      <div style={{ margin: '10px 0' }}>
        <label>Fecha de Vencimiento</label>
        <DatePicker
          selected={dueDate}
          onChange={(date) => setDueDate(date)}
          dateFormat="yyyy/MM/dd"
          className="form-control"
          placeholderText="Selecciona una fecha"
          isClearable
        />
      </div>
      <Button type="submit" variant="contained" color="primary" style={{ marginTop: '10px' }}>
        Guardar Tarea
      </Button>
    </form>
  );
}

export default TaskForm;
