const myModel = require('../model/user');


exports.addUser = async (req, res, next) => {
    if (req.method == 'POST') {
        try {
            const username = req.body.username;
            const fullname = req.body.fullname;
            const emailLogin = req.body.emailLogin;
            const passwordLogin = req.body.passwordLogin;
            const user = await myModel.findOne({ email: emailLogin });

            if (user) {
                return res.status(404).send("Trùng email");
            }
            let users = {
                username: username,
                fullname: fullname,
                email: emailLogin,
                password: passwordLogin,
            }
            const kq = await myModel.insertMany(users);
            res.redirect('/logup');
            console.log("Thêm thành công" + kq);
        } catch (e) {
            console.log("Thêm không thành công");
        }
    }
};

exports.updateUser = (res, req, next) => {

};
exports.deleteUser = async (req, res, next) => {
    // Implement the delete logic here
    // Example: Delete user by ID
    const productId = req.query.productId; 

    try {
        const deletedUser = await myModel.findOneAndDelete(productId);

        if (!deletedUser) {
            return res.status(404).send("User not found");
        }

        console.log("Xóa thành công", deletedUser,productId);
        res.redirect('/manage'); // Redirect to the desired page after deleting
    } catch (error) {
        console.error("Xóa không thành công", error);
        res.status(500).send("Internal Server Error");
    }
};

exports.login = async (req, res, next) => {
    if (req.method === "POST") {
        try {
            const emailLogin = req.body.emailLogin;
            const passwordLogin = req.body.passwordLogin;

            // Assuming myModel is a Mongoose model
            const user = await myModel.findOne({ email: emailLogin });

            if (!user) {
                console.log("User not found with email: " + emailLogin);
                return res.status(404).send("Sai email");
            }

            if (user.password !== passwordLogin) {
                console.log("Incorrect password " + passwordLogin + user.password);
                return res.status(401).send("Sai mật khẩu");
            }
            console.log(user._id);
            // Redirect to /product if login is successful
            res.redirect('/product',{user});
        } catch (error) {
            console.error("Error during login:", error);
            res.status(500).send("Lỗi server");
        }

    }
};
