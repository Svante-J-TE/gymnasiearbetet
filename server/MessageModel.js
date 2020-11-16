const mongoose = require('mongoose');

const messagePostSchema = new mongoose.Schema({
    user: String,
    title: String,
    message: String
})

const MessagePost = mongoose.model('Message', messagePostSchema);
module.exports = MessagePost;