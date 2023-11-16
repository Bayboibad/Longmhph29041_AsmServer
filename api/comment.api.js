const myModel = require('../model/comment')
const mongoose = require("mongoose");
const api_url = "mongodb://127.0.0.1:27017/ql_truyentranh";
exports.addCommentApi = async (req, res, next) => {
    try {
        await mongoose.connect(api_url);
        const { id_user, id_plot, content } = req.body;

        if (!id_user || !id_plot || !content) {
            return res.status(400).json({ check: "Dữ liệu trống" });
        }
   
        //create a new user
        const newUser = new myModel({ id_user,id_plot, content  });
        await newUser.save();
        return res.status(200).json({ data: newUser, check: "Thêm thành công" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ check: "Lỗi" });
    }
};
exports.listAllApi = async (req, res, next) => {
    try {
        await mongoose.connect(api_url);
        const { id_plot } = req.query;

        if (!id_plot) {
            return res.status(400).json({ check: "Dữ liệu trống" });
        }

        // Find user by id_plot
        const foundUser = await myModel.find({id_plot:id_plot});

        if (!foundUser) {
            return res.status(404).json({ check: "không có dữ liệu" });
        }
        return res.status(200).json({ data: foundUser, check: "Thành công" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ check: "Lỗi" });
    }
};
