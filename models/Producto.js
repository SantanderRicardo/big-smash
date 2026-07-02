const mongoose = require("mongoose");

const ProductoSchema = new mongoose.Schema({

    nombre: {
        type: String,
        required: [true, "El nombre es obligatorio"],
        trim: true
    },

    descripcion: {
        type: String,
        required: [true, "La descripción es obligatoria"],
        trim: true
    },

    precio: {
        type: Number,
        required: [true, "El precio es obligatorio"],
        min: [0, "El precio no puede ser negativo"]
    },

    categoria: {
        type: String,
        required: [true, "La categoría es obligatoria"],
        trim: true
    },

    stock: {
        type: Number,
        default: 0,
        min: [0, "El stock no puede ser negativo"]
    },

    fechaCreacion: {
        type: Date,
        default: Date.now
    }

}, {
    versionKey: false
});

module.exports = mongoose.model("Producto", ProductoSchema);