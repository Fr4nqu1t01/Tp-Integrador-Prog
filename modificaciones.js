import { leerDatos, guardarDatos, mostrarAlumnos } from "./Carga_datos.js";
import { prompt } from "./menu.js";
import { pausa } from "./menu.js";
import { modificarNota } from "./notas.js";
import { modificarAsistencia } from "./Asistencias.js";

export function menuModificaciones() {
  const datos = leerDatos();
  
  if (datos.alumnos.length === 0) {
    console.log("No hay alumnos registrados.");
    pausa();
    return;
  }
  
  let opcion = -1;
  do {
    console.log(`
    =============== -Modificacion de Alumnos- ===============
      1. Modificar nombre
      2. Modificar notas
      3. Modificar asistencias
      0. Salir
    ======================================================`);
    const input = prompt("Ingrese un opcion: ").trim();
    opcion = Number(input);
    if (isNaN(opcion) || opcion > 3 || opcion < 0) {
      console.log("Opcion invalida. Intentelo de nuevo.");
      continue;
    }

    if (opcion === 1) {
      modificarNombre();
    } else if (opcion === 2) {
      modificarNota();
    } else if (opcion === 3) {
      modificarAsistencia();
    } else if (opcion === 0) {
      console.log("Saliendo de la modificacion de alumnos...");
      pausa();
      return;
    }
  } while (opcion !== 0);
}

export function modificarNombre() {
    mostrarAlumnos();
  const datos = leerDatos();
  const numero = Number(
    prompt("Ingrese el **NÚMERO** del alumno a modificar: ").trim()
  );
  const indice = Number(numero) - 1; //le restamos 1 para obtener el índice correcto

  if (isNaN(indice) || indice < 0 || indice >= datos.alumnos.length) {
    console.log("Número inválido. No se modificó ningún alumno.");
    pausa();
    return;
  }

  const nuevoNombre = prompt(
    `Ingrese el nuevo nombre para "${datos.alumnos[indice].nombre}": `
  ).trim();

  if (!nuevoNombre) {
    console.log("Nombre inválido. No se modificó el alumno.");
    pausa();
    return;
  }

  const antiguoNombre = datos.alumnos[indice].nombre; // guardamos el nombre antiguo para el mensaje final
  datos.alumnos[indice].nombre = nuevoNombre; // actualizamos el nombre
  guardarDatos(datos);

  console.log(`Alumno "${antiguoNombre}" ahora se llama "${nuevoNombre}".`);
}
