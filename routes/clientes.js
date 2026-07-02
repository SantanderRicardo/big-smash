const express = require("express");
const router = express.Router();

const {
    crearCliente,
    obtenerClientes,
    obtenerCliente,
    actualizarCliente,
    eliminarCliente
} = require("../controllers/clienteController");

// =========================
// CLIENTES
// =========================

// Crear cliente
router.post("/", crearCliente);

// Obtener todos los clientes
router.get("/", obtenerClientes);

// Obtener cliente por ID
router.get("/:id", obtenerCliente);

// Actualizar cliente
router.put("/:id", actualizarCliente);

// Eliminar cliente
router.delete("/:id", eliminarCliente);

module.exports = router;