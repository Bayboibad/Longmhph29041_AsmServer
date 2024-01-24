var express = require('express');
var router = express.Router();
const manageController = require('../controller/manage.controller');
const userContr = require('../controller/user.controller');
const manageApiController = require('../api/manage.api');
const myModel= require('../model/product')
const myUser = require('../model/user');

/* GET home page. */
router.get('/', async function(req, res, next) {
  const query = await myModel.find();
  const userModel = await myUser.find();
  res.render('manage',{product : query, user:userModel});
});

router.post('/addManagee',manageController.addProduct);
router.post('/updateManage',manageController.updateManage);
router.get('/deleteManage',manageController.deleteManage);

router.get('/deleteUser',userContr.deleteUser);



// API
router.get('/listManageApi',manageApiController.listAllProduct);
router.post('/addManageApi',manageApiController.addManageApi);
router.put('/updateManageApi',manageApiController.updateManageApi);
router.delete('/deleteManageApi',manageApiController.deleteManageApi);
module.exports = router;
