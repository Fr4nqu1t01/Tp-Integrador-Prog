import { prompt } from "./menu.js";

export function registrarNotas(datos) {
    const estudiantes = datos.alumnos;

    let alumno = prompt("Ingrese el nombre del alumno: ");
    console.log("ALUMNO: " + alumno);
    for (let i = 0; i < estudiantes.length; i++) {
        if (estudiantes[i].nombre.toLowerCase() === alumno.toLowerCase()) {
            let notaInput = prompt("Ingrese la nota (0-10): ");
            let nota = Number(notaInput);

            if (!isNaN(nota) && nota >= 0 && nota <= 10) {
                estudiantes[i].notas.push(nota);
                console.log(`Nota ${nota} registrada para ${alumno}`);

            } else {
                console.log("Nota invalida. Debe ser un numero entre 0 y 10.");
                i--;
            }
            let continuar = prompt("Desea registrar otra nota para este alumno? (s/n): ");
            if (continuar.toLowerCase() === "s") {
                i--;
            } 
            if (continuar.toLowerCase() === "n") {
                console.log("nota/s registradas correctamente.");
            }

        }
    }
}
export function calcularPromedio(notas) {
    let promedio = 0;

    if (notas.length === 0) {
        return 0;
    }

    for (let i = 0; i < notas.length; i++) {
        promedio += notas[i];
    }
    promedio = ((promedio / notas.length)*100).toFixed(2);

    return promedio;
}