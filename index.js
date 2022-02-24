const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}!`));
const { engine } = require('express-handlebars');
const viewEngine = require('./engines/engine');
const path = require('path');
const router = require('./routes/home');
const { Server } = require('socket.io')
const io = new Server(server);
const moment = require('moment');
const Contenedor = require('./models/clase');
const newProduct = new Contenedor('./database/mensajes.txt');


app.use(express.json());
app.use("/static", express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", engine({
    layoutDir: path.join(__dirname, 'views/layout'),
}))
viewEngine(app);

const array = [];
const arrayPelis = [];

app.use('/', router)

io.on('connection', (socket) => {
    socket.on("mensajes", (data) => {
        data.hora = moment().format('D/MM/YY hh:mm');
        array.push(data);
        newProduct.saveMsg(array);
        let arrayGuardado = newProduct.getAll();
        socket.emit("mensajesCompleto", arrayGuardado);
        socket.broadcast.emit("mensajesCompleto", arrayGuardado);
    })
    if (array.length !== 0) {
        socket.emit("mensajesCompleto", array);
    }

    socket.on("send-pelis", (data) => {
        arrayPelis.push(data);
        socket.emit("send-pelis-completo", arrayPelis);
        socket.broadcast.emit("send-pelis-completo", arrayPelis);
    })
    if (arrayPelis.length !== 0) {
        socket.emit("send-pelis-completo", arrayPelis);
    }
})

server.on('error', (err) => {
    console.log(`Error: ${err} en el servidor`);
});


