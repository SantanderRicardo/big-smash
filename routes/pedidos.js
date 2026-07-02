const express = require("express");
const router = express.Router();

const {
    crearPedido,
    obtenerPedidos,
    actualizarPedido,
    eliminarPedido
} = require("../controllers/pedidoController");

// =========================
// PEDIDOS
// =========================

// Crear pedido
router.post("/", crearPedido);

// Obtener todos los pedidos
router.get("/", obtenerPedidos);

// Actualizar pedido
router.put("/:id", actualizarPedido);

// Eliminar pedido
router.delete("/:id", eliminarPedido);

module.exports = router;