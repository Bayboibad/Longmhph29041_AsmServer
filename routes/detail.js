// Trong file product.js
const express = require('express');
const router = express.Router();
const myModel = require('../model/product');
const myComment = require('../model/comment');
const myUser = require("../model/user");
const detailController = require('../controller/comment.controller');
 const detailApi = require('../api/comment.api');
router.get('/:productId', async (req, res) => {
    const productId = req.query.id;
    const query = await myModel.findById(productId);

    const comment = await myComment.findOne({id_plot:productId});

    const user = await myUser.findOne({_id:comment.id_user});
    console.log(user);
    res.render('detail', { query : query, user: user, comment: comment});
});
router.post("/comment",detailController.addComment)

// api
router.post("/commentApi",detailApi.addCommentApi);
module.exports = router;
