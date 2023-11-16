const myComment = require('../model/comment');

exports.addComment = async (req, res, next) => {
    if (req.method === "POST") {
        try {
            const userId = req.session._id; 
            if (!userId) {
                return res.status(401).send("Unauthorized");
            }
            const contentDetail = req.body.productContent;
            const id_product = req.body.idProduct;
            const content = {
                content: contentDetail,
                id_user: userId,
                id_plot: id_product,
            };
            const kq = await myComment.create(content);
            console.log(kq);
            res.render("detail");
        } catch (e) {
            // Handle errors here
            console.error(e);
            res.status(500).send("Internal Server Error");
        }
    }
};

