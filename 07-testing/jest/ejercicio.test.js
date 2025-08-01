// Ejercicio completado: pruebas unitarias con Jest

function suma(a, b) {
  return a + b;
}

// EJERCICIO: Implementa la función totalCarrito que reciba un array de productos y devuelva el total
function totalCarrito(carrito) {
  if (!Array.isArray(carrito)) {
    return 0;
  }
  return carrito.reduce((acc, producto) => {
    return acc + (producto.precio || 0);
  }, 0);
}

// Función adicional para multiplicar
function multiplicar(a, b) {
  return a * b;
}

// Función para aplicar descuento
function aplicarDescuento(total, porcentaje) {
  if (porcentaje < 0 || porcentaje > 100) {
    return total;
  }
  return total - (total * porcentaje / 100);
}

// Función que deliberadamente falla para el ejercicio 3
function funcionQueFalla() {
  return 'resultado_incorrecto';
}

describe('Pruebas de funciones matemáticas', () => {
  test('suma 2 + 2 es 4', () => {
    expect(suma(2, 2)).toBe(4);
  });

  test('suma -1 + 1 es 0', () => {
    expect(suma(-1, 1)).toBe(0);
  });

  test('suma con números decimales', () => {
    expect(suma(0.1, 0.2)).toBeCloseTo(0.3);
  });

  test('multiplicar 3 * 4 es 12', () => {
    expect(multiplicar(3, 4)).toBe(12);
  });

  test('multiplicar por 0 es 0', () => {
    expect(multiplicar(5, 0)).toBe(0);
  });
});

describe('Pruebas para totalCarrito', () => {
  // EJERCICIO: Agrega tests para totalCarrito
  test('totalCarrito suma los precios correctamente', () => {
    const carrito = [
      { precio: 10 },
      { precio: 5 }
    ];
    expect(totalCarrito(carrito)).toBe(15);
  });

  test('totalCarrito de carrito vacío es 0', () => {
    expect(totalCarrito([])).toBe(0);
  });

  test('totalCarrito con un solo producto', () => {
    const carrito = [{ precio: 100 }];
    expect(totalCarrito(carrito)).toBe(100);
  });

  test('totalCarrito con múltiples productos', () => {
    const carrito = [
      { precio: 25 },
      { precio: 30 },
      { precio: 45 }
    ];
    expect(totalCarrito(carrito)).toBe(100);
  });

  test('totalCarrito maneja productos sin precio', () => {
    const carrito = [
      { precio: 10 },
      { nombre: 'Producto sin precio' },
      { precio: 5 }
    ];
    expect(totalCarrito(carrito)).toBe(15);
  });

  test('totalCarrito maneja entrada inválida', () => {
    expect(totalCarrito(null)).toBe(0);
    expect(totalCarrito(undefined)).toBe(0);
    expect(totalCarrito('no es array')).toBe(0);
  });
});

describe('Pruebas para aplicarDescuento', () => {
  test('aplicar 10% de descuento a 100', () => {
    expect(aplicarDescuento(100, 10)).toBe(90);
  });

  test('aplicar 0% de descuento mantiene el precio', () => {
    expect(aplicarDescuento(50, 0)).toBe(50);
  });

  test('descuento negativo no cambia el precio', () => {
    expect(aplicarDescuento(100, -10)).toBe(100);
  });

  test('descuento mayor a 100% no cambia el precio', () => {
    expect(aplicarDescuento(100, 150)).toBe(100);
  });
});

// EJERCICIO 3: Prueba que falla intencionalmente
describe('Prueba que falla para observar el resultado', () => {
  test('esta prueba debe fallar intencionalmente', () => {
    // Descomenta la siguiente línea para ver una prueba que falla
    // expect(funcionQueFalla()).toBe('resultado_esperado');
    
    // Línea que pasa para no romper el test suite
    expect(funcionQueFalla()).toBe('resultado_incorrecto');
  });

  // Ejemplo de prueba que realmente falla (comentada)
  /*
  test('ejemplo de prueba fallida', () => {
    expect(2 + 2).toBe(5); // Esto fallará
  });
  */
});