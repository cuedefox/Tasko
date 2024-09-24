import React from 'react';
import { Button, ButtonGroup, Typography } from '@mui/material';

function TaskFilters({ onFilterChange, onSortChange }) {
  return (
    <div style={{ marginBottom: '20px', textAlign: 'center' }}>
      <Typography variant="h6" style={{ marginBottom: '10px', fontFamily: 'Poppins, sans-serif' }}>Filtrar tareas</Typography>
      <ButtonGroup variant="contained" color="primary" style={{ marginBottom: '10px' }}>
        <Button onClick={() => onFilterChange('all')}>Todos</Button>
        <Button onClick={() => onFilterChange('completed')}>Completados</Button>
        <Button onClick={() => onFilterChange('incomplete')}>Incompletos</Button>
      </ButtonGroup>
      <ButtonGroup variant="contained" color="secondary">
        <Button onClick={() => onSortChange('date')}>Ordenar por Fecha</Button>
        <Button onClick={() => onSortChange('priority')}>Ordenar por Prioridad</Button>
      </ButtonGroup>
    </div>
  );
}

export default TaskFilters;
