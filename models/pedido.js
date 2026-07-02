const mongoose = require("mongoose");

const PedidoSchema = new mongoose.Schema({

    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cliente",
        required: true
    },

    productos: [

        {

            producto: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Producto",
                required: true
            },

            cantidad: {
                type: Number,
                required: true,
                min: 1
            }

        }

    ],

    total: {
        type: Number,
        default: 0
    },

    estado: {
        type: String,
        enum: [
            "Pendiente",
            "En preparación",
            "Entregado",
            "Cancelado"
        ],
        default: "Pendiente"
    },

    observaciones: {
        type: String,
        default: ""
    },

    fecha: {
        type: Date,
        default: Date.now
    }

}, {
    versionKey: false
});

module.exports = mongoose.model("Pedido", PedidoSchema);