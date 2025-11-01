import { mostrarAlumnos } from "./Carga_datos.js";
import { prompt } from "./menu.js";
import { pausa } from "./menu.js";
import { guardarDatos, leerDatos } from "./Carga_datos.js";

export function calcularPromedioAsistencia(asistencias) {
  let promedio = 0;
  let presentes = 0;

  if (asistencias.length === 0) {
    return 0;
  }
  for (let i = 0; i < asistencias.length; i++) {
    if (asistencias[i] === "P") {
      presentes++;
    }
  }
  promedio = ((presentes / asistencias.length) * 100).toFixed(2);
  return promedio;
}

export function registrarAsistencias() {
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
    const indiceAlumno = Number(input) - 1;

    if (isNaN(indiceAlumno) || indiceAlumno < 0 || indiceAlumno >= estudiantes.length) {
      console.log("Numero invalido. Intente de nuevo.");
      continue;
    }

    for (let i = 0; i < estudiantes.length; i++) {
      if (estudiantes[i].nombre === estudiantes[indiceAlumno].nombre) {
        encontrado = true;
      }
      if (encontrado) {
        const asistio = prompt("Asistio?: s/n: ");
        if (asistio !== "s" && asistio !== "n") {
          console.log("Entrada invalida. Ingrese 's' para si o 'n' para no.");
          i--;
          continue;
        }

        if (asistio == "s") {
          estudiantes[i].asistencias.push("P");
          console.log(`Asistencia registrada como PRESENTE para ${estudiantes[indiceAlumno].nombre}`);
          guardarDatos(datos);
        }
        if (asistio == "n") {
          estudiantes[i].asistencias.push("A");
          console.log(`Asistencia registrada como AUSENTE para ${estudiantes[indiceAlumno].nombre}`);
          guardarDatos(datos);
        }
        let continuar = prompt(
          "Desea registrar otra asistencia para este alumno? (s/n): "
        );
        if (continuar.toLowerCase() === "s") {
          i--;
        }
        if (continuar.toLowerCase() === "n") {
          console.log("Asistencia/s registradas correctamente.");
          pausa();
          break;
        }
      }
    }
    if (!encontrado) {
      console.log(`Estudiante no encontrado.`);
    }
  } while (!encontrado);
}
 
export function modificarAsistencia() {
  const datos = leerDatos();

  if (datos.alumnos.length === 0) {
    console.log("No hay alumnos registrados.");
    pausa();
    return;
  }

  // Mostrar lista de alumnos
  mostrarAlumnos();

  const input = prompt("Ingrese el **NÚMERO** del alumno: ").trim();
  const indiceAlumno = Number(input) - 1;

  if (isNaN(indiceAlumno) || indiceAlumno < 0 || indiceAlumno >= datos.alumnos.length) {
    console.log("Número de alumno inválido.");
    pausa();
    return;
  }

  const alumno = datos.alumnos[indiceAlumno];

  // Mostrar asistencias actuales
  console.log(`Asistencias de ${alumno.nombre}:`);
  alumno.asistencias.forEach((asistencia, i) => {
    console.log(`${i + 1}- ${asistencia}`);
  });

  if (alumno.asistencias.length === 0) {
    console.log("Este alumno no tiene asistencias registradas.");
    pausa();
    return;
  }

  const posicion = prompt("Ingrese el **NÚMERO** de la asistencia a modificar: ").trim();
  const indiceAsistencia = Number(posicion) - 1;

  if (isNaN(indiceAsistencia) || indiceAsistencia < 0 || indiceAsistencia >= alumno.asistencias.length) {
    console.log("Número de asistencia inválido.");
    pausa();
    return;
  }

  const respuesta = prompt("¿El alumno estuvo presente? (s/n): ").toLowerCase();
  if (respuesta !== "s" && respuesta !== "n") {
    console.log("Respuesta inválida. Use 's' para presente o 'n' para ausente.");
    pausa();
    return;
  } else {
    const asistenciaAntigua = alumno.asistencias[indiceAsistencia];

    if (respuesta === "s") {
      const nuevaAsistencia = "P";
      alumno.asistencias[indiceAsistencia] = nuevaAsistencia;
      console.log(`Asistencia modificada de ${asistenciaAntigua} a ${nuevaAsistencia}.`);

    } else {
      const nuevaAsistencia = "A";
      alumno.asistencias[indiceAsistencia] = nuevaAsistencia;
      console.log(`Asistencia modificada de ${asistenciaAntigua} a ${nuevaAsistencia}.`);

    }
    guardarDatos(datos);
    pausa();
  }
}