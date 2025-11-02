import { leerDatos, guardarDatos, mostrarAlumnos } from "./Carga_datos.js";
import { prompt } from "./menu.js";
import { pausa } from "./menu.js";

export function agregarAlumno() {
  const datos = leerDatos();

  const nombre = prompt("Ingrese el nombre del nuevo alumno: ");

  // Verificamos que el nombre ingresado no este dentro del arreglo
  const existe = datos.alumnos.some(
    (alumno) => alumno.nombre.toLowerCase() === nombre.toLowerCase()
  );

  if (existe) {
    console.log(`El alumno "${nombre}" ya existe.`);
    pausa();
    return;
  }

  // Creamos nuevo alumno sin notas ni asistencias
  const nuevoAlumno = {
    nombre,
    notas: [],
    asistencias: [],
  };

  // lo agregamos al arreglo de alumnos y guardamos
  datos.alumnos.push(nuevoAlumno);
  guardarDatos(datos);

  console.log(`Alumno "${nombre}" agregado correctamente.`);
  pausa();
}

export function eliminarAlumno() {
  const datos = leerDatos();

  if (datos.alumnos.length === 0) {
    console.log("No hay alumnos registrados para eliminar.");
    pausa();
    return;
  }

  mostrarAlumnos();
  let indiceAlumno = -1;
  do {
    const input = prompt(
      "Ingrese el **NUMERO** del alumno a eliminar: "
    ).trim();
    indiceAlumno = Number(input) - 1;

    if (
      isNaN(indiceAlumno) ||
      indiceAlumno < 0 ||
      indiceAlumno >= datos.alumnos.length
    ) {
      console.log("Numero invalido. Intente de nuevo.");
      continue;
    }

    if (
      isNaN(indiceAlumno) ||
      indiceAlumno < 0 ||
      indiceAlumno >= datos.alumnos.length
    ) {
      console.log("Número de alumno inválido.");
      pausa();
      return;
    }

    const confirmar = prompt(
      `¿Seguro que desea eliminar a "${datos.alumnos[indiceAlumno].nombre}"? (s/n): `
    );
    if (confirmar.toLowerCase() !== "s") {
      console.log("Operación cancelada.");
      pausa();
      return;
    }

    const indice = indiceAlumno;
    for (let i = indice; i < datos.alumnos.length - 1; i++) {
      datos.alumnos[i] = datos.alumnos[i + 1];
    }
    console.log(
      `Alumno "${datos.alumnos[indice].nombre}" eliminado correctamente.`
    );
    datos.alumnos.pop(); // quita el último (ahora duplicado)
    guardarDatos(datos);
    pausa();
    break;
  } while (
    isNaN(indiceAlumno) ||
    indiceAlumno < 0 ||
    indiceAlumno >= datos.alumnos.length
  );
}
