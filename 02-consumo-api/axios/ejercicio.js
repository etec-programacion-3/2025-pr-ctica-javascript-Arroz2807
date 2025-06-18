// URL base de la API de productos
const BASE_URL = 'http://localhost:3000/api/products';

// Referencias a los elementos del DOM
const list = document.getElementById('product-list');
const form = document.getElementById('product-form');
const loadingDiv = document.getElementById('loading');
const messagesDiv = document.getElementById('messages');
const modal = document.getElementById('product-modal');
const modalContent = document.getElementById('product-details');
const closeModal = document.querySelector('.close');

// Función para mostar mensajes de éxito o error
function showMessage(message, type = 'success') {
  const messageElement = document.createElement('div');
  messageElement.className = type;
  messageElement.textContent = message;
  messagesDiv.appendChild(messageElement);
  
  // Remover mensaje después de 3 segundos
  setTimeout(() => {
    messageElement.remove();
  }, 3000);
}

// Función para mostrar/ocultar loading
function setLoading(show) {
  loadingDiv.style.display = show ? 'block' : 'none';
}

// Obtiene y muestra la lista de productos desde la API usando axios (GET resuelto)
async function fetchProducts() {
  try {
    setLoading(true);
    const res = await axios.get(BASE_URL);
    const products = res.data;
    
    list.innerHTML = '';
    if (products.length === 0) {
      list.innerHTML = '<li style="text-align: center; color: #666; font-style: italic;">No hay productos disponibles</li>';
      return;
    }
    
    products.forEach(prod => {
      const li = document.createElement('li');
      
      // Crear contenedor para la información del producto
      const productInfo = document.createElement('div');
      productInfo.className = 'product-info';
      productInfo.textContent = `${prod.name} - $${parseFloat(prod.price).toFixed(2)}`;
      
      // Llama a showDetails al hacer clic en el nombre del producto
      productInfo.onclick = () => showDetails(prod.id);
      
      // Botón para eliminar
      const btn = document.createElement('button');
      btn.className = 'delete-btn';
      btn.textContent = '🗑️ Eliminar';
      btn.onclick = async (e) => {
        e.stopPropagation();
        // Confirmar eliminación
        if (confirm(`¿Estás seguro de que deseas eliminar "${prod.name}"?`)) {
          await deleteProduct(prod.id);
        }
      };
      
      li.appendChild(productInfo);
      li.appendChild(btn);
      list.appendChild(li);
    });
  } catch (err) {
    console.error('Error al obtener productos:', err);
    showMessage('Error al obtener productos. Verifica que el servidor esté funcionando.', 'error');
    list.innerHTML = '<li style="text-align: center; color: #dc3545;">Error al cargar productos</li>';
  } finally {
    setLoading(false);
  }
}

// EJERCICIO COMPLETADO: Función para crear un producto usando axios POST
async function createProduct(name, price, description) {
  try {
    // Validar datos antes de enviar
    if (!name.trim() || !price || !description.trim()) {
      showMessage('Todos los campos son obligatorios', 'error');
      return false;
    }
    
    if (parseFloat(price) <= 0) {
      showMessage('El precio debe ser mayor a 0', 'error');
      return false;
    }
    
    setLoading(true);
    
    // Realizar petición POST con axios
    const response = await axios.post(BASE_URL, {
      name: name.trim(),
      price: parseFloat(price),
      description: description.trim()
    });
    
    showMessage(`Producto "${name}" creado exitosamente`, 'success');
    await fetchProducts(); // Recargar lista de productos
    return true;
    
  } catch (err) {
    console.error('Error al crear producto:', err);
    
    // Manejo específico de errores
    if (err.response) {
      // El servidor respondió con un código de error
      const status = err.response.status;
      const message = err.response.data?.message || 'Error desconocido';
      
      if (status === 400) {
        showMessage(`Datos inválidos: ${message}`, 'error');
      } else if (status === 409) {
        showMessage('Ya existe un producto con ese nombre', 'error');
      } else {
        showMessage(`Error del servidor (${status}): ${message}`, 'error');
      }
    } else if (err.request) {
      // La petición se hizo pero no hubo respuesta
      showMessage('No se pudo conectar con el servidor', 'error');
    } else {
      // Error en la configuración de la petición
      showMessage('Error al procesar la petición', 'error');
    }
    return false;
  } finally {
    setLoading(false);
  }
}

