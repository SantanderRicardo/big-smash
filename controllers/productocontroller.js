const Producto = require("../models/Producto");

// =========================
// CREAR PRODUCTO
// =========================
const crearProducto = async (req, res) => {

    try {

        const nuevoProducto = await Producto.create(req.body);

        res.status(201).json(nuevoProducto);

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};

// =========================
// OBTENER PRODUCTOS
// =========================
const obtenerProductos = async (req, res) => {

    try {

        const productos = await Producto.find().sort({
            nombre: 1
        });

        res.json(productos);

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};

// =========================
// OBTENER PRODUCTO POR ID
// =========================
const obtenerProducto = async (req, res) => {

    try {

        const producto = await Producto.findById(req.params.id);

        if (!producto) {

            return res.status(404).json({
                mensaje: "Producto no encontrado"
            });

        }

        res.json(producto);

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};

// =========================
// ACTUALIZAR PRODUCTO
// =========================
const actualizarProducto = async (req, res) => {

    try {

        const producto = await Producto.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!producto) {

            return res.status(404).json({
                mensaje: "Producto no encontrado"
            });

        }

        res.json(producto);

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};

// =========================
// ELIMINAR PRODUCTO
// =========================
const eliminarProducto = async (req, res) => {

    try {

        const producto = await Producto.findByIdAndDelete(req.params.id);

        if (!producto) {

            return res.status(404).json({
                mensaje: "Producto no encontrado"
            });

        }

        res.json({
            mensaje: "Producto eliminado correctamente"
        });

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};

module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    eliminarProducto
};