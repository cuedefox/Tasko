import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './components/Auth';
import TaskList from './components/TaskList';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Auth />} />
        <Route path="/tareas" element={<TaskList />} />
        <Route path="/" element={<Auth />} />
      </Routes>
    </Router>
  );
};

export default App;
