import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Auth from './components/Auth';
import Categorias from './components/Categorias';
import Perfil from './components/Perfil';
import Navbar from './components/NavBar';
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      {isAuthenticated && <Navbar />}
      <Routes>
        <Route path="/login" element={<Auth setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/" element={<Auth setIsAuthenticated={setIsAuthenticated} />} />

        {isAuthenticated ? (
          <>
            <Route path="/categorias" element={<Categorias />} />
            <Route path="/perfil" element={<Perfil setIsAuthenticated={setIsAuthenticated} />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Router>
  );
};

export default App;
