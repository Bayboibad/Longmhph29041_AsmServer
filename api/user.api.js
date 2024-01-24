
const myModel = require('../model/user')
const mongoose = require("mongoose");
const socket = require("../socket");
const api_uri = "mongodb://127.0.0.1:27017/ql_truyentranh";
// Sử lý API
exports.listUserApi = async (req,res,next) =>{
    await mongoose.connect(api_uri);
    const newUser = await myModel.find();
    return res.status(200).json(newUser);
}
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
        return res.status(200).json( newUser);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ check: "Lỗi" });
    }
};

exports.updateUser = async (req, res, next) => {
    try {
        await mongoose.connect(api_uri);

        const { _id, username, fullname, password,email } = req.body;
        if (!password || !email || !fullname || !_id) {
            return res.status(400).json({ check: "Dữ liệu không hợp lệ" });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ check: "Email lỗi" });
        }
   

        const userID = await myModel.findById(_id);
        if (!userID) {
            return res.status(400).json({ check: "Không tìm thấy dữ liệu" });
        }

        if(username) userID.username = username;
        if(email) userID.email = email;
        if(fullname) userID.fullname = fullname;
        if(password) userID.password = password;


        await userID.save();

        return res
            .status(200)
            .json(userID);
    } catch (err) {
        return res.status(500).json({ check: err });
    }
};
exports.deleteUser = async (req, res, next) => {
    try {
        await mongoose.connect(api_uri);

        const { _id } = req.body;

        const result = await myModel.findOneAndDelete({ _id });
        if (!result) {
            return res.status(400).json({ check: "Không tìm thấy người dùng" });
        }

        return res.status(200).json(result);
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
    }else{

    }
    return res.status(200).json(user);
} catch (err) {
    console.log(err);
    return res.status(500).json({ check: "Lỗi" });
}
  };