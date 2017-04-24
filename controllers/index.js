'use strict'
const express = require('express');
const User = require('../models/user');
const log4js = require('log4js');
const bcrypt = require('bcrypt-nodejs');
const logger = log4js.getLogger();

function index(req, res, next) {
  res.render('index', {title: 'Express'});
}
function login(req, res, next) {
  logger.info(req.body.usuario);
  logger.info(req.body.password);
  User.findOne({usuario:req.body.usuario},(err,user)=>{
    if(err){
      res.redirect('/');
    }else{
      if(user){
        bcrypt.compare(req.body.password, user.password, (err, resul)=>{
          if(resul){
            req.session.user = user._id;
            res.redirect('/users/');
          }else{
            res.redirect('/');
          }
        });
      }else{
        res.redirect('/');
      }
    }
  });

}

module.exports = {
 index,
 login
};
