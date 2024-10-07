import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';
import '../styles/auth.scss';
import logo from '../images/logo-tasko.png';

const Auth = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const signUp = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error('Error al registrarse:', error.message);
      setErrorMessage('Error al registrarse: ' + error.message);
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
      setErrorMessage('Email o contraseña incorrecta');
      return;
    }

    console.log('Sesión iniciada:', data);
    
    // Almacenar la sesión en localStorage
    localStorage.setItem('supabase.auth.token', JSON.stringify(data.session));

    setIsAuthenticated(true);
    navigate('/categorias');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Verificación si email o password están vacíos
    setEmailError(!email);
    setPasswordError(!password);

    if (!email || !password) {
      setErrorMessage('Por favor, complete todos los campos.');
      return;
    }

    if (isRegister) {
      await signUp();
    } else {
      await signIn();
    }
  };

  return (
    <div className='auth'>
      {errorMessage && (
        <div className="error-message">
          <i className="fa-solid fa-triangle-exclamation"></i>
          {errorMessage}
        </div>
      )}
      <div className='auth__container'>
        <img src={logo} alt="Logo" className='auth-logo' />
        <h2 className='auth__container-title'> {isRegister ? 'Registrarse' : 'Iniciar Sesión'}</h2>
        <form onSubmit={handleSubmit} className='auth__container__form' noValidate>
          <div className={`form__group ${emailError ? 'input-error' : ''}`}>
            <input
              name='email'
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className='auth__container__form-input email'
            />
            <label htmlFor="email" className="form__label label-email">Email</label>
          </div>

          <div className={`form__group ${passwordError ? 'input-error' : ''}`}>
            <input
              name='password'
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className='auth__container__form-input password'
            />
            <label htmlFor="password" className="form__label label-password">Password</label>
          </div>

          <label className="checkbox-container">¿No tienes cuenta? Regístrate
            <input type="checkbox"
              checked={isRegister}
              onChange={() => setIsRegister(!isRegister)} />
            <span className="checkmark"></span>
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
