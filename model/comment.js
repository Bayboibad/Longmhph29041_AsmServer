const db = require('../database/db');
const commentShema = new db.mongoose.Schema({
    id_user :String, 
    id_plot: String,
    content: String,
},{collection:"tb_comment",timestamps : true});
let Comment = db.mongoose.model('comment',commentShema,'comments');
module.exports = Comment;