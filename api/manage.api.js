const myModel = require('../model/product')
const mongoose = require("mongoose");
const api_url = "mongodb://127.0.0.1:27017/ql_truyentranh";
exports.addManageApi = async (req, res, next) => {
    try {
        await mongoose.connect(api_url);
        const { plot, describe, author, year,banner,arrayImages } = req.body;

        if (!plot || !describe || !author||!year) {
            return res.status(400).json({ check: "Dữ liệu trống" });
        }
        // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // if (!emailRegex.test(email)) {
        //     return res.status(400).json({ check: "Email lỗi" });
        // }
    
        //create a new user
        const newManage = new myModel({ plot,describe, author, year,banner ,arrayImages });
        await newManage.save();
        return res.status(200).json({ data: newManage, check: "Thêm thành công" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ check: "Lỗi" });
    }
};
exports.listAllProduct = async (req, res, next) => {
    try {
        await mongoose.connect(api_url);
        const newManage = await myModel.find();
        return res.status(200).json({ data: newManage, check: "Thêm thành công" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ check: "Lỗi" });
    }
};