// EJERCICIO COMPLETADO: Función para eliminar un producto usando axios DELETE
async function deleteProduct(id) {
  try {
    setLoading(true);
    
    // Realizar petición DELETE con axios
    await axios.delete(`${BASE_URL}/${id}`);
    
    showMessage('Producto eliminado exitosamente', 'success');
    await fetchProducts(); // Recargar lista de productos
    
  } catch (err) {
    console.error('Error al eliminar producto:', err);
    
    // Manejo específico de errores
    if (err.response) {
      const status = err.response.status;
      const message = err.response.data?.message || 'Error desconocido';
      
      if (status === 404) {
        showMessage('Producto no encontrado', 'error');
      } else {
        showMessage(`Error al eliminar producto (${status}): ${message}`, 'error');
      }
    } else if (err.request) {
      showMessage('No se pudo conectar con el servidor', 'error');
    } else {
      showMessage('Error al procesar la petición de eliminación', 'error');
    }
  } finally {
    setLoading(false);
  }
}

// EJERCICIO COMPLETADO: Función para mostrar detalles usando axios GET /products/:id
async function showDetails(id) {
  try {
    setLoading(true);
    
    // Realizar petición GET para obtener detalles del producto
    const res = await axios.get(`${BASE_URL}/${id}`);
    const prod = res.data;
    
    // Mostrar detalles en modal en lugar de alert
    modalContent.innerHTML = `
      <h2>📦 Detalles del Producto</h2>
      <div style="margin: 20px 0;">
        <p><strong>🏷️ Nombre:</strong> ${prod.name}</p>
        <p><strong>💰 Precio:</strong> $${parseFloat(prod.price).toFixed(2)}</p>
        <p><strong>📝 Descripción:</strong> ${prod.description}</p>
        <p><strong>🆔 ID:</strong> ${prod.id}</p>
        ${prod.createdAt ? `<p><strong>📅 Creado:</strong> ${new Date(prod.createdAt).toLocaleString()}</p>` : ''}
        ${prod.updatedAt ? `<p><strong>🔄 Actualizado:</strong> ${new Date(prod.updatedAt).toLocaleString()}</p>` : ''}
      </div>
    `;
    
    modal.style.display = 'block';
    
  } catch (err) {
    console.error('Error al obtener detalles:', err);
    
    // Manejo específico de errores
    if (err.response && err.response.status === 404) {
      showMessage('Producto no encontrado', 'error');
    } else if (err.request) {
      showMessage('No se pudo conectar con el servidor', 'error');
    } else {
      showMessage('Error al obtener detalles del producto', 'error');
    }
  } finally {
    setLoading(false);
  }
}

// Event listeners para el modal
closeModal.onclick = () => {
  modal.style.display = 'none';
};

window.onclick = (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};

// Cerrar modal con tecla Escape
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal.style.display === 'block') {
    modal.style.display = 'none';
  }
});

// Maneja el submit del formulario para crear un producto
form.onsubmit = async (e) => {
  e.preventDefault();
  
  // Obtener valores del formulario
  const name = document.getElementById('name').value;
  const price = document.getElementById('price').value;
  const description = document.getElementById('description').value;
  
  // Llamar a la función de crear producto
  const success = await createProduct(name, price, description);
  
  // Limpiar formulario solo si fue exitoso
  if (success) {
    form.reset();
    // Enfocar el primer campo para facilitar la entrada de más productos
    document.getElementById('name').focus();
  }
};

// Configuración de axios (opcional pero recomendado)
axios.defaults.timeout = 10000; // 10 segundos timeout
axios.defaults.headers.common['Content-Type'] = 'application/json';

// Interceptor para manejar errores globalmente (opcional)
axios.interceptors.response.use(
  response => response,
  error => {
    console.error('Axios Error:', error);
    return Promise.reject(error);
  }
);

// Render inicial - Cargar productos al iniciar la página
document.addEventListener('DOMContentLoaded', () => {
  fetchProducts();
});

// También llamar directamente por si el DOM ya está cargado
fetchProducts();