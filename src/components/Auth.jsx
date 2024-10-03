import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';

const Auth = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();

  const signUp = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error('Error al registrarse:', error.message);
      return;
    }

    console.log('Usuario registrado:', data);
    alert('Registro exitoso, por favor verifica tu email para poder loguearte.');
  };

  const signIn = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert('Error al iniciar sesión:', error.message);
      return;
    }

    console.log('Sesión iniciada:', data);
    setIsAuthenticated(true);
    navigate('/categorias');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isRegister) {
      await signUp();
    } else {
      await signIn();
    }
  };

  return (
    <div>
      <h2>{isRegister ? 'Registrarse' : 'Iniciar Sesión'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label>
          <input
            type="checkbox"
            checked={isRegister}
            onChange={() => setIsRegister(!isRegister)}
          />
          ¿No tienes cuenta? Regístrate
        </label>

        <button type="submit">
          {isRegister ? 'Registrarse' : 'Iniciar sesión'}
        </button>
      </form>
    </div>
  );
};

export default Auth;
