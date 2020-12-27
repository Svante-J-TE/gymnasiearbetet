const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    user: String,
    comment: String,
    postId: String
})

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;