'use strict'
const express = require('express');
const User = require('../models/user');
const log4js = require('log4js');
const bcrypt = require('bcrypt-nodejs');
const logger = log4js.getLogger();

function index(req, res, next) {
  logger.debug("INDEX");
  User.find({}, (err, users)=>{
    res.render('users/index', {"users":users, 'status': res.locals.status});
  });

}

function newUser(req, res, next){
  logger.debug("NEW");
  const user = {'usuario':'',
  'nombre':'',
  'primerApellido':'',
  'segundoApellido':'',
  'password': ''};
  res.render('users/new', {'user':user});
}

function create(req, res, next) {
  logger.debug("CREATE");


  let user = new User({
    usuario: req.body.usuario,
    nombre: req.body.nombre,
    primerApellido: req.body.primerApellido,
    segundoApellido: req.body.segundoApellido,
    password: req.body.password
  });

  if(req.body.password){
    bcrypt.hash(req.body.password, null, null, (err, hash) =>{
      let code = '';
      let message = '';
      if(err){
        //TODO
      } else{
          user.password = hash;
          user.save((err, object)=>{
          if(err){
            code = 'danger';
            message = 'No se a podido crear el usuario';
          }else {
              code ='success';
              message ='Usuario creado correctamente.';
            }
          res.locals.status =  {
            code:code,
            message:message
          };
          next();
        });
      }
    });
  }
}

function show(req, res, next){
  logger.debug("SHOW");
  logger.info(req.params.id);
  User.findOne({_id:req.params.id}, (err, user)=>{
    res.render('users/show', {'user':user});
  });
}

function edit(req, res, next){
  logger.debug("EDIT");
  User.findOne({_id:req.params.id}, (err, user)=>{
  res.render('users/edit', {'user':user});
});

}

function update(req, res, next){
  logger.debug("UPDATE");
  let user = {
    usuario: req.body.usuario,
    nombre: req.body.nombre,
    primerApellido: req.body.primerApellido,
    segundoApellido: req.body.segundoApellido,
    password: req.body.password
  };
  User.update({_id:req.params.id},{$set:user}, (err,user) =>{
    next();
  });

}

function destroy(req, res, next){
  logger.debug("DESTROY");
  User.remove({_id:req.params.id},(err, user)=>{
    next();
  });
}

module.exports = {
  index,
  newUser,
  create,
  show,
  edit,
  update,
  destroy
};
