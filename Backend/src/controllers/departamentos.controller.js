//1. import dependencias y modulos necesarios
import { departamentoModel } from "../models/departamento.model.js"; // ajusta la ruta si es necesario

//Definir las aciones que van a realizar - CRUD

//1. Metodo para Crear un producto -> POST
export const createDepartamento = async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).json({
                "mensaje": "Debes subir un archivo de imagen"
            });
        };

        const nuevoDepartamento = {
            ...req.body,
            bandera: `/uploads/${req.file.filename}`
        };

        await departamentoModel.create(nuevoDepartamento);
        return res.status(201).json({
            "mensaje": "Departamento creado correctamente"
        });
    } catch (error) {
        return res.status(400).json({
            "mensaje": "ocurrio un error al crear el departamento",
            "error": error.message || error
        });
    }
};

//2. Metodo para consultar todos los departamentos -> GET

export const getAllDepartamentos = async (req, res) => {
    try {
        const departamentos = await departamentoModel.find();
        return res.status(200).json({
            "mensaje": "Petición Exitosa",
            "data": departamentos
        });
    } catch (error) {
        return res.status(400).json({
            "mensaje": "ocurrio un error al mostrar los departamentos",
            "error": error.message || error
        });
    }
};

// GET departamento por nombre exacto
export const getDepartamentoByName = async (req, res) => {
    try {
        const { nombre } = req.params; // nombre desde la URL
        const departamento = await departamentoModel.findOne({ nombre: nombre });
        if (!departamento) return res.status(404).json({ mensaje: "Departamento no encontrado" });
        
        return res.status(200).json({
            mensaje: "Petición Exitosa",
            data: departamento
        });
    } catch (error) {
        return res.status(400).json({
            mensaje: "Ocurrió un error al buscar el departamento por nombre",
            error: error.message || error
        });
    }
};

//3. Metodo de actualizar departamento -> PUT

export const putDepartamentoById = async (req, res) => {
    try {
        const { id } = req.params;

        const departamento = await departamentoModel.findById(id);
        if (!departamento) {
            return res.status(404).json({ mensaje: "Departamento no encontrado" });
        }

        const departamentoActualizado = {
            ...departamento.toObject(),
            ...Object.fromEntries(
                Object.entries(req.body).filter(([_, v]) => v !== '')
            )
        };

        if (req.file) {
            departamentoActualizado.bandera = `/uploads/${req.file.filename}`;
        }

        await departamentoModel.findByIdAndUpdate(id, departamentoActualizado, {
            new: true,
            runValidators: true,
        });

        return res.status(200).json({
            mensaje: "Departamento actualizado correctamente"
        });
    } catch (error) {
        return res.status(400).json({
            mensaje: "ocurrio un error al actualizar departamento",
            error: error.message || error
        });
    }
};

//4. Metodo de Eliminar departamento -> DELET

export const deletDepartamentoById = async (req, res) => {
    try {
        const { id } = req.params;
        const departamentoEliminado = await departamentoModel.findByIdAndDelete(id);
        if (!departamentoEliminado) return res.status(404).json({ message: "Departamento no encontrado" });
        return res.status(200).json({
            "mensaje": "Departamento eliminado correctamente"
        });
    } catch (error) {
        return res.status(400).json({
            "mensaje": "ocurrio un error al eliminar departamento",
            "error": error.message || error
        });
    }
};