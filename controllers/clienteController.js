const Cliente = require("../models/Cliente");

// =========================
// CREAR CLIENTE
// =========================
const crearCliente = async (req, res) => {

    try {

        const nuevoCliente = await Cliente.create(req.body);

        res.status(201).json(nuevoCliente);

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};

// =========================
// OBTENER CLIENTES
// =========================
const obtenerClientes = async (req, res) => {

    try {

        const clientes = await Cliente.find().sort({
            apellido: 1
        });

        res.json(clientes);

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};

// =========================
// OBTENER CLIENTE POR ID
// =========================
const obtenerCliente = async (req, res) => {

    try {

        const cliente = await Cliente.findById(req.params.id);

        if (!cliente) {

            return res.status(404).json({
                mensaje: "Cliente no encontrado"
            });

        }

        res.json(cliente);

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};

// =========================
// ACTUALIZAR CLIENTE
// =========================
const actualizarCliente = async (req, res) => {

    try {

        const cliente = await Cliente.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!cliente) {

            return res.status(404).json({
                mensaje: "Cliente no encontrado"
            });

        }

        res.json(cliente);

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};

// =========================
// ELIMINAR CLIENTE
// =========================
const eliminarCliente = async (req, res) => {

    try {

        const cliente = await Cliente.findByIdAndDelete(req.params.id);

        if (!cliente) {

            return res.status(404).json({
                mensaje: "Cliente no encontrado"
            });

        }

        res.json({
            mensaje: "Cliente eliminado correctamente"
        });

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};

module.exports = {
    crearCliente,
    obtenerClientes,
    obtenerCliente,
    actualizarCliente,
    eliminarCliente
};