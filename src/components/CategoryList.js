import React from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';

function CategoryList() {
  const categories = ['Trabajo', 'Estudio', 'Personal'];

  return (
    <div style={{ marginBottom: '20px' }}>
      <Typography variant="h6" style={{ marginBottom: '10px', fontFamily: 'Poppins, sans-serif' }}>Categorías</Typography>
      <List>
        {categories.map((category, index) => (
          <ListItem button key={index}>
            <ListItemText primary={category} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default CategoryList;
