import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/categorias">Categorías</Link></li>
        <li><Link to="/perfil">Mi Perfil</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
