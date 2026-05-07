let contactos = [];

const formulario = document.getElementById("formularioContacto");
const listaContactos = document.getElementById("listaContactos");
const mensaje = document.getElementById("mensaje");

formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();

    let nombre = document.getElementById("nombre").value.trim();
    let telefono = document.getElementById("telefono").value.trim();
    let correo = document.getElementById("correo").value.trim();

    if (nombre === "" || telefono === "" || correo === "") {
        mostrarMensaje("Todos los campos son obligatorios.", "error");
        return;
    }

    let nuevoContacto = {
        nombre: nombre,
        telefono: telefono,
        correo: correo
    };

    contactos.push(nuevoContacto);

    mostrarContactos();
    mostrarMensaje("Contacto registrado correctamente.", "exito");

    formulario.reset();
});

function mostrarContactos() {
    listaContactos.innerHTML = "";

    contactos.forEach(function(contacto, index) {
        let tarjeta = document.createElement("div");
        tarjeta.className = "contacto";

        tarjeta.innerHTML = `
            <h3>${contacto.nombre}</h3>
            <p><strong>Teléfono:</strong> ${contacto.telefono}</p>

            <div class="botones">
                <button class="ver" onclick="verInformacion(${index})">Ver información</button>
                <button class="eliminar" onclick="eliminarContacto(${index})">Eliminar</button>
            </div>

            <div class="info-extra" id="info-${index}">
                <p><strong>Nombre:</strong> ${contacto.nombre}</p>
                <p><strong>Número de teléfono:</strong> ${contacto.telefono}</p>
                <p><strong>Correo electrónico:</strong> ${contacto.correo}</p>
            </div>
        `;

        listaContactos.appendChild(tarjeta);
    });
}

function eliminarContacto(index) {
    contactos.splice(index, 1);
    mostrarContactos();
    mostrarMensaje("Contacto eliminado correctamente.", "error");
}

function verInformacion(index) {
    let info = document.getElementById("info-" + index);

    if (info.style.display === "block") {
        info.style.display = "none";
    } else {
        info.style.display = "block";
    }
}

function mostrarMensaje(texto, tipo) {
    mensaje.textContent = texto;
    mensaje.className = tipo;

    setTimeout(function() {
        mensaje.textContent = "";
        mensaje.className = "";
    }, 2500);
}