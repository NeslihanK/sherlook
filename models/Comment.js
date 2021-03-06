const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const commentSchema = new Schema({
    content: {type: String, required: true},
    author: {type: Schema.Types.ObjectId, ref:'User'},
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;