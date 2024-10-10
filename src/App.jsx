import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './styles/styles.scss';

import Auth from './components/Auth';
import Categorias from './components/Categorias';
import Perfil from './components/Perfil';
import Navbar from './components/NavBar';
import Tareas from './components/Tareas';
import { useAuth } from './context/AuthContext';
import { UserProvider } from './context/UserContext';
import { AuthProvider } from './context/AuthContext';

const AppContent = () => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {isAuthenticated && location.pathname !== '/login' && <Navbar />}
      <div style={{ marginLeft: isAuthenticated && location.pathname !== '/login' ? '25vh' : '0', transition: 'margin-left 0.3s' }}>
      
        <Routes>
          <Route path="/login" element={<Auth />} />
          <Route path="/" element={isAuthenticated ? <Navigate to="/categorias" /> : <Auth />} />
          <Route path="/categorias" element={isAuthenticated ? <Categorias /> : <Navigate to="/login" />} />
          <Route path="/tareas/:categoryId" element={isAuthenticated ? <Tareas /> : <Navigate to="/login" />} />
          <Route path="/perfil" element={isAuthenticated ? <Perfil /> : <Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/categorias" />} />
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
