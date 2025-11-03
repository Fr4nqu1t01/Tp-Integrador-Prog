import { leerDatos, guardarDatos, mostrarAlumnos } from "./Carga_datos.js";
import { prompt } from "./menu.js";
import { pausa } from "./menu.js";
import { modificarNota } from "./notas.js";
import { modificarAsistencia } from "./Asistencias.js";

export function menuModificaciones() {
  console.clear();
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
      0. volver
    ======================================================`);
    const input = prompt("Ingrese un opcion: ").trim();
    opcion = Number(input);
    if (isNaN(opcion) || opcion > 3 || opcion < 0) {
      console.log("Opcion invalida. Intentelo de nuevo.");
      pausa();
      console.clear();
      continue;
    }

    if (opcion === 1) {
      modificarNombre();
      console.clear();
    } else if (opcion === 2) {
      modificarNota();
      console.clear();
    } else if (opcion === 3) {
      modificarAsistencia();
      console.clear();
    } else if (opcion === 0) {
      console.log("Saliendo de la modificacion de alumnos...");
      pausa();
      console.clear();
      return;
    }
  } while (opcion !== 0);
}

function modificarNombre() {
  const datos = leerDatos();

  if (datos.alumnos.length === 0) {
    console.log("No hay alumnos registrados.");
    pausa();
    return;
  }
  mostrarAlumnos();
  let indice = -1;
  while (isNaN(indice) || indice < 0 || indice >= datos.alumnos.length) {
    const numero = prompt(
      "Ingrese el **NÚMERO** del alumno a modificar: "
    ).trim();
    indice = Number(numero) - 1;

    if (isNaN(indice) || indice < 0 || indice >= datos.alumnos.length) {
      console.log("Número inválido, intentelo denuevo.");
      continue;
    }

    const nuevoNombre = prompt(
      `Ingrese el nuevo nombre para "${datos.alumnos[indice].nombre}": `
    ).trim();

    const antiguoNombre = datos.alumnos[indice].nombre; // guardamos el nombre antiguo para el mensaje final
    datos.alumnos[indice].nombre = nuevoNombre; // actualizamos el nombre
    guardarDatos(datos);

    console.log(`Alumno "${antiguoNombre}" ahora se llama "${nuevoNombre}".`);
    pausa();
  }
}
