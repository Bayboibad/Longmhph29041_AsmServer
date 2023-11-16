
const myModel = require('../model/user')
const mongoose = require("mongoose");
const api_uri = "mongodb://127.0.0.1:27017/ql_truyentranh";
// Sử lý API
exports.addUserApi = async (req, res, next) => {
    try {
        await mongoose.connect(api_uri);
        const { username, email, fullname, password } = req.body;

        if (!username || !email || !fullname || !password) {
            return res.status(400).json({ check: "Dữ liệu trống" });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ check: "Email lỗi" });
        }

        //create a new user
        const newUser = new myModel({ username, password, email, fullname });
        await newUser.save();
        return res.status(200).json({ data: newUser, check: "Thêm thành công" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ check: "Lỗi" });
    }
};

exports.updateUser = async (req, res, next) => {
    try {
        await mongoose.connect(api_uri);

        const { _id, name, email, tel } = req.body;
        if (!name || !email || !tel || !_id) {
            return res.status(400).json({ check: "Dữ liệu không hợp lệ" });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ check: "Email lỗi" });
        }
        const telRegex = /^0\d{9}$/;
        if (!telRegex.test(tel)) {
            return res.status(400).json({ check: "Số điện thoại sai định dạng" });
        }

        const userID = await user.findById(_id);
        if (!userID) {
            return res.status(400).json({ check: "Không tìm thấy dữ liệu" });
        }

        if (name) userID.name = name;
        if (email) userID.email = email;
        if (tel) userID.tel = tel;

        await userID.save();

        return res
            .status(200)
            .json({ data: userID, check: "Update thông tin thành công" });
    } catch (err) {
        return res.status(500).json({ check: err });
    }
};
exports.deleteUser = async (req, res, next) => {
    try {
        await mongoose.connect(api_uri);

        const { _id } = req.body;

        const result = await user.findOneAndDelete({ _id });
        if (!result) {
            return res.status(400).json({ check: "Không tìm thấy người dùng" });
        }

        return res.status(200).json({ data: result, check: "Xóa thành công" });
    } catch (err) {
        return res.status(500).json({ err });
    }
};
exports.addApiLogin = async (req, res, next) => {
    try {
        await mongoose.connect(api_uri);
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ check: "Dữ liệu trống" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ check: "Email lỗi" });
    }

    const user = await myModel.findOne({ email, password });
    if (!user) {
        return res.status(401).json({ check: "Đăng nhập không thành công" });
    }
    return res.status(200).json({ data: user, check: "đăng nhập thành công thành công" });
} catch (err) {
    console.log(err);
    return res.status(500).json({ check: "Lỗi" });
}
  };