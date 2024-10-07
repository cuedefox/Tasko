import React, { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import { supabase } from '../services/supabaseClient';

const Perfil = () => {
  const { user, profile, setProfile } = useUser();
  const [nickname, setNickname] = useState('');
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [loading, setLoading] = useState(true);

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

      if (updateError) {
        console.error(updateError);
      } else {
        alert('Perfil actualizado con éxito');
        setProfile({ ...profile, nickname, profile_image: profileImageUrl });
      }
    } else {
      const { error: insertError } = await supabase
        .from('profiles')
        .insert({
          user_id: user.id,
          nickname: nickname,
          profile_image: profileImageUrl,
        });

      if (insertError) {
        console.error(insertError);
      } else {
        alert('Perfil creado con éxito');
      }
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error al cerrar sesión:', error);
    } else {
      alert('Sesión cerrada con éxito');
    }
  };

  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <div>
      <h1>Perfil</h1>
      <div>
        <p><strong>Email:</strong> {user ? user.email : 'Cargando...'}</p>
        <p><strong>Nickname:</strong> {nickname || 'Cargando...'}</p>
        {profile && profile.profile_image && (
          <img src={profile.profile_image} alt="Perfil" style={{ width: 100, height: 100 }} />
        )}
        <label>
          Nuevo Nickname:
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </label>
        <label>
          URL de imagen de perfil:
          <input
            type="text"
            value={profileImageUrl}
            onChange={(e) => setProfileImageUrl(e.target.value)}
            placeholder="Ingresa la URL de la imagen"
          />
        </label>
        <button onClick={handleProfileUpdate}>Actualizar perfil</button>
        <button onClick={handleLogout}>Cerrar sesión</button>
      </div>
    </div>
  );
};

export default Perfil;
