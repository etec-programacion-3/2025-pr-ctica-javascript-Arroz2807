const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const emptyCartBtn = document.getElementById("empty-cart");
const cartSummary = document.getElementById("cart-summary");

let cart = [];

productList.addEventListener("click", (e) => {
  if (e.target.classList.contains("add")) {
    const item = e.target.parentElement;
    const id = item.dataset.id;
    const name = item.dataset.name;
    const price = parseFloat(item.dataset.price);

    const existing = cart.find(product => product.id === id);
    if (existing) {
      existing.quantity++;
    } else {
      cart.push({ id, name, price, quantity: 1 });
    }

    renderCart();
  }
});

// Delegación de eventos para eliminar productos
cartList.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove")) {
    const id = e.target.dataset.id;
    cart = cart.filter(product => product.id !== id);
    renderCart();
  }
});

// Vaciar carrito
emptyCartBtn.addEventListener("click", () => {
  cart = [];
  renderCart();
});

function renderCart() {
  cartList.innerHTML = "";

  cart.forEach(product => {
    const li = document.createElement("li");
    li.textContent = `${product.name} x${product.quantity} - $${product.price * product.quantity}`;
    
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Eliminar";
    removeBtn.classList.add("remove");
    removeBtn.dataset.id = product.id;

    li.appendChild(removeBtn);
    cartList.appendChild(li);
  });

  updateSummary();
}

function updateSummary() {
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  cartSummary.textContent = `Total: ${totalItems} producto(s) | $${totalPrice}`;
}