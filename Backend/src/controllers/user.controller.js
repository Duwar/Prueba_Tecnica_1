import { usuarioModel } from "../models/users.model.js";
import { departamentoModel } from "../models/departamento.model.js";
import bcryptjs from "bcryptjs";

// 1. Crear un usuario (POST)
export const postUsers = async (request, response) => {
    try {
        //validar que venga el archivo enviado por el cliente
        if (!request.file) {
            return response.status(400).json({
                "mensaje": "Debes subir un archivo de imagen"
            });
        };

        // Buscar departamento por nombre
        const departamento = await departamentoModel.findOne({ name: request.body.name_departamento });
        if (!departamento) {
            return response.status(404).json({ mensaje: "Departamento no encontrado" });
        }

        const codedPassword = await bcryptjs.hash(request.body.contrasena, 10);

        // crear el nuevo usuario con la contraseña encriptada
        const newUser = new usuarioModel({
            ...request.body,
            contrasena: codedPassword,
            fotoPerfil: `/uploads/${request.file.filename}`,
            name_departamento: departamento._id

        });

        await newUser.save();

        return response.status(201).json({
            "mensaje": "Usuario creado correctamente"
        });

    } catch (error) {
        return response.status(400).json({
            "mensaje": "ocurrio un error al crear el usuario",
            "error": error.message || error
        });
    }
};

// 2. Obtener todos los usuarios (GET)
export const getAllUsers = async (request, response) => {
    try {
        const allUsers = await usuarioModel.find().populate({ path: "name_departamento", select: "name" }).select('-contrasena');
        return response.status(200).json({
            "mensaje": "Petición Exitosa",
            "data": allUsers
        });

    } catch (error) {
        return response.status(400).json({
            "mensaje": "ocurrio un error al mostrar los usuarios",
            "error": error.message || error
        });
    }
};

//2.1 Obtener un usuario por ID (GET)
export const getUserById = async (request, response) => {
    try {
        const idForSearch = request.params.id;
        const userById = await usuarioModel.findById(idForSearch).populate({ path: "name_departamento", select: "name" }).select('-contrasena');
        return response.status(200).json({
            "mensaje": "Petición Exitosa",
            "data": userById
        });
    } catch (error) {
        return response.status(400).json({
            "mensaje": "ocurrio un error al mostrar el usuario",
            "error": error.message || error
        });
    }
};
//2.2 Obtener un usuario por ID departamento (GET)

export const getUsersByDepartamento = async (req, res) => {
    try {
        const { name } = req.params;

        if (!name) {
            return res.status(400).json({ mensaje: "Debe enviar el nombre del departamento" });
        }

        // Buscar departamento primero
        const departamento = await departamentoModel.findOne({ name });
        if (!departamento) {
            return res.status(404).json({ mensaje: "Departamento no encontrado" });
        }

        const usuarios = await usuarioModel.find()
            .populate({
                path: 'name_departamento',  // campo que referencia a Nombree del Departamento
                match: { name: name },    // filtro por nombre
                select: 'name',             // solo traer nombre del departamento
            })
            .select('-contrasena');// excluye la contraseña

        return res.status(200).json({
            mensaje: "Usuarios obtenidos correctamente",
            data: usuarios
        });

    } catch (error) {
        return res.status(400).json({
            mensaje: "Ocurrió un error al obtener los usuarios del departamento",
            error: error.message || error
        });
    }
};

// 3. Actualizar un usuario por ID (PUT)
export const putUserById = async (request, response) => {
    try {
        const idForUpdate = request.params.id;

        // Buscar usuario existente
        const usuario = await usuarioModel.findById(idForUpdate);
        if (!usuario) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        // Eliminar codigo_usuario del body para que no se pueda modificar
        if (request.body.codigo_usuario) delete request.body.codigo_usuario;

        // Construir objeto actualizado conservando los campos previos
        const usuarioActualizado = {
            ...usuario.toObject(),
            ...Object.fromEntries(
                Object.entries(request.body).filter(([_, v]) => v !== '' && v != null)
            ),
        };

        // Si viene name_departamento en el body
        if (request.body.name_departamento) {
            const departamento = await departamentoModel.findOne({ name: request.body.name_departamento });
            if (!departamento) {
                return response.status(404).json({ mensaje: "Departamento no encontrado" });
            }
            usuarioActualizado.name_departamento = departamento._id; // asignar el ObjectId
        }
        
        // Convertir numero a Number si viene
        let numero = request.body.numero !== undefined ? Number(request.body.numero) : undefined;
        if (numero !== undefined && isNaN(numero)) {
            return response.status(400).json({ mensaje: "El campo 'numero' debe ser un número válido" });
        }

        // Si hay nueva imagen, actualizarla
        if (request.file) {
            usuarioActualizado.fotoPerfil = `/uploads/${request.file.filename}`;
        }

        // Encriptar contraseña si se envió
        if (request.body.contrasena && request.body.contrasena.trim() !== "") {
            usuarioActualizado.contrasena = await bcryptjs.hash(request.body.contrasena, 10);
        }

        await usuarioModel.findByIdAndUpdate(idForUpdate, usuarioActualizado, {
            new: true,
            runValidators: true,
        });

        return response.status(200).json({
            mensaje: "Usuario actualizado correctamente"
        });

    } catch (error) {
        return response.status(400).json({
            mensaje: "ocurrio un error al actualizar usuario",
            error: error.message || error
        });
    }
};

// 4. Eliminar un usuario por ID (DELETE)
export const deleteUserById = async (request, response) => {
    try {
        const idForDelete = request.params.id;
        await usuarioModel.findByIdAndDelete(idForDelete);
        return response.status(200).json({
            "mensaje": "Usuario eliminado correctamente"
        });
    } catch (error) {
        return response.status(400).json({
            "mensaje": "ocurrio un error al eliminar usuario",
            "error": error.message || error
        });
    }
};