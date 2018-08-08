'use strict'

// creamos el service con jwt
const jwt = require('jwt-simple');
const moment = require('moment');
// importamos el secret del archivo config para el token
const config = require('../config');

function createToken (user) {
  //creamos la info que viaja
  const payload = {
    sub: user._id,                                     // id del user en nuestra db
    iat: moment().unix(),                             // fecha que se crea el token : codigo unix con moment
    exp: moment().add(14, 'days').unix(),             // fecha que se expira
  }

  return jwt.encode(payload, config.SECRET_TOKEN)            // enviamos la info + el secret

}

function decodeToken(token) {
  // usando promesas
  const decoded = new Promise((resolve, reject) => {
    try{

      const payload = jwt.decode(token, config.SECRET_TOKEN)

      if(payload.exp <= moment().unix()) {
        reject({
          status: 401,
          message: 'el token ha expirado'
        })
      }

      resolve(payload.sub)

    } catch (err) {
      reject({
        status: 500,
        messaje: 'Invalid Token'
      })
    }
  })

  return decoded
}

module.exports = {
  createToken,
  decodeToken
}
