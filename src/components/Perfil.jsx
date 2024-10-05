import React from 'react';
import { useUser } from '../context/UserContext';
import { supabase } from '../services/supabaseClient';

const Perfil = ({ setIsAuthenticated }) => {
  const { user } = useUser(); 

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
  };

  return (
    <div>
      <h1>Perfil</h1>
      {user ? (
        <div>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>ID:</strong> {user.id}</p>
          <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
      ) : (
        <p>No estás autenticado.</p>
      )}
    </div>
  );
};

export default Perfil;
