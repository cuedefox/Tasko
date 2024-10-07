import React, { useEffect, useState } from 'react';
import { supabase } from '../services/supabaseClient';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/tareas.scss';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Tareas = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [tareas, setTareas] = useState([]);

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
        .insert([{ name: taskName, categoria_id: categoryId, completed: false }]);

      if (error) {
        console.error('Error al agregar tarea:', error);
      } else {
        setTareas([...tareas, { id: data[0].id, name: taskName, categoria_id: categoryId, completed: false }]);
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
    const { error } = await supabase
      .from('categorias')
      .delete()
      .eq('id', categoryId);

    if (error) {
      console.error('Error al eliminar la categoría:', error);
    } else {
      navigate('/categorias');
    }
  };

  return (
    <div className='tareas__container'>
      <h1 className='tareas__container-title'><i class="fa-solid fa-list-check"></i> Tareas</h1>
      <button onClick={handleAddTask}>Agregar Tarea</button>
      <button onClick={handleDeleteCategory}>Eliminar Categoría</button>
      
      <ul>
        {tareas.map((tarea) => (
          <li key={tarea.id}>
            <input
              type="checkbox"
              checked={tarea.completed}
              onChange={() => handleToggleTask(tarea.id, tarea.completed)}
            />
            <span style={{ textDecoration: tarea.completed ? 'line-through' : 'none' }}>
              {tarea.name}
            </span>
            <button onClick={() => handleDeleteTask(tarea.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tareas;
