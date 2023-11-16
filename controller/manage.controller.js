const myModel = require('../model/product');
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
                    const productYear = req.body.productYear;
                    const productDescription = req.body.productDescription;
                     const avatarPath = req.files.avatar ? req.files.avatar[0].path : null;
                     const imagesContentPaths = req.files.imagesContent ? req.files.imagesContent.map(file => file.path) : [];

                    let product = {
                        plot: productName,
                        describe: productDescription,
                        author: productAuthor,
                        year: productYear,
                        banner: avatarPath,
                        arrayImages:imagesContentPaths,
                    };
                    let kq = await myModel.create(product);
                    console.log(kq);
                    res.redirect("/manage");

                } catch (e) {
                    console.log('lỗi', e);
                    res.status(500).send('Internal Server Error');
                }
            }

        });

}
exports.updateManage = (req, res, next) => {
}

exports.deleteManage = (req, res, next) => {
}
