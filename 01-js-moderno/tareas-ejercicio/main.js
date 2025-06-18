// Importa las funciones del módulo de tareas usando destructuring
import { 
  getTasks, 
  addTask, 
  removeTask, 
  editTask, 
  toggleTaskCompletion, 
  getFilteredTasks 
} from './tareas.js';

// Referencias a los elementos del DOM usando destructuring
const { getElementById: getEl } = document;
const form = getEl.call(document, 'task-form');
const input = getEl.call(document, 'task-input');
const list = getEl.call(document, 'task-list');

// Botones de filtro
const filterButtons = {
  all: getEl.call(document, 'filter-all'),
  pending: getEl.call(document, 'filter-pending'),
  completed: getEl.call(document, 'filter-completed')
};

// Estado actual del filtro
let currentFilter = 'all';

// Función para crear elementos DOM con propiedades usando destructuring
function createElement(tag, { className = '', textContent = '', ...props } = {}) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (textContent) element.textContent = textContent;
  
  // Asignar propiedades adicionales usando spread
  Object.assign(element, props);
  return element;
}

// Función para crear botón con evento
function createButton(text, className, clickHandler) {
  const button = createElement('button', { 
    textContent: text, 
    className,
    onclick: clickHandler 
  });
  return button;
}

// Función para crear input de edición
function createEditInput(task, onSave, onCancel) {
  const input = createElement('input', {
    type: 'text',
    value: task.text,
    className: 'edit-input'
  });
  
  // Manejar eventos de guardado
  const handleSave = () => {
    const newText = input.value.trim();
    if (newText && newText !== task.text) {
      onSave(newText);
    } else {
      onCancel();
    }
  };
  
  // Event listeners
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      onCancel();
    }
  });
  
  input.addEventListener('blur', handleSave);
  
  return input;
}

// Renderiza una tarea individual
function renderTask(task) {
  const li = createElement('li', { 
    className: `task-item ${task.completed ? 'completed' : ''}` 
  });
  
  // Crear contenedor para el texto de la tarea
  const taskTextContainer = createElement('div', { className: 'task-text' });
  taskTextContainer.textContent = task.text;
  
  // Crear contenedor para botones
  const buttonContainer = createElement('div', { className: 'task-buttons' });
  
  // Botón para completar/descompletar
  const completeBtn = createButton(
    task.completed ? 'Desmarcar' : 'Completar',
    'complete-btn',
    () => {
      toggleTaskCompletion(task.id);
      renderTasks();
    }
  );
  
  // Botón para editar
  const editBtn = createButton(
    'Editar',
    'edit-btn',
    () => startEditing(task, li, taskTextContainer)
  );
  
  // Botón para eliminar
  const deleteBtn = createButton(
    'Eliminar',
    'delete-btn',
    () => {
      removeTask(task.id);
      renderTasks();
    }
  );
  
  // Agregar botones al contenedor usando spread
  buttonContainer.append(...[completeBtn, editBtn, deleteBtn]);
  
  // Agregar elementos al li usando spread
  li.append(...[taskTextContainer, buttonContainer]);
  
  return li;
}

// Función para iniciar la edición de una tarea
function startEditing(task, listItem, textContainer) {
  const originalText = textContainer.textContent;
  
  // Función para guardar cambios
  const saveChanges = (newText) => {
    editTask(task.id, newText);
    renderTasks();
  };
  
  // Función para cancelar edición
  const cancelEdit = () => {
    textContainer.textContent = originalText;
    textContainer.style.display = 'block';
  };
  
  // Crear input de edición
  const editInput = createEditInput(task, saveChanges, cancelEdit);
  
  // Reemplazar texto con input
  textContainer.style.display = 'none';
  textContainer.parentNode.insertBefore(editInput, textContainer);
  
  // Enfocar y seleccionar texto
  editInput.focus();
  editInput.select();
}

// Renderiza la lista de tareas en el DOM
function renderTasks() {
  // Limpiar lista
  list.innerHTML = '';
  
  // Obtener tareas filtradas
  const tasks = getFilteredTasks(currentFilter);
  
  // Crear fragment para optimizar DOM manipulation
  const fragment = document.createDocumentFragment();
  
  // Renderizar cada tarea usando destructuring en el forEach
  tasks.forEach(task => {
    const taskElement = renderTask(task);
    fragment.appendChild(taskElement);
  });
  
  list.appendChild(fragment);
}

// Función para manejar cambio de filtro
function handleFilterChange(newFilter) {
  currentFilter = newFilter;
  
  // Actualizar clases de botones usando destructuring
  Object.entries(filterButtons).forEach(([filterType, button]) => {
    button.classList.toggle('active', filterType === newFilter);
  });
  
  renderTasks();
}

// Event listeners para filtros usando destructuring
Object.entries(filterButtons).forEach(([filterType, button]) => {
  button.addEventListener('click', () => handleFilterChange(filterType));
});

// Maneja el evento submit del formulario para agregar una tarea
form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const taskText = input.value.trim();
  if (taskText) {
    addTask(taskText);
    input.value = '';
    renderTasks();
  }
});

// Event listener para tecla Enter en el input
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    form.dispatchEvent(new Event('submit'));
  }
});

// Render inicial de las tareas
renderTasks();

// Exportar funciones para testing (opcional)
export { renderTasks, handleFilterChange };