'use strict'

// dependencias necesarias
// npm i -D nodemon // Libreria para no recargar node cuando modificamos algo
const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config');

// Conexion a la base de datos, una vez que conecta lanza el servidor de express
mongoose.connect(config.db, (err, res) => {
  if(err){
    return console.log('Error al conectar con la base de datos...');
  }
  console.log(`Conexion a la base de datos establecida...${err}`);
  app.listen(config.port, () => {
    console.log(`API Rest funcionando en el puerto: ${config.port}`);        // Si se conecto a la DB lanzando el servidor
  });
});
