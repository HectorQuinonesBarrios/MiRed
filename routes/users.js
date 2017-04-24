'use strict'
const express = require('express');
const userController = require('../controllers/user');
const router = express.Router();

/* GET users listing. */
router.get('/', userController.index);

router.get('/new', userController.newUser);

router.post('/', userController.create);

router.get('/:id', userController.show );

router.get('/:id/edit', userController.edit );

router.put('/:id', userController.update );

router.delete('/:id', userController.destroy );

module.exports = router;

router.use('/', userController.index);
