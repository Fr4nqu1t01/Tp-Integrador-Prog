import fs from 'fs'
export const rutaAlumnos = "./datos.json";

export function leerDatos() {
  const datos = JSON.parse(fs.readFileSync(rutaAlumnos, "utf8"));
  return datos;
}

export function guardarDatos(datos) {
  const texto = JSON.stringify(datos, null, 2);
  fs.writeFileSync(rutaAlumnos, texto, "utf8");
}

export function mostrarAlumnos() {
  const datos = leerDatos();

  if (datos.alumnos.length === 0) {
    console.log("No hay alumnos registrados.");
    return;
  }

  console.log(`Alumnos registrados:`);
  const alumnos = datos.alumnos;
  for (let i = 0; i < alumnos.length; i++) {
    console.log(`${i + 1}- ${alumnos[i].nombre}`);
  }
  console.log("====================================================");
}