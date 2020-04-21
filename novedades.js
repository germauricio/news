var express = require('express');
var exphbs = require('express-handlebars');
var app = express();
var mongoose= require("mongoose");

mongoose.connect('mongodb://localhost:27017/trabajoPractico2', {useNewUrlParser: true, useUnifiedTopology: true});

var schemaNovedad = new mongoose.Schema(
    {
        autor: String,
        fecha : Number,
        detalle: String,
    }
);

var Novedad = mongoose.model('Novedad', schemaNovedad);

app.engine('hbs',exphbs());
app.set('view engine','hbs');

app.use(express.static('public'));
app.use(express.urlencoded());
app.use(express.json());

app.get('/nuevaNovedad', async function(req,res){
        res.render('nuevaNovedad');
});

app.post('/nuevaNovedad', async function(req, res){
    var novedad = new Novedad();
    novedad.autor = req.body.autor;
    novedad.detalle = req.body.detalle;
    novedad.fecha = Date.now()
    await novedad.save();
    res.redirect('/')
});

app.get('/', async function(req,res){
        var novedades = await Novedad.find().sort({fecha: -1})
        res.render('novedades', {novedades})  
});

app.listen(3000, console.log("Listening on server 3000"))