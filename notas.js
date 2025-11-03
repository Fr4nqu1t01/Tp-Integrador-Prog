import { prompt } from "./menu.js";
import { pausa } from "./menu.js";
import { guardarDatos, mostrarAlumnos, leerDatos } from "./Carga_datos.js";

export function registrarNotas() {
  const datos = leerDatos();

  if (datos.alumnos.length === 0) {
    console.log("No hay alumnos registrados.");
    pausa();
    return;
  }
  const estudiantes = datos.alumnos;
  let encontrado = false;

  mostrarAlumnos();
  do {
    const input = prompt("Ingrese el **NUMERO** del alumno: ");
    const indiceNombre = Number(input) - 1;

    if (isNaN(indiceNombre) || indiceNombre < 0 || indiceNombre >= estudiantes.length) {
      console.log("Numero invalido. Intente de nuevo.");
      continue;
    }

    for (let i = 0; i < estudiantes.length; i++) {
      if (estudiantes[i].nombre === estudiantes[indiceNombre].nombre) {
        encontrado = true;
      }

      if (encontrado) {
        const notaInput = prompt("Ingrese la nota (0-10): ");
        const nota = Number(notaInput);

        if (isNaN(nota) || nota < 0 || nota > 10) {
          console.log("Nota invalida. Debe ser un numero entre 0 y 10.");
          i--;
          continue;
        } else {
          estudiantes[i].notas.push(nota);
          console.log(`Nota ${nota} registrada para ${estudiantes[i].nombre}`);
          guardarDatos(datos);
        }
        const continuar = prompt(
          "Desea registrar otra nota para este alumno? (s/n): "
        );
        if (continuar.toLowerCase() === "s") {
          i--;
        }
        if (continuar.toLowerCase() === "n") {
          console.log("nota/s registradas correctamente.");
          break;
        }
      }
    }
    if (!encontrado) {
      console.log(`estudiante no encontrado. Intente de nuevo.`);
    }
  } while (!encontrado);
  pausa();
}

export function calcularPromedio(notas) {
  let promedio = 0;

  if (notas.length === 0) {
    return 0;
  }

  for (let i = 0; i < notas.length; i++) {
    promedio += notas[i];
  }
  promedio = promedio / notas.length;

  return promedio.toFixed(2);
}

export function modificarNota() {
  const datos = leerDatos();

  if (datos.alumnos.length === 0) {
    console.log("No hay alumnos registrados.");
    pausa();
    return;
  }

  mostrarAlumnos();
  let indiceAlumno = -1;
  while (
    isNaN(indiceAlumno) ||
    indiceAlumno < 0 ||
    indiceAlumno >= datos.alumnos.length
  ) {
    // este while se repite hasta que se ingrese un indice valido
    const input = prompt("Ingrese el **NÚMERO** del alumno: ").trim();
    indiceAlumno = Number(input) - 1;

    if (
      isNaN(indiceAlumno) ||
      indiceAlumno < 0 ||
      indiceAlumno >= datos.alumnos.length
    ) {
      console.log("Número de alumno inválido.");
      continue;
    }

    const alumno = datos.alumnos[indiceAlumno];

    // Mostrar notas actuales
    console.log(`Notas actuales de ${alumno.nombre}:`);
    alumno.notas.forEach((nota, i) => {
      console.log(`${i + 1}- ${nota}`);
    });

    if (alumno.notas.length === 0) {
      console.log("Este alumno no tiene notas registradas.");
      pausa();
      return;
    }
  }
  let indiceNota = -1;
  while (
    isNaN(indiceNota) ||
    indiceNota < 0 ||
    indiceNota >= datos.alumnos[indiceAlumno].notas[indiceNota].length
  ) {
    
    const posicion = prompt(
      "Ingrese el **NÚMERO** de la nota a modificar: "
    ).trim();
    indiceNota = Number(posicion) - 1;

    if (
      isNaN(indiceNota) ||
      indiceNota < 0 ||
      indiceNota >= datos.alumnos[indiceAlumno].notas[indiceNota].length
    ) {
      console.log("Numero de nota inválido, intentelo denuevo.");
      continue;
    }
  }
  let nuevaNota = -1;
  while (isNaN(nuevaNota) || nuevaNota < 0 || nuevaNota > 10) {

    const inputNota = prompt("Ingrese la nueva nota (0-10): ").trim();
    nuevaNota = Number(inputNota);

    if (isNaN(nuevaNota) || nuevaNota < 0 || nuevaNota > 10) {
      console.log("Nota inválida. Debe ser un número entre 0 y 10.");
      continue;
    }

    const notaAntigua = datos.alumnos[indiceAlumno].notas[indiceNota];
    datos.alumnos[indiceAlumno].notas[indiceNota] = nuevaNota;
    guardarDatos(datos);

    console.log(`Nota modificada: ${notaAntigua} A ${nuevaNota}`);
    pausa();
  }
}
