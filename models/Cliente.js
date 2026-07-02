const mongoose = require("mongoose");

const ClienteSchema = new mongoose.Schema({

    nombre: {
        type: String,
        required: [true, "El nombre es obligatorio"],
        trim: true
    },

    apellido: {
        type: String,
        required: [true, "El apellido es obligatorio"],
        trim: true
    },

    telefono: {
        type: String,
        required: [true, "El teléfono es obligatorio"],
        trim: true
    },

    email: {
        type: String,
        required: [true, "El email es obligatorio"],
        unique: true,
        lowercase: true,
        trim: true
    },

    direccion: {
        type: String,
        required: [true, "La dirección es obligatoria"],
        trim: true
    },

    fechaRegistro: {
        type: Date,
        default: Date.now
    }

}, {
    versionKey: false
});

module.exports = mongoose.model("Cliente", ClienteSchema);