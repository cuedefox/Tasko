import React, { useEffect } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const checkUserSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/tareas');
      }
    };
    checkUserSession();
  }, [navigate]);

  return (
    <Container maxWidth="xs">
      <img
        src="/images/tasko-logo.jpeg"
        alt="Tasko Logo"
        style={{ width: '100%', marginBottom: '20px' }}
      />
      <Typography variant="h5" align="center">Registrarse</Typography>
      <form>
        <TextField
          label="Correo Electrónico"
          variant="outlined"
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Contraseña"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Registrarse
        </Button>
      </form>
    </Container>
  );
};

export default Auth;
