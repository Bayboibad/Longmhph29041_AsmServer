const myModel = require('../model/product');
const socket = require("../socket");
var multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/")
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
var upload = multer({ storage: storage });

exports.addProduct = async (req, res, next) => {
    upload.fields([{
        name: 'avatar', maxCount: 1
    },
    { name: 'imagesContent', maxCount: 5 }])
        (req, res, async function (err) {
            if (req.method == "POST") {
                try {
                    const productName = req.body.productName;
                    const productAuthor = req.body.productAuthor;
                     const avatarPath = req.files.avatar ? req.files.avatar[0].path : null;
                  

                    let product = {
                        title: productName,
                        author: productAuthor,
                        banner: avatarPath,
                    };
                    let kq = await myModel.create(product);
                    console.log(kq);
                    socket.io.emit("new msg", "Thêm Thành công");
                    res.redirect("/manage");

                } catch (e) {
                    console.log('lỗi', e);
                    res.status(500).send('Internal Server Error');
                }
            }

        });

}

exports.updateManage = async (req, res, next) => {
    try {
        const productId = req.body.productId;
        const updatedData = {
            title: req.body.editProductName,
            author: req.body.editProductAuthor,
        };

        if (req.files && req.files.editAvatar) {
            updatedData.banner = req.files.editAvatar[0].path;
        }

        // Update the product in the database
        const updatedProduct = await myModel.findByIdAndUpdate(productId, updatedData, { new: true });

        console.log('Updated Product:', updatedProduct);
        res.redirect("/manage");
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).send('Internal Server Error');
    }
};


exports.deleteManage = async (req, res, next) => {
    try {
        const productId = req.query.productId; 

        // Delete the product from the database
        await myModel.findByIdAndDelete(productId);

        res.redirect("/manage");
    } catch (e) {
        console.log('Error deleting product:', e);
        res.status(500).send('Internal Server Error');
    }
}

