var express = require('express');
var router = express.Router();
const manageController = require('../controller/manage.controller');
const manageApiController = require('../api/manage.api');
const myModel= require('../model/product')
/* GET home page. */
router.get('/', async function(req, res, next) {
  const query = await myModel.find();
  res.render('manage',{product : query});
});
router.post('/addManagee',manageController.addProduct);
router.put('/updateManage',manageController.updateManage);
router.delete('/deleteManage',manageController.deleteManage);

// API
router.post('/addManageApi',manageApiController.addManageApi);
module.exports = router;
