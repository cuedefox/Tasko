import React, { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import { supabase } from '../services/supabaseClient';
import '../styles/perfil.scss';

const Perfil = () => {
  const { user, profile, setProfile } = useUser();
  const [nickname, setNickname] = useState('');
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [showUpdate, setShowUpdate] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      if (profile) {
        setNickname(profile.nickname);
        setProfileImageUrl(profile.profile_image || '');
      }
      setLoading(false);
    };

    fetchProfile();
  }, [profile]);

  const handleProfileUpdate = async () => {
    if (profile) {
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          nickname: nickname,
          profile_image: profileImageUrl,
        })
        .eq('user_id', user.id);

        setProfile({ ...profile, nickname, profile_image: profileImageUrl });

    } else {
      const { error: insertError } = await supabase
        .from('profiles')
        .insert({
          user_id: user.id,
          nickname: nickname,
          profile_image: profileImageUrl,
        });
    }

    setShowUpdate(true);
    const timer = setTimeout(() => {
      setShowUpdate(false);
    }, 4000);
    return () => clearTimeout(timer);
  };

  const handleLogout = async () => {
    const { } = await supabase.auth.signOut();
  };

  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <div className='perfil-center'>
      {showUpdate && (
        <div className="update-message">
          <i className="fa-solid fa-triangle-exclamation"></i> Perfil actualizado con exito
        </div>
      )}
    <div className='unique-perfil__container'>
      <h1 className='unique-perfil__title'>Perfil</h1>
      <div className='unique-perfil__info'>
        {profile && profile.profile_image && (
          <img src={profile.profile_image} alt="Perfil" className='unique-perfil__image'/>
        )}
        <p><strong>Email:</strong> {user ? user.email : 'Cargando...'}</p>
        <p><strong>Nickname:</strong> {nickname || 'Cargando...'}</p>
        <label className='unique-perfil__label'>
          Nuevo Nickname:
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className='unique-perfil__input'
          />
        </label>
        <label className='unique-perfil__label'>
          URL de imagen de perfil:
          <input
            type="text"
            value={profileImageUrl}
            onChange={(e) => setProfileImageUrl(e.target.value)}
            placeholder="Ingresa la URL de la imagen"
            className='unique-perfil__input'
          />
        </label>
        <button className='unique-perfil__button' onClick={handleProfileUpdate}>Actualizar perfil</button>
        <button className='unique-perfil__button unique-perfil__button--logout' onClick={handleLogout}>Cerrar sesión</button>
      </div>
    </div>
    </div>
  );
};

export default Perfil;
