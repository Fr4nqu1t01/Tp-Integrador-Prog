import promptSync from "prompt-sync";
import { leerDatos, mostrarAlumnos } from "./Carga_datos.js";
import { mostrarResumenGeneral } from "./resumen.js";
import { registrarNotas } from "./notas.js";
import { registrarAsistencias } from "./Asistencias.js";
import { agregarAlumno, eliminarAlumno } from "./Agregar_Eliminar.js";
import { menuModificaciones } from "./modificaciones.js";

export const prompt = promptSync();

export function pausa() {
  prompt("Presione Enter para continuar...");
}

export function menu() {
  let opcion = -1;
  while (opcion !== 0) {

  leerDatos();

    console.log(`
    =============== -Menu Control Alumnos- ===============
    1. Mostrar alumnos
    2. Registrar notas
    3. Registrar asistencias
    4. Mostrar resumen
    5. Agregar alumno
    6. Eliminar alumno
    7. Modificar alumno
    0. Salir
    ======================================================`);

    const input = prompt("Ingrese una opcion: ").trim();
    opcion = Number(input);

    if (isNaN(opcion) || opcion > 7 || opcion < 0) {
      console.log("Opcion invalida. Intentelo de nuevo.");
      continue;
    }

    if (opcion === 1) {
      mostrarAlumnos();
      pausa();
    } else if (opcion === 2) {
      registrarNotas();
    } else if (opcion === 3) {
      registrarAsistencias();
    } else if (opcion === 4) {
      mostrarResumenGeneral();
    } else if (opcion === 5) {
      agregarAlumno();
    } else if (opcion === 6) {
      eliminarAlumno();
    } else if (opcion === 7) {
      menuModificaciones();
    } else if (opcion === 0) {
      console.log(`Saliendo...`);
    }
  }
}