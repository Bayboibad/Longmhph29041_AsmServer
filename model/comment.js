const mongoose = require('mongoose');
const User = require("../model/user");
const Comic = require("../model/product");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  id_user: {
    type: Schema.Types.ObjectId,
    ref: User, 
    required: true,
  },
  id_plot: String,
  content: String,
}, { collection: "tb_comment", timestamps: true });

const Comment = mongoose.model('Comment', commentSchema, 'comments');

module.exports = Comment;
