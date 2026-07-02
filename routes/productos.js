const express = require("express");
const router = express.Router();

const {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    eliminarProducto
} = require("../controllers/productoController");

// =========================
// PRODUCTOS
// =========================

// Crear producto
router.post("/", crearProducto);

// Obtener todos los productos
router.get("/", obtenerProductos);

// Obtener un producto por ID
router.get("/:id", obtenerProducto);

// Actualizar producto
router.put("/:id", actualizarProducto);

// Eliminar producto
router.delete("/:id", eliminarProducto);

module.exports = router;