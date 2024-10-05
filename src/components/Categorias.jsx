import React, { useEffect, useState } from 'react';
import { supabase } from '../services/supabaseClient';
import { useAuth } from '../context/AuthContext'; // Asegúrate de importar tu contexto de autenticación
import { useNavigate } from 'react-router-dom';
import '../styles/categorias.scss';

const Categorias = () => {
  const [categorias, setCategorias] = useState([]);
  const { user } = useAuth(); // Obtén el usuario autenticado
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategorias = async () => {
      console.log('User ID:', user.id); // Verificar el ID del usuario
      const { data, error } = await supabase
        .from('categorias')
        .select('*')
        .eq('user_id', user.id); // Filtra las categorías por el ID del usuario
  
      if (error) {
        console.error('Error al obtener categorías:', error);
      } else {
        console.log('Categorías obtenidas:', data); // Verificar las categorías obtenidas
        setCategorias(data);
      }
    };
  
    fetchCategorias();
  }, [user]);

  const handleAddCategory = async () => {
    const newCategory = prompt('Ingresa el nombre de la nueva categoría:');
    if (newCategory) {
      const { error } = await supabase
        .from('categorias')
        .insert([{ name: newCategory, user_id: user.id }]);

      if (error) {
        console.error('Error al agregar categoría:', error);
        alert(`Error: ${error.message}`);
      } else {
        setCategorias([...categorias, { name: newCategory, user_id: user.id }]);
      }
    }
  };

  const handleCategoryClick = (categoryId) => {
    navigate(`/tareas/${categoryId}`);
  };

  return (
    <div>
      <h1>Categorías</h1>
      {categorias.length === 0 ? (
        <div>
          <p>No tienes categorías. ¿Quieres agregar una?</p>
          <button onClick={handleAddCategory}>Agregar categoría</button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {categorias.map((categoria) => (
            <div
              key={categoria.id}
              onClick={() => handleCategoryClick(categoria.id)}
            >
              {categoria.name}
            </div>
          ))}
          <button onClick={handleAddCategory}>Agregar otra categoría</button>
        </div>
      )}
    </div>
  );
};

export default Categorias;
