const db = require('../database/db');
const User = require("../model/user");
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productShema = new db.mongoose.Schema({
    title: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: User,
        required: true,
    },
    banner: String,
}, { collection: "tb_product", timestamps: true });
let Product = db.mongoose.model('products', productShema);
module.exports = Product;