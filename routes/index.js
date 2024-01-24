var express = require('express');
var router = express.Router();
const userController = require('../controller/user.controller')
const userApi = require('../api/user.api');
var sock = require('../socket');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/addLogin',userController.login);



router.post('/addApiLogin', userApi.addApiLogin);


module.exports = router;
