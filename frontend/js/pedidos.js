const URL_PEDIDOS = "http://localhost:5000/api/pedidos";
const URL_CLIENTES = "http://localhost:5000/api/clientes";
const URL_PRODUCTOS = "http://localhost:5000/api/productos";

const selectCliente = document.getElementById("cliente");
const selectProducto = document.getElementById("producto");
const tabla = document.getElementById("tablaPedidos");

// ==========================
// CARGAR CLIENTES
// ==========================
async function cargarClientes() {

    const respuesta = await fetch(URL_CLIENTES);

    const clientes = await respuesta.json();

    selectCliente.innerHTML =
        '<option value="">Seleccione un cliente</option>';

    clientes.forEach(cliente => {

        selectCliente.innerHTML += `
            <option value="${cliente._id}">
                ${cliente.nombre} ${cliente.apellido}
            </option>
        `;

    });

}

// ==========================
// CARGAR PRODUCTOS
// ==========================
async function cargarProductos() {

    const respuesta = await fetch(URL_PRODUCTOS);

    const productos = await respuesta.json();

    selectProducto.innerHTML =
        '<option value="">Seleccione un producto</option>';

    productos.forEach(producto => {

        selectProducto.innerHTML += `
            <option value="${producto._id}">
                ${producto.nombre} - $${producto.precio}
            </option>
        `;

    });

}

// ==========================
// CARGAR PEDIDOS
// ==========================
async function cargarPedidos() {

    const respuesta = await fetch(URL_PEDIDOS);

    const pedidos = await respuesta.json();

    tabla.innerHTML = "";

    pedidos.forEach(pedido => {

        tabla.innerHTML += `

        <tr>

            <td>

                <span class="badge bg-dark">

                    ${pedido.numeroPedido}

                </span>

            </td>

            <td>

                ${pedido.cliente.nombre} ${pedido.cliente.apellido}

            </td>

            <td>

                $${pedido.total}

            </td>

            <td>

                <span class="badge bg-success">

                    ${pedido.estado}

                </span>

            </td>

            <td>

                ${new Date(pedido.fecha).toLocaleDateString()}

            </td>

            <td>

                <button
                    class="btn btn-danger btn-sm"
                    onclick="eliminarPedido('${pedido._id}')">

                    Eliminar

                </button>

            </td>

        </tr>

        `;

    });

}

// ==========================
// CREAR PEDIDO
// ==========================
document
.getElementById("formPedido")
.addEventListener("submit", async (e) => {

    e.preventDefault();

    const pedido = {

        cliente: selectCliente.value,

        productos: [

            {

                producto: selectProducto.value,

                cantidad: Number(

                    document
                    .getElementById("cantidad")
                    .value

                )

            }

        ],

        observaciones:

            document
            .getElementById("observaciones")
            .value

    };

    const respuesta = await fetch(URL_PEDIDOS, {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(pedido)

    });

    if (respuesta.ok) {

        Swal.fire({

            icon: "success",

            title: "Pedido creado",

            timer: 1500,

            showConfirmButton: false

        });

        document
            .getElementById("formPedido")
            .reset();

        cargarPedidos();

    }

});

// ==========================
// ELIMINAR PEDIDO
// ==========================
async function eliminarPedido(id) {

    const resultado = await Swal.fire({

        title: "¿Eliminar pedido?",

        icon: "warning",

        showCancelButton: true,

        confirmButtonText: "Eliminar",

        cancelButtonText: "Cancelar"

    });

    if (!resultado.isConfirmed) return;

    await fetch(`${URL_PEDIDOS}/${id}`, {

        method: "DELETE"

    });

    Swal.fire({

        icon: "success",

        title: "Pedido eliminado",

        timer: 1200,

        showConfirmButton: false

    });

    cargarPedidos();

}

cargarClientes();
cargarProductos();
cargarPedidos();