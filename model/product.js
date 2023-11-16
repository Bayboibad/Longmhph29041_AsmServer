const db = require('../database/db');
const productShema = new db.mongoose.Schema({
    plot: String,
    describe: String,
    author: String,
    year: Number,
    banner: String,
    arrayImages:[String]
}, { collection: "tb_product" });
let Product = db.mongoose.model('products', productShema);
module.exports = Product;