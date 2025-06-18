// URL base de la API de productos
const BASE_URL = 'http://localhost:5000/api/products';

// Referencias a los elementos del DOM
const list = document.getElementById('product-list');
const form = document.getElementById('product-form');

// Obtiene y muestra la lista de productos desde la API usando axios
async function fetchProducts() {
  try {
    const res = await axios.get(BASE_URL); // Realiza una petición GET
    const products = res.data; // Axios retorna los datos en la propiedad 'data'
    list.innerHTML = '';
    
    if (products.length === 0) {
      list.innerHTML = '<li>No hay productos disponibles</li>';
      return;
    }
    
    products.forEach(prod => {
      const li = document.createElement('li');
      li.textContent = `${prod.name} - $${prod.price}`;
      // Llama a showDetails al hacer clic en el nombre del producto
      li.onclick = () => showDetails(prod.id);
      // Crea el botón de eliminar y llama a deleteProduct
      const btn = document.createElement('button');
      btn.textContent = 'Eliminar';
      btn.onclick = e => {
        e.stopPropagation(); // Evita que se dispare el evento de detalles
        if (confirm('¿Estás seguro de eliminar este producto?')) {
          deleteProduct(prod.id).then(fetchProducts);
        }
      };
      li.appendChild(btn);
      list.appendChild(li);
    });
  } catch (err) {
    console.error('Error:', err);
    alert('Error al obtener productos. Verifica que el servidor esté funcionando.');
  }
}

// EJERCICIO 1 COMPLETADO: Crear producto
// Completa esta función para enviar los datos del formulario usando axios POST
async function createProduct(name, price, description) {
  try {
    // Validar que los campos no estén vacíos
    if (!name.trim() || !price || !description.trim()) {
      alert('Todos los campos son obligatorios');
      return false;
    }
    
    // Realizar petición POST con axios
    await axios.post(BASE_URL, {
      name: name.trim(),
      price: parseFloat(price),
      description: description.trim()
    });
    
    alert('Producto creado exitosamente');
    return true;
    
  } catch (err) {
    console.error('Error al crear producto:', err);
    
    // Manejo de errores específicos
    if (err.response) {
      // El servidor respondió con un código de error
      alert(`Error: ${err.response.data?.message || 'Error del servidor'}`);
    } else if (err.request) {
      // La petición se hizo pero no hubo respuesta
      alert('No se pudo conectar con el servidor');
    } else {
      // Error en la configuración de la petición
      alert('Error al crear el producto');
    }
    return false;
  }
}

// EJERCICIO 2 COMPLETADO: Eliminar producto
// Completa esta función para eliminar un producto usando axios DELETE
async function deleteProduct(id) {
  try {
    // Realizar petición DELETE con axios
    await axios.delete(`${BASE_URL}/${id}`);
    alert('Producto eliminado exitosamente');
    
  } catch (err) {
    console.error('Error al eliminar producto:', err);
    
    // Manejo de errores
    if (err.response && err.response.status === 404) {
      alert('Producto no encontrado');
    } else if (err.request) {
      alert('No se pudo conectar con el servidor');
    } else {
      alert('Error al eliminar el producto');
    }
  }
}

// EJERCICIO 3 COMPLETADO: Ver detalles de producto
// Completa esta función para mostrar detalles usando axios GET /products/:id
async function showDetails(id) {
  try {
    // Realizar petición GET para obtener detalles del producto
    const res = await axios.get(`${BASE_URL}/${id}`);
    const prod = res.data;
    
    // Mostrar detalles en un alert (o podrías usar un modal)
    const details = `
Detalles del Producto:
━━━━━━━━━━━━━━━━━━━━
Nombre: ${prod.name}
Precio: $${parseFloat(prod.price).toFixed(2)}
Descripción: ${prod.description}
ID: ${prod.id}
${prod.createdAt ? `Creado: ${new Date(prod.createdAt).toLocaleDateString()}` : ''}
    `.trim();
    
    alert(details);
    
  } catch (err) {
    console.error('Error al obtener detalles:', err);
    
    // Manejo de errores
    if (err.response && err.response.status === 404) {
      alert('Producto no encontrado');
    } else if (err.request) {
      alert('No se pudo conectar con el servidor');
    } else {
      alert('Error al obtener detalles del producto');
    }
  }
}

// Maneja el submit del formulario para crear un producto
form.onsubmit = async e => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const price = document.getElementById('price').value;
  const description = document.getElementById('description').value;
  
  // Llama a la función de crear producto
  const success = await createProduct(name, price, description);
  
  // Solo resetear el formulario si fue exitoso
  if (success) {
    form.reset();
    fetchProducts(); // Recargar la lista
  }
};

// Configuración opcional de axios
axios.defaults.timeout = 5000; // 5 segundos timeout

// Llama a la función para mostrar los productos al cargar la página
fetchProducts();