const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

const engine = require('./engines/engine');
const router = require(`./routes/home`);

const motor = "pug";

engine(app, motor);

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use(`/${motor}`, router);

const server = app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}!`);
});

server.on('error', (err) => {
    console.log(`Error: ${err} en el servidor`);
});


