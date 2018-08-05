'use strict'
const express = require('express');                         // Cargamos Express
const productCtrl = require('../controllers/product');      // CARGANDO LOS CONTROLADORES DE PRODUCT
const api = express.Router();                               // creamos un router para la url API

// RUTAS DE LA API : Url /api/

api.get('/product', productCtrl.getProducts);                 // GET
api.get('/product/:productId', productCtrl.getProduct);       // GET ID
api.post('/product', productCtrl.saveProduct);                // POST
api.put('/product/:productId', productCtrl.updateProduct);    // PUT
api.delete('/product/:productId', productCtrl.deleteProduct); // DELETE

module.exports = api;
