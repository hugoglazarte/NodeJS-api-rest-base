'use strict'

const mongoose = require('mongoose');
const User = require('../models/user');
const service = require('../services');

function signUp (req, res) {                      // function para crear usuario
  const user = new User({
    email: req.body.email,
    displayName: req.body.displayName,
    password: req.body.password
  })

  user.save((err) => {
    if(err) res.status(500).send({
      message: `Error al cargar el usuario: ${err}`});

    return res.status(200).send({
      token: service.createToken(user) });         // creamos un servicio que contiene el token
  });
}

function signIn (req, res) {                      // function para cargar usuario
  User.find({ email: req.body.email }, (err, user) => {

    if(err) return res.status(500).send({ message: err })

    if(!user) return res.status(404).send({ message: 'no existe usuario'});

    req.user = user
    res.status(200).send({
      message: 'Te has logueado correctamente ',
      token: service.createToken(user)
    })
  });           // traemos el email


}

module.exports = {
  signUp,
  signIn
}
