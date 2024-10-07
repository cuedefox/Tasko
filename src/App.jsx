import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './styles/styles.scss';

import Auth from './components/Auth';
import Categorias from './components/Categorias';
import Perfil from './components/Perfil';
import Navbar from './components/NavBar';
import Tareas from './components/Tareas';
import { supabase } from './services/supabaseClient'; // Asegúrate de importar supabase
import { AuthProvider } from './context/AuthContext';
import { UserProvider } from './context/UserContext';

const AppContent = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  // useEffect para verificar la sesión cuando se monta el componente
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession(); // Obtiene la sesión

      if (error) {
        console.error('Error al obtener la sesión:', error);
        return;
      }

      if (session) {
        setIsAuthenticated(true);
      } else {
        // Verifica si hay sesión guardada en localStorage
        const savedSession = localStorage.getItem('supabase.auth.token');
        if (savedSession) {
          const sessionData = JSON.parse(savedSession);
          // Establece la sesión en Supabase
          await supabase.auth.setSession(sessionData);
          setIsAuthenticated(true);
        }
      }
    };

    checkSession();
  }, []);

  return (
    <>
      {isAuthenticated && location.pathname !== '/login' && <Navbar />}

      <div style={{ marginLeft: isAuthenticated && location.pathname !== '/login' ? '250px' : '0', transition: 'margin-left 0.3s' }}>
        <Routes>
          <Route path="/login" element={<Auth setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/" element={<Auth setIsAuthenticated={setIsAuthenticated} />} />

          {isAuthenticated ? (
            <>
              <Route path="/categorias" element={<Categorias />} />
              <Route path="/tareas/:categoryId" element={<Tareas />} />
              <Route path="/perfil" element={<Perfil setIsAuthenticated={setIsAuthenticated} />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/login" />} />
          )}
        </Routes>
      </div>
    </>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <UserProvider>
        <Router>
          <AppContent />
        </Router>
      </UserProvider>
    </AuthProvider>
  );
};

export default App;
