'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = Schema({
  usuario: String,
  nombre: String,
  primerApellido: String,
  segundoApellido: String,
  password: String
});

module.exports = mongoose.model('User', UserSchema);
