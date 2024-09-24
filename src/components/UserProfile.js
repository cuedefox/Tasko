import React from 'react';
import { Typography, Paper, Button } from '@mui/material';
import { supabase } from '../supabaseClient';
import '../styles/UserProfile.css';

function UserProfile({ user }) {
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <Paper elevation={3} className="user-profile">
      <Typography variant="h6">Perfil del Usuario</Typography>
      <Typography variant="body1">Nombre: {user.email}</Typography>
      <Button variant="contained" color="secondary" onClick={handleLogout}>
        Cerrar Sesión
      </Button>
    </Paper>
  );
}

export default UserProfile;
