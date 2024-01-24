const myModel = require('../model/comment');
const User = require("../model/user")
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
        return res.status(200).json(newUser);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ check: "Lỗi" });
    }
};
exports.listAllApi = async (req, res, next) => {
  try {
    const { id_plot } = req.query;

    if (!id_plot) {
      return res.status(400).json({ error: "Dữ liệu trống" });
    }

    // Tìm comment theo id_plot và populate trường id_user với thông tin username
    let foundComments = await myModel
      .find({ id_plot: id_plot })
      .populate({
        path: "id_user",
        model: User,
        select: "username",
      })
      .exec();

    if (!foundComments || foundComments.length === 0) {
      return res.status(404).json({ error: "Không có dữ liệu" });
    }
    foundComments = foundComments.sort((a, b) => b.createdAt - a.createdAt);

    const commentsData = foundComments.map((comment) => ({
      id_user: comment.id_user.username,
      content: comment.content,
      createdAt: comment.createdAt,
    }));

    return res.status(200).json(commentsData);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Lỗi" });
  }
};

