const myModel = require('../model/product')
const User = require("../model/user")
const mongoose = require("mongoose");
const api_url = "mongodb://127.0.0.1:27017/ql_truyentranh";
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

exports.addManageApi = async (req, res, next) => {
    upload.single('banner')(req, res, async function (err) {
        try {
            await mongoose.connect(api_url);

            const { title, author } = req.body;
            if (!title  || !author ) {
                return res.status(400).json({ check: "Dữ liệu trống" });
            }
            const bannerPath = req.file ? req.file.path : null;

            console.log("Request Body:", req.body);
            console.log("Uploaded File:", req.file);

            const newManage = new myModel({ title, author, banner: bannerPath });
            await newManage.save();
            return res.status(200).json(newManage);
        } catch (err) {
            console.log(err);
            return res.status(500).json({ check: "Lỗi" });
        }
    });
};


exports.updateManageApi = async (req, res, next) => {
    try {
        await mongoose.connect(api_url);

        const { _id, title, author, banner } = req.body;
        if ( !author || !_id ) {
            return res.status(400).json({ check: "Dữ liệu không hợp lệ" });
        }



        const userID = await myModel.findByIdAndUpdate(_id);
        if (!userID) {
            return res.status(400).json({ check: "Không tìm thấy dữ liệu" });
        }

        if (title) userID.title = title;
        if (author) userID.author = author;
        if (banner) userID.banner = banner;

        await userID.save();

        return res
            .status(200)
            .json(userID);
    } catch (err) {
        return res.status(500).json({ check: err });
    }
};
exports.deleteManageApi = async (req, res, next) => {
    try {
        await mongoose.connect(api_url);

        const { _id } = req.query;

        const result = await myModel.findOneAndDelete({ _id });
        if (!result) {
            return res.status(400).json({ check: "Không tìm thấy người dùng" });
        }

        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json({ err });
    }
};
exports.listAllProduct = async (req, res, next) => {
    try {
        await mongoose.connect(api_url);
        const newManage = await myModel.find().populate({
            path: "author",
            model: User,
            select: "username",
        });

        const dataProduct = newManage.map((data) => ({
            id: data.id,
            title: data.title,
            author: data.author.username,
            video: data.banner,
            createdAt: data.createdAt,
        }));
        return res.status(200).json(dataProduct);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ check: "Lỗi" });
    }
};