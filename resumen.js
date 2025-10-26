export function mostrarResumenGeneral(datos) {
  const alumnos = datos.alumnos;
  for(let i = 0; i < alumnos.length; i++){
      let nombre = alumnos[i].nombre;
      let promedio = calcularPromedio(alumnos[i].notas);
      let asistencia = calcularPromedioAsistencia(alumnos[i].asistencias); 
      console.log(`
      ===========================================`)
      console.log(`
      Nombre: ${nombre}.
      Promedio de notas: ${promedio}.
      Promedio de asistencia: ${asistencia}%.`);
  }
}