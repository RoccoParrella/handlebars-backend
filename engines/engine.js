module.exports = function (app, motor) {
    app.set('views', `./views/${motor}`);
    app.set('view engine', `${motor}`);
}