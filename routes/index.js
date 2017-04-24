var express = require('express');
var router = express.Router();
const indexController = require('../controllers/index');
/* GET home page. */
router.get('/', indexController.index);
router.post('/login', indexController.login);
module.exports = router;
