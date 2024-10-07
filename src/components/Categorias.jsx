import React, { useEffect, useState } from 'react';
import { supabase } from '../services/supabaseClient';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/categorias.scss';
import '../styles/auth.scss';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Categorias = () => {
  const [categorias, setCategorias] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [categoryColor, setCategoryColor] = useState('#FF5733'); // Color por defecto
  const [colors] = useState(['#FF5733', '#33FF57', '#3357FF', '#FF33A8', '#33FFF6', '#FFDB33', '#8D33FF', '#33FF99', '#FF5734', '#FFD433']);

  useEffect(() => {
    const fetchCategorias = async () => {
      const { data, error } = await supabase
        .from('categorias')
        .select('*')
        .eq('user_id', user.id);

      if (error) {
        console.error('Error al obtener categorías:', error);
      } else {
        setCategorias(data);
      }
    };

    fetchCategorias();
  }, [user]);

  const handleAddCategory = () => {
    setShowModal(true);
  };

  const handleSaveCategory = async () => {
    if (newCategory) {
      const { error } = await supabase
        .from('categorias')
        .insert([{ name: newCategory, user_id: user.id, color: categoryColor }]);

      if (error) {
        console.error('Error al agregar categoría:', error);
        alert(`Error: ${error.message}`);
      } else {
        setCategorias([...categorias, { name: newCategory, user_id: user.id, color: categoryColor }]);
        setShowModal(false);
        setNewCategory('');
        setCategoryColor('#FF5733'); // Resetear color por defecto
      }
    }
  };

  const handleCategoryClick = (categoryId) => {
    navigate(`/tareas/${categoryId}`);
  };

  return (
    <div className='categorias__container'>
      <h1 className='categorias__container-title'>Categorías</h1>
      {categorias.length === 0 ? (
        <div>
          <p>No tienes categorías. ¿Quieres agregar una?</p>
          <button onClick={handleAddCategory} className="categorias__container-addButton" role="button">
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {categorias.map((categoria) => (
            <div
              key={categoria.id}
              onClick={() => handleCategoryClick(categoria.id)}
              className='categorias__container-categoria'
              style={{ backgroundColor: categoria.color }}
            >
              <h1>{categoria.name}</h1>
            </div>
          ))}
          <button onClick={handleAddCategory} className="categorias__container-addButton" role="button">
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="categorias__modal">
          <div className="categorias__modal-content">
            <h2>Nueva Categoría</h2>
            <div className="form__group">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Nombre de la categoría"
                className='categorias__modal-input categoria'
              />
              <label htmlFor="add" className="form__label label-categoria">Categoría</label>
            </div>

            {/* Selector de colores */}
            <div className="form__group">
              <label className="form__label">Selecciona un color:</label>
              <div className="color-picker">
                {colors.map((color) => (
                  <div
                    key={color}
                    className="color-box"
                    style={{
                      backgroundColor: color,
                    }}
                    onClick={() => setCategoryColor(color)} // Cambiar el color seleccionado
                  >
                    {categoryColor === color && (
                      <i className="fa-solid fa-check color-check"></i> // Mostrar el check si está seleccionado
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="button-aling">
              <button onClick={handleSaveCategory} className="categorias__modal-button" role="button">Guardar</button>
              <button onClick={() => setShowModal(false)} className="categorias__modal-button" role="button">Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categorias;
