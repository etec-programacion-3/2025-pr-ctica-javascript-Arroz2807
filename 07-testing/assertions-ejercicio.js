 // Ejercicio completado de testing con console.assert
// Permite verificar que las funciones devuelvan el resultado esperado

// Función simple de suma
function suma(a, b) {
  return a + b;
}

// EJERCICIO 1: Función que calcule el total de un carrito
function totalCarrito(carrito) {
  if (!Array.isArray(carrito)) {
    return 0;
  }
  return carrito.reduce((acc, producto) => {
    return acc + (producto.precio || 0);
  }, 0);
}

// Función adicional para calcular descuento
function aplicarDescuento(total, porcentaje) {
  if (porcentaje < 0 || porcentaje > 100) {
    return total;
  }
  return total - (total * porcentaje / 100);
}

// Función para validar email simple
function esEmailValido(email) {
  return typeof email === 'string' && email.includes('@') && email.includes('.');
}

console.log('🧪 Ejecutando pruebas con console.assert...\n');

// Pruebas de suma
console.assert(suma(2, 2) === 4, '❌ Error: 2 + 2 debe ser 4');
console.assert(suma(-1, 1) === 0, '❌ Error: -1 + 1 debe ser 0');
console.assert(suma(0, 0) === 0, '❌ Error: 0 + 0 debe ser 0');
console.assert(suma(3.5, 2.5) === 6, '❌ Error: 3.5 + 2.5 debe ser 6');

// EJERCICIO 1: Pruebas para totalCarrito
console.assert(totalCarrito([{precio: 10}, {precio: 5}]) === 15, '❌ Error: Total debe ser 15');
console.assert(totalCarrito([]) === 0, '❌ Error: Total de carrito vacío debe ser 0');
console.assert(totalCarrito([{precio: 100}]) === 100, '❌ Error: Total de un producto debe ser 100');
console.assert(totalCarrito([{precio: 25}, {precio: 30}, {precio: 45}]) === 100, '❌ Error: Total de tres productos debe ser 100');

// Pruebas adicionales para casos edge
console.assert(totalCarrito(null) === 0, '❌ Error: null debe devolver 0');
console.assert(totalCarrito(undefined) === 0, '❌ Error: undefined debe devolver 0');
console.assert(totalCarrito([{}, {precio: 10}]) === 10, '❌ Error: Producto sin precio debe ser ignorado');

// Pruebas para aplicarDescuento
console.assert(aplicarDescuento(100, 10) === 90, '❌ Error: 100 con 10% descuento debe ser 90');
console.assert(aplicarDescuento(50, 20) === 40, '❌ Error: 50 con 20% descuento debe ser 40');
console.assert(aplicarDescuento(100, 0) === 100, '❌ Error: Sin descuento debe mantener el precio');
console.assert(aplicarDescuento(100, -5) === 100, '❌ Error: Descuento negativo debe mantener el precio');
console.assert(aplicarDescuento(100, 150) === 100, '❌ Error: Descuento mayor a 100% debe mantener el precio');

// Pruebas para validación de email
console.assert(esEmailValido('test@example.com') === true, '❌ Error: Email válido debe devolver true');
console.assert(esEmailValido('invalid-email') === false, '❌ Error: Email sin @ debe devolver false');
console.assert(esEmailValido('test@') === false, '❌ Error: Email sin dominio debe devolver false');
console.assert(esEmailValido('@example.com') === false, '❌ Error: Email sin usuario debe devolver false');
console.assert(esEmailValido('') === false, '❌ Error: Email vacío debe devolver false');
console.assert(esEmailValido(null) === false, '❌ Error: null debe devolver false');

console.log('✅ Todas las pruebas completadas. Si no ves errores arriba, todas pasaron correctamente!');
console.log('🎯 Ejercicio resuelto: Se implementaron pruebas para el cálculo del total de un carrito y funciones adicionales.');