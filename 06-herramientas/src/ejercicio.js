// EJERCICIO: Instala la dependencia dayjs con npm y úsala para mostrar la fecha, con TODOs y comentarios guía.
import dayjs from 'dayjs';

// TODO: Usa dayjs para obtener la fecha y hora actual y mostrarla en el DOM
const now = dayjs().format('dddd, MMMM D, YYYY [a las] HH:mm:ss');
document.body.innerHTML = `
  <div style="font-family: Arial, sans-serif; padding: 20px; text-align: center;">
    <h1>📅 Ejercicio con dayjs</h1>
    <p style="font-size: 18px; color: #333;">
      Fecha y hora actual: <strong>${now}</strong>
    </p>
    <p style="color: #666; margin-top: 20px;">
      ¡Ejercicio completado! Se instaló dayjs y se está usando para mostrar la fecha.
    </p>
  </div>
`;

// Puedes ejecutar este archivo con Vite y ver el resultado en el navegador
