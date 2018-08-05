'use strict'
// Controlador de product que conecta a mongo y trae los datos
//importando el modelo schema Product para la DB
const Product = require('../models/product');


function getProduct(req, res) {
  let productId = req.params.productId;                                         // tremos el id del req.params, // api/producto/:productId -> toma ese ultimo valor de la url como id y lo guarda en productId

  Product.findById(productId, (err, product) => {                               // usamos la funcion de mongoose.findById( parametroAbuscar ( callback1=err, callback2=resultado )
    if(err) return res.status(500).send({                                       // si hay error con el servidor
      message: `Error al realizar la peticion ${err}`
    });
    if(!product) return res.status(404).send({                                  // si el producto no exite
      message: `El producto no existe`
    });
    res.status(200).send({ product: product })
  });
}

function getProducts (req, res) {
                                                                                // Usamos la funcion Find para traer todos instancias creadas del modelo product de la DB
                                                                                // find({llaves vacia indica que traiga todo} , (callback error, callback resultado) )
  Product.find({}, (err, products) => {
    if(err) return res.status(500).send({                                       // si hay error con el servidor
      message: `Error al realizar la peticion ${err}`
    });
    if(!products) return res.status(404).send({
      message: `El producto no existe` });

    res.send(200, { products : products});                                      //callback2 resultado
  });
}

// FUNCION PARA EL POST
function saveProduct(req, res){
  console.log('POST api/product');
  console.log(req.body);                                                        // imprimimos el request para chequear

  let product = new Product();                                                  // creamos un nuevo producto con el modelo Product
  product.name = req.body.name;
  product.picture = req.body.name;
  product.price = req.body.price;
  product.category = req.body.category;
  product.description = req.body.description;

  product.save((err, productStored) => {                                        // salvamos las modificaciones cargadas, esto recibe un callback (error, productoguardado)
      if(err) res.status(500).send({
        message: `Error al salvar en la base de datos ${err}`
      });
      res.status(200).send({ product: productStored });                         // productStored nombre generico que contiene la data de respuesta
  });
}

function updateProduct (req, res) {

  let productId = req.params.productId;                                         // buscamos ID
  let update = req.body;                                                        // traemos los campos a modificar

  // ejecutamos funcion de mongoose para actualiza
  Product.findByIdAndUpdate(productId, update, (err, productUpdate) => {        // funcionFindByIdAndUpdate( Id, camposAmodificar, (callback error, callback exitoso) )
  if(err) return res.status(500).send({
    message: `Error al realizar la peticion ${err}`
  });
  // respuesta exitosa, mandamos las modificaciones
  res.status(200).send({ product: productUpdate });
  });
}

function deleteProduct (req, res) {
  let productId = req.params.productId;

  Product.findById(productId, (err, product) => {
    if(err) return res.status(500).send({
      message: `Error al realizar la peticion ${err}`
    });

    product.remove(err => {                                                       // funcion del objeto product recibido, funcion de mongoose para borrar
      if(err) return res.status(500).send({
        message: `Error al borrar el producto ${err}`
      });

      res.status(200).send({ message: 'Se borro el producto' });
    })
  });
}

// Exportamos los modulos para usar en la app
module.exports = {
  getProduct,
  getProducts,
  saveProduct,
  updateProduct,
  deleteProduct
}
