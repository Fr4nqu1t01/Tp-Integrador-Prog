import { leerDatos } from "./Carga_datos.js";
import { calcularPromedio} from "./notas.js";
import { calcularPromedioAsistencia } from "./Asistencias.js";
import { pausa } from "./menu.js";

export function mostrarResumenGeneral() {
  const datos = leerDatos();
  
  if (datos.alumnos.length === 0) {
    console.log("No hay alumnos registrados.");
    pausa();
    return;
  }
  const alumnos = datos.alumnos;
  for(let i = 0; i < alumnos.length; i++){

      const nombre = alumnos[i].nombre;
      const notas = alumnos[i].notas;
      const asistencias = alumnos[i].asistencias;
      const promedio = calcularPromedio(alumnos[i].notas);
      const asistencia = calcularPromedioAsistencia(alumnos[i].asistencias); 
      console.log(`
      ===========================================`)
      console.log(`
      Nombre: ${nombre}.
      Notas: ${notas}.
      Asistencias: ${asistencias}.

      Promedio de notas: ${promedio}.
      Promedio de asistencia: ${asistencia}%.
      ===========================================`);
  }
  pausa();
}