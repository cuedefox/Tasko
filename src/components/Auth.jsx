import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';
import '../styles/auth.scss';
import logo from '../images/logo-tasko.png';

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
    <div className='auth'>
      <div className='auth__container'>
        <img src={logo} alt="Logo" className='auth-logo'/>
        <h2 className='auth__container-title'> {isRegister ? 'Registrarse' : 'Iniciar Sesión'}</h2>
        <form onSubmit={handleSubmit} className='auth__container__form'>
        {isRegister && (
            <div className='form__group'>
              <input
                name='name'
                type="text"
                placeholder="Name"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className='auth__container__form-input name'
              />
              <label htmlFor="email" className="form__label label-name">Name</label>
            </div>
          )}
          <div className='form__group'>
          <input
            name='email'
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className='auth__container__form-input email'
          />
          <label for="email" class="form__label label-email">Email</label>
          </div>

          <div className='form__group'>
          <input
            name='password'
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className='auth__container__form-input password'
          />
          <label for="password" class="form__label label-password">Password</label>
          </div>

          <label class="checkbox-container">¿No tienes cuenta? Regístrate
            <input type="checkbox"
              checked={isRegister}
              onChange={() => setIsRegister(!isRegister)}/>
            <span class="checkmark"></span>
          </label>

          <button type="submit" className="hbtn hb-fill-right">
            {isRegister ? 'Registrarse' : 'Iniciar sesión'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;