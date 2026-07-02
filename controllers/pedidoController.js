const Pedido = require("../models/Pedido");
const Producto = require("../models/Producto");

// =========================
// CREAR PEDIDO
// =========================
const crearPedido = async (req, res) => {

    try {

        let total = 0;

        // Generar número de pedido
        const cantidadPedidos = await Pedido.countDocuments();

        const numeroPedido =
            "PED-" + String(cantidadPedidos + 1).padStart(4, "0");

        // Calcular total y descontar stock
        for (const item of req.body.productos) {

            const producto = await Producto.findById(item.producto);

            if (!producto) {

                return res.status(404).json({
                    mensaje: "Producto no encontrado"
                });

            }

            if (producto.stock < item.cantidad) {

                return res.status(400).json({
                    mensaje: `Stock insuficiente para ${producto.nombre}`
                });

            }

            total += producto.precio * item.cantidad;

            producto.stock -= item.cantidad;

            await producto.save();

        }

        const pedido = await Pedido.create({

            numeroPedido: numeroPedido,

            cliente: req.body.cliente,

            productos: req.body.productos,

            total: total,

            observaciones: req.body.observaciones

        });

        res.status(201).json(pedido);

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};

// =========================
// OBTENER PEDIDOS
// =========================
const obtenerPedidos = async (req, res) => {

    try {

        const pedidos = await Pedido.find()

            .populate("cliente")

            .populate("productos.producto")

            .sort({
                fecha: -1
            });

        res.json(pedidos);

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};

// =========================
// ACTUALIZAR PEDIDO
// =========================
const actualizarPedido = async (req, res) => {

    try {

        const pedido = await Pedido.findByIdAndUpdate(

            req.params.id,

            req.body,

            {

                new: true,

                runValidators: true

            }

        );

        if (!pedido) {

            return res.status(404).json({
                mensaje: "Pedido no encontrado"
            });

        }

        res.json(pedido);

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};

// =========================
// ELIMINAR PEDIDO
// =========================
const eliminarPedido = async (req, res) => {

    try {

        const pedido = await Pedido.findByIdAndDelete(req.params.id);

        if (!pedido) {

            return res.status(404).json({
                mensaje: "Pedido no encontrado"
            });

        }

        res.json({
            mensaje: "Pedido eliminado correctamente"
        });

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};

// =========================
// EXPORTAR
// =========================
module.exports = {

    crearPedido,

    obtenerPedidos,

    actualizarPedido,

    eliminarPedido

};