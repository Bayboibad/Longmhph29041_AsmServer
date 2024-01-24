// Trong file product.js
const express = require('express');
const router = express.Router();
const myModel = require('../model/product');
const myComment = require('../model/comment');
const myUser = require("../model/user");
const detailController = require('../controller/comment.controller');
const detailApi = require('../api/comment.api');
// router.get('/:productId', async (req, res) => {
//     const productId = req.params.id;
//     const query = await myModel.findById(productId);
//     res.render('detail', { query : query});
// });
router.post("/comment",detailController.addComment)

// api
router.post("/commentApi",detailApi.addCommentApi);
router.get("/listCommentApi",detailApi.listAllApi);

module.exports = router;
