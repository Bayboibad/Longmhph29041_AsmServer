
var express = require('express');
var router = express.Router();
var userController = require('../controller/user.controller');
var userApi = require('../api/user.api');
router.get('/', (req, res, next) => {
    res.render('logup');
  
});
router.post('/addUser', userController.addUser);
router.put('/updateUser', userController.updateUser);
router.delete('/delete', userController.deleteUser);
// API
router.post('/addUserApi', userApi.addUserApi);


module.exports = router;
