export interface Departamento {
  _id?: string;
  name: string;
  fecha_fundacion: Date;
  alcalde : string;
  poblacion: number;
  bandera: string; // ruta de la imagen /uploads/nombre.png
}
