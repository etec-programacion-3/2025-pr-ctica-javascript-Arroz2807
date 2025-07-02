// Módulo de tareas usando ES6+ con funcionalidades extendidas
// Provee funciones para obtener, agregar, eliminar, editar y completar tareas usando localStorage

const STORAGE_KEY = 'tasks'; // Clave para localStorage

// Devuelve la lista de tareas almacenadas
export function getTasks() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

// Agrega una tarea nueva y la guarda en localStorage
export function addTask(taskText) {
  const tasks = getTasks();
  const newTask = {
    id: Date.now(), // ID único basado en timestamp
    text: taskText,
    completed: false,
    createdAt: new Date().toISOString()
  };
  
  // Usando spread operator para crear nueva array
  const updatedTasks = [...tasks, newTask];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks));
}

// Elimina una tarea por ID y actualiza localStorage
export function removeTask(taskId) {
  const tasks = getTasks();
  // Usando filter para crear nueva array sin la tarea eliminada
  const updatedTasks = tasks.filter(task => task.id !== taskId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks));
}

// Edita el texto de una tarea por ID
export function editTask(taskId, newText) {
  const tasks = getTasks();
  // Usando map para crear nueva array con la tarea editada
  const updatedTasks = tasks.map(task => 
    task.id === taskId 
      ? { ...task, text: newText } // Usando spread para mantener propiedades existentes
      : task
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks));
}

// Marca una tarea como completada/pendiente por ID
export function toggleTaskCompletion(taskId) {
  const tasks = getTasks();
  // Usando map para crear nueva array con el estado actualizado
  const updatedTasks = tasks.map(task => 
    task.id === taskId 
      ? { ...task, completed: !task.completed } // Toggle del estado completed
      : task
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks));
}

// Filtra tareas según su estado
export function getFilteredTasks(filter = 'all') {
  const tasks = getTasks();
  
  switch (filter) {
    case 'completed':
      return tasks.filter(task => task.completed);
    case 'pending':
      return tasks.filter(task => !task.completed);
    default:
      return tasks;
  }
}

// Función auxiliar para limpiar localStorage (para testing)
export function clearAllTasks() {
  localStorage.removeItem(STORAGE_KEY);
}