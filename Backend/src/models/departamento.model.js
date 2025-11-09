// 1. importamos
import mongoose from "mongoose";


//2. construir la plantilla del modelo

const departamentoSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    fecha_fundacion: {
        type: Date,
        required: true
    },
    alcalde: {
        type: String,
        required: true
    },
    poblacion: {
        type: Number
    },
    bandera:{
        type: String,
        default: "https://previews.123rf.com/images/gebbimur/gebbimur2203/gebbimur220300084/184065767-flag-of-latvia-sketch-vector-illustration-coloring-book-the-fabric-is-decorated-with-three.jpg",
    }

});

export const departamentoModel = mongoose.model("Departamentos", departamentoSchema);