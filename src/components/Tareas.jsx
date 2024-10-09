import React, { useEffect, useState } from 'react';
import { supabase } from '../services/supabaseClient';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/tareas.scss';
import '../styles/categorias.scss'
import '@fortawesome/fontawesome-free/css/all.min.css';
import Modal from './Modal';

const Tareas = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [tareas, setTareas] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [shoeDeleteTask, setShowDeleteTask] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [editTask, setEditTask] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [isShowTask, setShowTask] = useState(false);
  const [isShowEdit, setShowEdit] = useState(false);
  
  const [selectedTask, setSelectedTask] = useState(null);
  const [isDelayed, setIsDelayed] = useState(false);

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
      setLoading(false);
    };

    fetchTareas();
  }, [categoryId]);

  const handleSaveTask = async () => {
    if (newTask) {
      const { data, error } = await supabase
        .from('tareas')
        .insert([{ name: newTask, description: newDescription, categoria_id: categoryId, completed: false }])
        .select();
  
      if (error) {
        console.error('Error al agregar tarea:', error);
      } else if (data && data.length > 0) {
        setTareas([...tareas, { id: data[0].id, name: newTask, description: newDescription, categoria_id: categoryId, completed: false }]);
      } else {
        console.error('No se devolvieron datos tras insertar la tarea');
      }
      cancelNewTask();
    }
  };

  const handleToggleTask = async (taskId, completed) => {
    setShowTask(false)
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
    setShowDeleteTask(false);
  };

  const handleEditTask = async (taskId) => {
    setTimeout(() => {
      setIsDelayed(true);
        setShowTask(false);
    }, 100);
    setShowEdit(true);
    setSelectedTask(taskId);
  }
  
  const handleSaveEdit = async (taskId) => {
    const { error } = await supabase
      .from('tareas')
      .update({ name: editTask, description: editDescription})
      .eq('id', taskId);

      if (error) {
        console.error('Error al editar tarea:', error);
      } else {
        setTareas(tareas.map(tarea => tarea.id === taskId ? { ...tarea,  name: editTask, description: editDescription } : tarea));
      }
    cancelEditTask();
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

  const handleAddTask = () => {
    setShowModal(true);
  };

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleTaskClick = (tarea) => {
    setSelectedTask(tarea);
    setShowTask(true);
  };

  const cancelNewTask = () => {
    setNewTask('');
    setNewDescription('');
    setShowModal(false);
  };

 const cancelEditTask = () => {
    setEditTask('');
    setEditDescription('');
    setShowEdit(false);
  };
  
  const handleShowDeleteTask = (boolean) => {
    setTimeout(() => {
      setIsDelayed(true);
        setShowTask(false);
    }, 100);
    setShowDeleteTask(boolean);
  };

  return (
    <div className='tareas__container'>
      <div className='tareas__container-bar'>
        <h1 className='tareas__container-title'><i className="fa-solid fa-list-check"></i> Tareas</h1>

        <button className='tareas__container-deleteCategori' onClick={openModal}><i className="fas fa-trash"></i> Eliminar</button>
      </div>

      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div> 
        </div>
      ) : (
        <ul className='tareas-content'>
          <div className='tareas__container-div' onClick={handleAddTask}>
            <button className="tareas__container-div-addButton" role="button">
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>
          {tareas.map((tarea) => (
            <li className='tareas__task' key={tarea.id} onClick={() => handleTaskClick(tarea)}>
              <input 
                className='tareas__task-completecheck'
                type="checkbox"
                checked={tarea.completed}
                onChange={() => handleToggleTask(tarea.id, tarea.completed)}
              />
              <span className='tareas__task-title' style={{ textDecoration: tarea.completed ? 'line-through' : 'none' }}>
                {tarea.name}
              </span>
              <button  className='tareas__task-edit-button' onClick={() => handleEditTask(tarea)}>
                <i className="fa-solid fa-pen-to-square"></i>
              </button>

              <button className='tareas__task-delete-button' onClick={() => handleShowDeleteTask(true)}>
                <i className="fas fa-trash"></i>
              </button>
            </li>
          ))}
        </ul>
      )}

      {showModal && (
        <div className="categorias__modal">
          <div className="categorias__modal-content">
            <h1>Nueva Tarea</h1>
            <div className='form__group'>
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Nombre de la categoría"
                className='categorias__modal-input categoria'
              />
              <label htmlFor="add" className="form__label label-categoria">Tarea</label>
            </div>

            <div className="tareas-textarea-div">
              <textarea 
                className='tareas__modal-textarea'
                type="textarea"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
              />
              <label className='tareas-textarea-label '>Descripcion</label>
            </div>

            <div className='tareas-alingbutton'>
              <button type='submit' onClick={handleSaveTask} className="categorias__modal-button" role="button">Guardar</button>
              <button onClick={cancelNewTask} className="categorias__modal-button" role="button">Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {isShowEdit && (
        <div className="categorias__modal">
          <div className="categorias__modal-content">
            <h1>Editar Tarea</h1>
            <div className='form__group'>
              <input
                type="text"
                value={editTask}
                onChange={(e) => setEditTask(e.target.value)}
                placeholder="Nombre de la categoría"
                className='categorias__modal-input categoria'
              />
              <label htmlFor="add" className="form__label label-categoria">Tarea</label>
            </div>

            <div className="tareas-textarea-div">
              <textarea 
                className='tareas__modal-textarea'
                type="textarea"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
              />
              <label className='tareas-textarea-label '>Descripcion</label>
            </div>

            <div className='tareas-alingbutton'>
              <button onClick={() => handleSaveEdit(selectedTask.id)} className="categorias__modal-button" role="button">Guardar</button>
              <button onClick={cancelEditTask} className="categorias__modal-button" role="button">Cancelar</button>
            </div>
          </div>
        </div>
      )}


      {isShowTask && selectedTask && (
        <div className="task__modal">
          <div className="task__modal-content">
            <button onClick={() => setShowTask(false)} className="task__modal-close" role="button"><i class="fa-solid fa-xmark"></i></button>
            <h1>{selectedTask.name}</h1>
            <div className='task__modal-descripcion'>
              <h1>Descripcion</h1>
              <p>{selectedTask.description}</p>
            </div>
              <div className='tareas-alingbutton'>
                <button onClick={() => handleToggleTask(selectedTask.id, selectedTask.completed)} className="categorias__modal-button" role="button">Completar</button>
                <button onClick={() => handleEditTask(selectedTask)} className="categorias__modal-button" role="button">Editar</button>
              </div>
          </div>
        </div>
      )}
    

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={() => {
          handleDeleteCategory();
          closeModal();
        }}
        message="¿Estás seguro de que quieres eliminar esta categoría y todas las tareas asociadas?"
      />

      <Modal
        isOpen={shoeDeleteTask}
        onClose={() => handleShowDeleteTask(false)}
        onConfirm={() => {
          handleDeleteTask(selectedTask.id);
          closeModal();
        }}
        message="¿Estás seguro de que quieres eliminar esta tarea?"
      />
    </div>
  );
};

export default Tareas;
