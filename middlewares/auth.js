'use strict'
const service = require('../services')

// creamos la funcion agregando un parametro Next que se
//    inicia cuando se procesa y se procede adelante
function isAuth(req, res, next) {
  // si no existe la cabezara
  if(!req.headers.authorization) {
    return res.status(403).send({ message: 'no tienes autorizacion'});
  }
  // si existe
  const token = req.headers.authorization.split(" ")[1] //separamos el array que optenemos y nos quedamos con el token o elemento [1]

  service.decodeToken(token)
    .then(response => {
      req.user = response
      next()
    })
    .catch(response => {
      res.status(response.status)
    })
}

module.exports = isAuth
