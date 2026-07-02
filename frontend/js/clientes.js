const URL = "http://localhost:5000/api/clientes";

const tabla = document.getElementById("tablaClientes");
const formulario = document.getElementById("formCliente");

// =======================
// CARGAR CLIENTES
// =======================

async function cargarClientes() {

    try {

        const respuesta = await fetch(URL);

        const clientes = await respuesta.json();

        tabla.innerHTML = "";

        clientes.forEach(cliente => {

            tabla.innerHTML += `

            <tr>

                <td>${cliente.nombre}</td>

                <td>${cliente.apellido}</td>

                <td>${cliente.telefono}</td>

                <td>${cliente.email}</td>

                <td>${cliente.direccion}</td>

                <td>

                    <button
                        class="btn btn-danger btn-sm"
                        onclick="eliminarCliente('${cliente._id}')">

                        Eliminar

                    </button>

                </td>

            </tr>

            `;

        });

    } catch (error) {

        console.log(error);

    }

}

// =======================
// CREAR CLIENTE
// =======================

formulario.addEventListener("submit", async (e) => {

    e.preventDefault();

    const cliente = {

        nombre: document.getElementById("nombre").value,

        apellido: document.getElementById("apellido").value,

        telefono: document.getElementById("telefono").value,

        email: document.getElementById("email").value,

        direccion: document.getElementById("direccion").value

    };

    try {

        const respuesta = await fetch(URL, {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(cliente)

        });

        if (!respuesta.ok) {

            throw new Error("No se pudo guardar el cliente");

        }

        formulario.reset();

        cargarClientes();

        alert("✅ Cliente agregado correctamente");

    } catch (error) {

        alert(error.message);

    }

});

// =======================
// ELIMINAR CLIENTE
// =======================

async function eliminarCliente(id) {

    const confirmar = confirm("¿Eliminar este cliente?");

    if (!confirmar) return;

    try {

        const respuesta = await fetch(`${URL}/${id}`, {

            method: "DELETE"

        });

        if (!respuesta.ok) {

            throw new Error("No se pudo eliminar");

        }

        cargarClientes();

    } catch (error) {

        alert(error.message);

    }

}

cargarClientes();