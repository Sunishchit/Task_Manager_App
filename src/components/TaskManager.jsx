import React, {  useState, useMemo } from 'react';
import { useTasks } from '../TaskContent';

const TaskManager = () => {
    const { tasks, addTask, toggleTask, deleteTask, theme, toggleTheme } = useTasks();
    const [filter, setFilter] = useState("all");
    const [newTask, setNewTask] = useState("");
    const [error, setError] = useState("");
  
    const filteredTasks = useMemo(() => {
      if (filter === "completed") return tasks.filter(task => task.completed);
      if (filter === "pending") return tasks.filter(task => !task.completed);
      return tasks;
    }, [tasks, filter]);
  
    return (
      <div className={`task-manager ${theme}`}>
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>
        <h2>Task Manager</h2>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
        />
        <button onClick={() => { addTask(newTask, setError); setNewTask(""); }}>Add</button>
        {error && <p className="error-message" style={{ color: 'red', marginTop: '5px' }}>{error}</p>}
        <div>
          <button onClick={() => setFilter("all")}>All</button>
          <button onClick={() => setFilter("completed")}>Completed</button>
          <button onClick={() => setFilter("pending")}>Pending</button>
        </div>
        <ul>
          {filteredTasks.map(task => (
            <li key={task.id} className="task-item">
              <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                {task.text}
              </span>
              <button onClick={() => toggleTask(task.id)}>
                {task.completed ? 'Undo' : 'Complete'}
              </button>
              <button className="delete-btn" onClick={() => deleteTask(task.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    );
  };

export default TaskManager;