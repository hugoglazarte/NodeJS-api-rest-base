'use strict'
const express = require('express');                         // Cargamos Express
const productCtrl = require('../controllers/product');      // CARGANDO LOS CONTROLADORES DE PRODUCT
const api = express.Router();                               // creamos un router para la url API
const userCtrl = require('../controllers/user');

const auth = require('../middlewares/auth');
// RUTAS DE LA API : Url /api/

api.get('/product',auth, productCtrl.getProducts);                 // GET
api.get('/product/:productId', productCtrl.getProduct);       // GET ID
api.post('/product', productCtrl.saveProduct);                // POST
api.put('/product/:productId', productCtrl.updateProduct);    // PUT
api.delete('/product/:productId', productCtrl.deleteProduct); // DELETE

// rutas para manejo de usuario
api.post('/signup', userCtrl.signUp);
api.post('/signin', userCtrl.signIn);

// Ruta privada con middlewares auth
api.get('/private', auth, (req, res) => {
  res.status(200).send({ message: 'tienes acceso'});
})

module.exports = api;
