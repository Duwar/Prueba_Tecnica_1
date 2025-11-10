export interface User {
    _id: string;
    codigo_usuario: string;
    username: string;
    fotoPerfil: string;
    nombre: string;
    apellido1: string;
    apellido2: string;
    Edad: number;
    name_departamento: {
    _id: string;
    name: string;
     };
    contrasena: string;
    role: string;
}
