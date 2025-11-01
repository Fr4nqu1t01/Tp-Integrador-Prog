import { leerDatos, guardarDatos } from "./Carga_datos.js";
import { prompt } from "./menu.js";

export function agregarAlumno() {
  const datos = leerDatos();

  const nombre = prompt("Ingrese el nombre del nuevo alumno: ");

 // Verificamos que el nombre ingresado no este dentro del arreglo
  const existe = datos.alumnos.some((alumno) => alumno.nombre.toLowerCase() === nombre.toLowerCase()
  );

  if (existe) {
    console.log(`El alumno "${nombre}" ya existe.`);
    return;
  }

  // Creamos nuevo alumno sin notas ni asistencias
  const nuevoAlumno = {
    nombre,
    notas: [],
    asistencias: []
  };

  // lo agregamos al arreglo de alumnos y guardamos
  datos.alumnos.push(nuevoAlumno);
  guardarDatos(datos);

  console.log(`Alumno "${nombre}" agregado correctamente.`);
}

export function eliminarAlumno() {
  const datos = leerDatos();

  console.log("Lista actual de alumnos:");
  for (let i = 0; i < datos.alumnos.length; i++) {
    console.log((i + 1) + ". " + datos.alumnos[i].nombre);
  }

  const nombre = prompt("Ingrese el nombre del alumno a eliminar: ");

  let indice = -1;
  for (let i = 0; i < datos.alumnos.length; i++) {
    if (datos.alumnos[i].nombre.toLowerCase() === nombre.toLowerCase()) {
      indice = i;
      break;
    }
  }

  if (indice === -1) {
    console.log(`No se encontró ningún alumno llamado "${nombre}".`);
    return;
  }

  const confirmar = prompt(`¿Seguro que desea eliminar a "${nombre}"? (s/n): `);
  if (confirmar.toLowerCase() !== "s") {
    console.log("Operación cancelada.");
    return;
  }

  for (let i = indice; i < datos.alumnos.length - 1; i++) {
    datos.alumnos[i] = datos.alumnos[i + 1];
  }
  datos.alumnos.pop(); // quita el último (ahora duplicado)

  guardarDatos(datos);

  console.log(`Alumno "${nombre}" eliminado correctamente.`);
}
