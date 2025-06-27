const app = document.getElementById("app");
const buttons = document.querySelectorAll("button[data-route]");

const routes = {
  "/": () => `<h1>Inicio</h1><p>Bienvenido a nuestra SPA.</p>`,
  "/productos": () => `
    <h1>Productos</h1>
    <ul>
      <li><a href="/producto/1" data-link>Producto 1</a></li>
      <li><a href="/producto/2" data-link>Producto 2</a></li>
      <li><a href="/producto/3" data-link>Producto 3</a></li>
    </ul>
  `,
  "/contacto": () => `<h1>Contacto</h1><p>Escribinos a contacto@empresa.com</p>`
};

// Vista de detalle dinámica
function renderDetalle(id) {
  return `<h1>Detalle del Producto ${id}</h1><p>Este es el detalle del producto con ID ${id}.</p><a href="/productos" data-link>Volver a productos</a>`;
}

function render(path) {
  if (routes[path]) {
    app.innerHTML = routes[path]();
  } else if (path.startsWith("/producto/")) {
    const id = path.split("/")[2];
    app.innerHTML = renderDetalle(id);
  } else {
    app.innerHTML = `<h1>404</h1><p>Página no encontrada.</p>`;
  }
}

// Función que navega y actualiza URL
function navigateTo(path) {
  history.pushState(null, null, path);
  render(path);
}

// Listeners para botones
buttons.forEach(button => {
  button.addEventListener("click", () => {
    const route = button.dataset.route;
    navigateTo(route);
  });
});

// Delegación para enlaces internos con [data-link]
document.addEventListener("click", e => {
  if (e.target.matches("[data-link]")) {
    e.preventDefault();
    navigateTo(e.target.getAttribute("href"));
  }
});

// Soporte para navegación del navegador (atrás/adelante)
window.addEventListener("popstate", () => {
  render(location.pathname);
});

// Render inicial
render(location.pathname);