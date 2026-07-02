const URL_PRODUCTOS = "http://localhost:5000/api/productos";
const URL_CLIENTES = "http://localhost:5000/api/clientes";
const URL_PEDIDOS = "http://localhost:5000/api/pedidos";

async function cargarDashboard() {

    try {

        const productos = await fetch(URL_PRODUCTOS).then(r => r.json());

        const clientes = await fetch(URL_CLIENTES).then(r => r.json());

        const pedidos = await fetch(URL_PEDIDOS).then(r => r.json());

        document.getElementById("cantProductos").textContent = productos.length;
        document.getElementById("cantClientes").textContent = clientes.length;
        document.getElementById("cantPedidos").textContent = pedidos.length;

        let totalVentas = 0;

        pedidos.forEach(pedido => {

            totalVentas += pedido.total || 0;

        });

        document.getElementById("ventas").textContent = "$" + totalVentas;

    } catch (error) {

        console.error("Error cargando dashboard:", error);

    }

}

cargarDashboard();