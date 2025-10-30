import promptSync from "prompt-sync";
import { guardarDatos, leerDatos, mostrarAlumnos } from "./Carga_datos.js";
import { mostrarResumenGeneral } from "./resumen.js";
import { registrarNotas } from "./notas.js";
import { agregarAlumno } from "./abm.js";

export const prompt = promptSync();


export function menu() {
  let opcion = -1;
  while (opcion !== 0) {

    const datos = leerDatos();

    console.log(`
    =============== -Menu Control Alumnos- ===============
    1. Mostrar alumnos
    2. Registrar notas
    3. Registrar asistencias
    4. Mostrar resumen
    5. Agregar alumno
    0. Salir
    ======================================================`);

    const input = prompt("Ingrese una opcion: ").trim();
    opcion = Number(input);

    if (isNaN(opcion) || opcion > 5 || opcion < 0) {
      console.log("Opcion invalida. Intentelo de nuevo.");
      continue;
    }

    if (opcion === 1) {
      mostrarAlumnos();
    } else if (opcion === 2) {
      registrarNotas(datos);
      guardarDatos(datos);
    } else if (opcion === 3) {
      registrarAsistencias(datos);
      guardarDatos(datos);
    } else if (opcion === 4) {
      mostrarResumenGeneral(datos);
    } else if (opcion === 5) {
      agregarAlumno();
    }else if (opcion === 0) {
      console.log(`Saliendo...`);
    }
  }
}
