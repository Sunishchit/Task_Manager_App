import React, { createContext, useContext, useCallback } from 'react';
import {useLocalStorage} from './localStorage/localStorage';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const [theme, setTheme] = useLocalStorage("theme", "light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const addTask = useCallback((text, setError) => {
    if (!text.trim()) {
      setError("Task cannot be empty");
      return;
    }
    setError("");
    setTasks([...tasks, { id: Date.now(), text, completed: false }]);
  }, [tasks, setTasks]);

  const toggleTask = useCallback((id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  }, [tasks, setTasks]);

  const deleteTask = useCallback((id) => {
    setTasks(tasks.filter(task => task.id !== id));
  }, [tasks, setTasks]);

  return (
    <TaskContext.Provider value={{ tasks, addTask, toggleTask, deleteTask, theme, toggleTheme }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);