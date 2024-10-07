import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import perfilIcon from '../images/perfil-icon.png';
import '../styles/navbar.scss';

const Navbar = () =>{
  const { user } = useUser(); 
  return (
    <nav className="nav__container">
      <div className='nav__container-perfil'>
        <img src={perfilIcon} alt="Perfil" className='nav__container-perfil-icon'/>
        <div>{user ? user.email : 'No hay usuario'}</div>;
      </div>
      <ul className="nav__list">
        <li className="nav__item">
        <Link to="/categorias" className="nav__link">
          <div className='nav__item-container'>
            <i className="fa-solid fa-list nav__item-container-i"></i>
            <h1 className='nav__item-container-h1'>Categorias</h1>
          </div>
        </Link>
        </li>
        <li className="nav__item"><Link to="/perfil" className="nav__link">
            <div className='nav__item-container'>
              <i class="fa-solid fa-user nav__item-container-i"></i>
              <h1 className='nav__item-container-h1'>Mi Perfil</h1>
            </div>
        </Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
