const URL = "http://localhost:5000/api/productos";

const tabla = document.getElementById("tablaProductos");
const formulario = document.getElementById("formProducto");
const buscador = document.getElementById("buscarProducto");

let productoEditando = null;

// ==============================
// CARGAR PRODUCTOS
// ==============================
async function cargarProductos() {

    try {

        const respuesta = await fetch(URL);

        const productos = await respuesta.json();

        tabla.innerHTML = "";
       /* 
        productos.forEach(producto => { */
        const texto = buscador.value.toLowerCase();

      const filtrados = productos.filter(producto =>

    producto.nombre.toLowerCase().includes(texto) ||

    producto.categoria.toLowerCase().includes(texto)

);

filtrados.forEach(producto => {
            tabla.innerHTML += `
                <tr>

                    <td>${producto.nombre}</td>

                    <td>${producto.descripcion}</td>

                    <td>$${producto.precio}</td>

                    <td>${producto.categoria}</td>

                    <td>${producto.stock}</td>

                    <td>

                        <button
                            class="btn btn-warning btn-sm"
                            onclick="editarProducto('${producto._id}')">

                            Editar

                        </button>

                        <button
                            class="btn btn-danger btn-sm"
                            onclick="eliminarProducto('${producto._id}')">

                            Eliminar

                        </button>

                    </td>

                </tr>
            `;

        });

    } catch (error) {

        console.error(error);

        Swal.fire({

            icon: "error",

            title: "Error",

            text: "No se pudieron cargar los productos."

        });

    }

}

// ==============================
// CREAR / EDITAR PRODUCTO
// ==============================
formulario.addEventListener("submit", async (e) => {

    e.preventDefault();

    const producto = {

        nombre: document.getElementById("nombre").value,

        descripcion: document.getElementById("descripcion").value,

        precio: Number(document.getElementById("precio").value),

        categoria: document.getElementById("categoria").value,

        stock: Number(document.getElementById("stock").value)

    };

    try {

        let mensaje = "";

        if (productoEditando === null) {

            const respuesta = await fetch(URL, {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify(producto)

            });

            if (!respuesta.ok) {

                throw new Error("No se pudo crear el producto.");

            }

            mensaje = "Producto creado correctamente";

        } else {

            const respuesta = await fetch(`${URL}/${productoEditando}`, {

                method: "PUT",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify(producto)

            });

            if (!respuesta.ok) {

                throw new Error("No se pudo actualizar el producto.");

            }

            mensaje = "Producto actualizado correctamente";

            productoEditando = null;

        }

        formulario.reset();

        cargarProductos();

        Swal.fire({

            icon: "success",

            title: mensaje,

            showConfirmButton: false,

            timer: 1500

        });

    } catch (error) {

        Swal.fire({

            icon: "error",

            title: "Error",

            text: error.message

        });

    }

});

// ==============================
// EDITAR PRODUCTO
// ==============================
async function editarProducto(id) {

    try {

        const respuesta = await fetch(`${URL}/${id}`);

        if (!respuesta.ok) {

            throw new Error("No se pudo obtener el producto.");

        }

        const producto = await respuesta.json();

        document.getElementById("nombre").value = producto.nombre;
        document.getElementById("descripcion").value = producto.descripcion;
        document.getElementById("precio").value = producto.precio;
        document.getElementById("categoria").value = producto.categoria;
        document.getElementById("stock").value = producto.stock;

        productoEditando = id;

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    } catch (error) {

        Swal.fire({

            icon: "error",

            title: "Error",

            text: error.message

        });

    }

}

// ==============================
// ELIMINAR PRODUCTO
// ==============================
async function eliminarProducto(id) {

    const resultado = await Swal.fire({

        title: "¿Eliminar producto?",

        text: "Esta acción no se puede deshacer.",

        icon: "warning",

        showCancelButton: true,

        confirmButtonColor: "#d33",

        cancelButtonColor: "#3085d6",

        confirmButtonText: "Sí, eliminar",

        cancelButtonText: "Cancelar"

    });

    if (!resultado.isConfirmed) return;

    try {

        const respuesta = await fetch(`${URL}/${id}`, {

            method: "DELETE"

        });

        if (!respuesta.ok) {

            throw new Error("No se pudo eliminar el producto.");

        }

        await Swal.fire({

            icon: "success",

            title: "Producto eliminado",

            showConfirmButton: false,

            timer: 1500

        });

        cargarProductos();

    } catch (error) {

        Swal.fire({

            icon: "error",

            title: "Error",

            text: error.message

        });

    }

}

// ==============================
// INICIAR
// ==============================
buscador.addEventListener("keyup", () => {

    cargarProductos();

});

cargarProductos();