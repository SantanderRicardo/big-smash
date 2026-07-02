const express = require("express");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

const productosRoutes = require("./routes/productos");
const clientesRoutes = require("./routes/clientes");
const pedidosRoutes = require("./routes/pedidos");

const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");

// Variables de entorno
dotenv.config();

// Conectar MongoDB
connectDB();

// Express
const app = express();

// Middleware
app.use(express.json());

// Servir el frontend
app.use(express.static("frontend"));

// Ruta principal
app.get("/", (req, res) => {

    res.sendFile(__dirname + "/frontend/index.html");

});

// API

app.use("/api/productos", productosRoutes);

app.use("/api/clientes", clientesRoutes);

app.use("/api/pedidos", pedidosRoutes);

// Middleware errores

app.use(notFound);

app.use(errorHandler);

// Puerto

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`🚀 Servidor ejecutándose en el puerto ${PORT}`);

});