import React, { useState, useEffect } from "react";
import TaskList from "./TaskList";

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Cargar las tareas desde localStorage al inicio
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  // Guardar las tareas en localStorage cada vez que cambian
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Añadir nueva tarea
  const addTask = () => {
    if (newTask.trim()) {
      const task = { id: Date.now(), text: newTask, completed: false };
      setTasks([...tasks, task]);
      setNewTask("");
    }
  };

  // Filtrar tareas completadas o pendientes
  const filterTasks = (status) => {
    return tasks.filter((task) => (status === "completed" ? task.completed : !task.completed));
  };

  return (
    <div className="todo-app">
      <h1>Lista de Tareas</h1>
      <input type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder="Añadir tarea..." />
      <button onClick={addTask}>Añadir Tarea</button>

      <div>
        <button onClick={() => setTasks(filterTasks("completed"))}>Mostrar Completadas</button>
        <button onClick={() => setTasks(filterTasks("pending"))}>Mostrar Pendientes</button>
      </div>

      <TaskList tasks={tasks} setTasks={setTasks} />
    </div>
  );
};

export default TodoApp;
