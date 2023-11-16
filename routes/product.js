var express = require('express');
var router = express.Router();
const myModel = require('../model/product');
const productApi = require('../api/manage.api')
const detailApi = require('../api/comment.api');
/* GET home page. */
router.get('/', async function(req, res, next) {
  const query = await myModel.find();
  res.render('product', {product:query});
});
router.get('/listAllProduct',productApi.listAllProduct);
router.get("/commentApi",detailApi.addCommentApi);
module.exports = router;
