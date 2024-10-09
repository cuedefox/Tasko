import React, { useEffect, useState } from 'react';
import { supabase } from '../services/supabaseClient';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/tareas.scss';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Modal from './Modal';

const Tareas = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [tareas, setTareas] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchTareas = async () => {
      const { data, error } = await supabase
        .from('tareas')
        .select('*')
        .eq('categoria_id', categoryId);

      if (error) {
        console.error('Error al obtener tareas:', error);
      } else {
        setTareas(data);
      }
    };

    fetchTareas();
  }, [categoryId]);

  const handleAddTask = async () => {
    const taskName = prompt('Ingresa el nombre de la nueva tarea:');
    if (taskName) {
      const { data, error } = await supabase
        .from('tareas')
        .insert([{ name: taskName, categoria_id: categoryId, completed: false }])
        .select();
  
      if (error) {
        console.error('Error al agregar tarea:', error);
      } else if (data && data.length > 0) {
        setTareas([...tareas, { id: data[0].id, name: taskName, categoria_id: categoryId, completed: false }]);
      } else {
        console.error('No se devolvieron datos tras insertar la tarea');
      }
    }
  };  
 
  const handleToggleTask = async (taskId, completed) => {
    const { error } = await supabase
      .from('tareas')
      .update({ completed: !completed })
      .eq('id', taskId);

    if (error) {
      console.error('Error al actualizar tarea:', error);
    } else {
      setTareas(tareas.map(tarea => tarea.id === taskId ? { ...tarea, completed: !completed } : tarea));
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (taskId) {
      const { error } = await supabase
        .from('tareas')
        .delete()
        .eq('id', taskId);

      if (error) {
        console.error('Error al eliminar la tarea:', error);
      } else {
        setTareas(tareas.filter((tarea) => tarea.id !== taskId));
      }
    } else {
      console.error('Task ID is undefined');
    }
  };

  const handleDeleteCategory = async () => {
    try {
      const { error: taskError } = await supabase
        .from('tareas')
        .delete()
        .eq('categoria_id', categoryId);
  
      if (taskError) {
        console.error('Error al eliminar tareas de la categoría:', taskError);
        return;
      }
      const { error: categoryError } = await supabase
        .from('categorias')
        .delete()
        .eq('id', categoryId);
  
      if (categoryError) {
        console.error('Error al eliminar la categoría:', categoryError);
      } else {
        navigate('/categorias');
      }
    } catch (error) {
      console.error('Error en el proceso de eliminación:', error);
    }
  };

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div className='tareas__container'>
      <div className='tareas__container-bar'>
        <h1 className='tareas__container-title'><i className="fa-solid fa-list-check"></i> Tareas</h1>

        <button className='tareas__container-deleteCategori' onClick={openModal}><i className="fas fa-trash"></i> Eliminar</button>
      </div>

      <button onClick={handleAddTask}>Agregar Tarea</button>
      <ul className='tareas-content'>
        {tareas.map((tarea) => (
          <li className='tareas__task' key={tarea.id}>
            <input 
              className='tareas__task-completecheck'
              type="checkbox"
              checked={tarea.completed}
              onChange={() => handleToggleTask(tarea.id, tarea.completed)}
            />
            <span className='tareas__task-title' style={{ textDecoration: tarea.completed ? 'line-through' : 'none' }}>
              {tarea.name}
            </span>
            <button className='tareas__task-delete-button' onClick={() => handleDeleteTask(tarea.id)}>
              <i className="fas fa-trash"></i>
            </button>
          </li>
        ))}
      </ul>

      {/* Modal de Confirmación */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={() => {
          handleDeleteCategory();
          closeModal();
        }}
        message="¿Estás seguro de que quieres eliminar esta categoría y todas las tareas asociadas?"
      />
    </div>
  );
};

export default Tareas;
