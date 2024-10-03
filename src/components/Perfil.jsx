import React, { useEffect, useState } from 'react';
import { supabase } from '../services/supabaseClient';

const Perfil = ({ setIsAuthenticated }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    fetchUser();
  }, []);

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
