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