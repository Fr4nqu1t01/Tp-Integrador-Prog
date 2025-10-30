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