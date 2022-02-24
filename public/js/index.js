const boton = document.getElementById('boton-mail');
const email = document.getElementById('email');
const msg = document.getElementById('mensaje');
const nada = document.getElementById('nada');
const nadaPelis = document.getElementById('nadaPelis');
const mensajeDiv = document.getElementById('divMensajes');
const pelisDiv = document.getElementById('divPelis');
const titulo = document.getElementById('titulo');
const tipo = document.getElementById('tipo');
const duracion = document.getElementById('duracion');
const img = document.getElementById('img');
const showUno = document.getElementById('hidden-uno');
const showDos = document.getElementById('hidden-dos');
const showTres = document.getElementById('hidden-tres');
const enviarPelis = document.getElementById('enviar-pelis');

socket = io();

enviarPelis.addEventListener('click', (e) => {
    e.preventDefault();
    if (titulo.value == '' || tipo.value == '' || duracion.value == '' || img.value == '') {
        return
    }
    buttonSubmit(1);
})

boton.addEventListener('click', (e) => {
    e.preventDefault();
    if (email.value == '' || msg.value == '') {
        return
    }
    buttonSubmit();
})

const buttonSubmit = (a) => {
    if (a == 1) {
        socket.emit('send-pelis', {
            titulo: titulo.value,
            tipo: tipo.value,
            duracion: duracion.value,
            img: img.value
        });
        titulo.value = '';
        duracion.value = '';
        img.value = '';
    } else {
        socket.emit('mensajes', {
            email: email.value,
            msg: msg.value
        })
        email.value = '';
        msg.value = '';
    }
}

socket.on('mensajesCompleto', (data) => {
    mensajeDiv.innerHTML = '';
    renderMsg(data);
})

socket.on('send-pelis-completo', (data) => {
    pelisDiv.innerHTML = '';
    renderPelis(data);
})

const renderPelis = (data) => {
    nadaPelis.classList.add('hide');
    showUno.classList.add('show');
    showDos.classList.add('show');
    showTres.classList.add('show');
    data.forEach(e => {
        const divMsg = document.createElement('div');
        divMsg.classList.add('peliculas-form');
        const p_titulo = `<p class="pelicula-titulo">${e.titulo}</p>`
        const p_duracion = `<p class="pelicula-duracion">${e.duracion}</p>`
        const p_img = `<img class="pelicula-img" src="${e.img}">`
        divMsg.innerHTML = p_titulo + p_duracion + p_img;
        console.log(divMsg);
        pelisDiv.appendChild(divMsg);
    });
}

const renderMsg = (data) => {
    nada.classList.add('hide');
    data.forEach(e => {
        const divMsg = document.createElement('div');
        divMsg.classList.add('mensaje');
        const p_email = `<p class="mensaje-autor">${e.email}</p>`
        const p_fecha = `<p class="mensaje-fecha">${e.hora}</p>`
        const p_msg = `<p class="mensaje-texto">${e.msg}</p>`
        divMsg.innerHTML = p_email + p_fecha + p_msg;
        mensajeDiv.appendChild(divMsg);
    });
}
