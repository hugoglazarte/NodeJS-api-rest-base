'use strict'
// ACA VAMOS A CARGAR LA CONFI DE EXPRESS
const express = require('express');                       // express: crea el servidor
const bodyParser = require('body-parser');                // body-parser: midlewere que parsea los datos de las peticiones
const app = express();                                    // Creamos el modulo app
const api = require('./routes');                          // Cargamos el router con la api para incorporarlo al modulo app
const hbs = require('express-handlebars');                // manejo de vistas a traves de plantillas

app.use(bodyParser.urlencoded({ extended: false }));      // indicamos a la app que use bodyParser
app.use(bodyParser.json());                               // usamos el body parser para parsear el contenido de req, res
app.engine('.hbs', hbs({                                  // configurando las vistas
  defaultLayout: 'default',
  extname: '.hbs'
}))
app.set('view engine', '.hbs')


app.use('/api', api);                                     // le cargamos el router que le indica que para esa ruta './api' usa ese router
app.get('/login', (req, res) => {
  res.render('login')
})

app.get('/', (req, res) => {
  res.render('product')
})

module.exports = app;
