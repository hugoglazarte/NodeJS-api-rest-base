// CREANDO EL SCHEMA PARA MONGO

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// CREAMOS EL MODELO DE PRODUCTO PARA LA DB
const ProductSchema = Schema({
  name: String,
  picture: String,
  price: { type: Number , default:0 }, // por defecto carga 0
  category: { type: String , enum:['computers','phones','accesories']}, // de esta forma le indicamos que solo se pueden usar esas cat
  description: String
});

// Guardamos el nuevo shema modelo para usar en mongoose
// De esta forma exportamos el modelo product para toda la app
module.exports = mongoose.model('Product', ProductSchema);
