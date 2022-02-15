const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const { engine } = require('express-handlebars');
const viewEngine = require('./engines/engine');
const path = require('path');
const router = require('./routes/home');

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", engine({
    layoutDir: path.join(__dirname, 'views/layout'),
}))
viewEngine(app);

app.use('/', router)

const server = app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}!`);
});

server.on('error', (err) => {
    console.log(`Error: ${err} en el servidor`);
});


