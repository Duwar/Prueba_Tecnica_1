// 1. importamos
import mongoose from "mongoose";
import { Counter } from "./counter.model.js";

//2. construir la plantilla del modelo

const userSchema = new mongoose.Schema({

    codigo_usuario: {
        type: Number,
        unique: true 
    },
    username: {
        type: String,
        required: true
    },
    fotoPerfil: {
        type: String,
        default: "http://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    nombre: {
        type: String,
        required: true
    },
    apellido1: {
        type: String,
        required: true
    },
    apellido2: {
        type: String
    },
    Edad: {
        type: Number,
        required: true
    },
    name_departamento: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Departamentos",
        required: true
    },
    contrasena: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        required: true
    }

});

// Middleware para generar codigo_usuario automáticamente
userSchema.pre("save", async function (next) {
    if (this.isNew) {
        const counter = await Counter.findOneAndUpdate(
            { name: "usuario" },
            { $inc: { seq: 1 } },
            { new: true, upsert: true } // crea el contador si no existe
        );
        this.codigo_usuario = counter.seq;
    }
    next();
});

export const usuarioModel = mongoose.model("Usuarios", userSchema);