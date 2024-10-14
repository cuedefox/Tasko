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
  const [showModal, setShowModal] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [categoryColor, setCategoryColor] = useState('#FF6F61');
  const [colors] = useState(['#FF6F61', '#FFDAA5', '#FFCC00', '#B3E3FF', '#1B9CFC', '#FF4D4D', '#FF8C00', '#A05EB5', '#4CAF50', '#D32F2F']);

  // Obtener catagorias desde la base de datos
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
      setLoading(false);
    };

    fetchCategorias();
  }, [user]);

  // Modal agregar categoria
  const handleAddCategory = () => {
    setShowModal(true);
  };

  // Guardar nueva categoria
  const handleSaveCategory = async () => {
    if (newCategory) {
      const { error } = await supabase
        .from('categorias')
        .insert([{ name: newCategory, user_id: user.id, color: categoryColor }]);

      if (error) {
        console.error('Error al agregar categoría:', error);
        alert(`Error: ${error.message}`);
      } else {
        window.location.reload();
      }
    }
    cancelNewCategory();
  };

  // Ingresar a la categoria
  const handleCategoryClick = (categoryId) => {
    navigate(`/tareas/${categoryId}`);
  };

  // Cancelar el agregar categoria
  const cancelNewCategory = () => {
    setNewCategory('');
    setCategoryColor('#FF6F61');
    setShowModal(false);
  }


  return (
    <div className='categorias__container'>
      <h1 className='categorias__container-title'>
        <i className="fa-solid fa-list categorias__container-icon"></i> Categorías
      </h1>
      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div> 
        </div>
      ) : categorias.length === 0 ? (
        <div>
          <p>No tienes categorías. ¿Quieres agregar una?</p>
          <div onClick={handleAddCategory} className='categorias__container-div'>
            <button className="categorias__container-addButton" role="button">
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>
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
          <div onClick={handleAddCategory} className='categorias__container-div'>
            <button className="categorias__container-addButton" role="button">
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="categorias__modal">
          <div className="categorias__modal-content">
            <h2 className='title-addcategori'>Nueva Categoría</h2>
            <div className="form__group">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder='.'
                className='categorias__modal-input categoria'
              />
              <label htmlFor="add" className="form__label label-categoria">Categoría</label>
            </div>

            {/* Selector de colores */}
            <div className="form__group">
              <label className='color-label'>Selecciona un color:</label>
              <div className="color-picker">
                {colors.map((color) => (
                  <div
                    key={color}
                    className="color-box"
                    style={{
                      backgroundColor: color,
                    }}
                    onClick={() => setCategoryColor(color)}
                  >
                    {categoryColor === color && (
                      <i className="fa-solid fa-check color-check"></i>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="button-aling">
              <button onClick={handleSaveCategory} className="categorias__modal-button" role="button">Guardar</button>
              <button onClick={cancelNewCategory} className="categorias__modal-button" role="button">Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categorias;
