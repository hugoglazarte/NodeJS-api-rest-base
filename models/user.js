'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// añadimos una libreria para encriptar las contraseñas
const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');

const UserSchema = Schema({
  email: {type: String, unique: true, lowercase: true},
  displayName: String,
  avatar: String,
  password: {type: String, select: false},
  signupDate: {type: Date, default: Date.now()},
  lastLogin: Date
});

// Agregamos una funcionalidad para encriptar la contraseña antes de guardar
UserSchema.pre('save', (next) => {
  let user = this
  // chequeamos si no modifico su pass, si no modifico pasamos al siguiente middlewere
  if(!user.isModified('password')) return next()

  // si la modifico
  bcrypt.genSalt(10, (err, salt) => {
    if(err) return next(err)

    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if(err) return next(err)

      // si no hay errores, guardamos el pass encriptado como passsword
      user.password = hash;
      next();
    })
  })
})

// creamos un metodo de mongoose para el avatar a traves del gravatar
UserSchema.methods.gravatar = function() {
  if(!this.email) return 'https://gravatar.com/avatar/?s=200&d=retro'

  const md5 = createHash('md5').update(this.email).digest('hex');
  return `https://gravatar.com/avatar/${md5}?s=200&d=retro`;
}

module.exports = mongoose.model('User', UserSchema);
