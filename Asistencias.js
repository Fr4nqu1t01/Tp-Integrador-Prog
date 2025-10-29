export function calcularPromedioAsistencia(asistencias) {
    let promedio = 0;
    let presentes = 0;

    if (asistencias.length === 0) {
        return 0;
    }
    for (let i = 0; i < asistencias.length; i++) {
        if (asistencias[i] === true) {
            presentes++;
        }
    }
    promedio = ((presentes / asistencias.length) * 100).toFixed(2);
    return promedio;
}


export function registrarAsistencias(datos) {

    const estudiantes = datos.alumnos;

    let encontrado = false;

    let alumno = prompt("Ingrese el nombre del alumno: ");

    for (let i = 0; i < estudiantes.length; i++) {
        
        if (estudiantes[i].nombre === alumno) {
            encontrado = true;

            let asistio = prompt("Asistio?: s/n: ");

            if (asistio == "s") {
                estudiantes[i].asistencias.push(true);
                console.log(`Asistencia registrada como PRESENTE para ${alumno}`)
                break;

            } else {
                estudiantes[i].asistencias.push(false);
                console.log(`Asistencia registrada como AUSENTE para ${alumno}`)
            }
        }

    } 

    if (encontrado == false) {
    console.log(`Estudiante ${alumno} no encontrado.`);
}
}