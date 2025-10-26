import promptSync from "prompt-sync";
import { guardarDatos } from "./Carga_datos.js";
import { mostrarResumenGeneral } from "./resumen.js";

const prompt = promptSync();


export function menu(datos) {
  let opcion = -1;
  while (opcion !== 0) {
    console.log(`
    =============== -Menu Control Alumnos- ===============
    1. Mostrar alumnos
    2. Registrar notas
    3. Registrar asistencias
    4. Mostrar resumen
    0. Salir
    ======================================================`);

    const input = prompt("Ingrese una opcion: ").trim();
    opcion = Number(input);

    if (isNaN(opcion) || opcion > 4 || opcion < 0) {
      console.log("Opcion invalida. Intentelo de nuevo.");
      continue;
    }

    if (opcion === 1) {
      console.log(`
        alumnos registrados: 
        `);
      const alumnos = datos.alumnos;
      for (let i = 0; i < alumnos.length; i++) {
        console.log(`${i + 1}- ${alumnos[i].nombre}`);
      }
    } else if (opcion === 2) {
      registrarNotas(datos);
      guardarDatos(datos);
      console.log(`Nota/s registradas y guardadas correctamente.`);
    } else if (opcion === 3) {
      registrarAsistencias(datos);
      guardarDatos(datos);
      console.log(`Asistencia/s registradas y guardadas correctamente.`);
    } else if (opcion === 4) {
      mostrarResumenGeneral(datos);
    } else if (opcion === 0) {
      console.log(`Saliendo...`);
    }
  }
}
