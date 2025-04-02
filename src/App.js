import React from 'react';
import './style.css'; 
import { TaskProvider } from './TaskContent';
import TaskManager from './components/TaskManager';


const App = () => (
  <TaskProvider>
    <TaskManager />
  </TaskProvider>
);

export default App;
