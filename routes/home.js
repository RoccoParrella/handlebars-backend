const multer = require('multer')
const path = require("path");
const { Router } = require("express");
const Contenedor = require('../models/clase');
const newProduct = new Contenedor('./database/productos.txt');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../public/images/productos"));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({ storage: storage })
const router = new Router();

router.get('/', (req, res) => {
    const peliculas = newProduct.getAll("peliculas");
    const series = newProduct.getAll("series");
    res.status(200).render('main', { layout: 'index', peliculas: peliculas, series: series});
})

router.get(`/buscar`, (req, res) => {
    const pelicula = req.query.categoria;
    const peliculas = newProduct.getAll(pelicula);
    res.status(200).render('category', {layout: 'index', peliculas:peliculas, pelicula:pelicula } );
})

router.get('/add', (req, res) => {
    res.status(200).render('form', {layout: 'index'});
})

router.get('/result', (req, res) => {
    const pelicula = req.query.movie;
    res.status(200).render('result', { layout:'index', pelicula:pelicula });
})

router.post('/add', upload.array('img', 2), (req, res) => {
    newProduct.save({ title: req.body.titulo, tipo: req.body.tipo, duration: req.body.duracion, urlImg: req.body.img });
    res.status(201)
})

module.exports = router;