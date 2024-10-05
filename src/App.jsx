import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './styles/styles.scss';

import Auth from './components/Auth';
import Categorias from './components/Categorias';
import Perfil from './components/Perfil';
import Navbar from './components/NavBar';
import Tareas from './components/Tareas';
import { AuthProvider } from './context/AuthContext';
import { UserProvider } from './context/UserContext';


const AppContent = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Navbar solo se muestra si NO estamos en /login */}
      {isAuthenticated && location.pathname !== '/login' && <Navbar />}

      {/* Contenido con margen dinámico si la navbar está presente */}
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
