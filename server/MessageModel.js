const mongoose = require('mongoose');

const messagePostSchema = new mongoose.Schema({
    user: String,
    title: String,
    message: String
})

const MessagePost = mongoose.model('Message', messagePostSchema);

exports.createMessage = (inUser, inTitle, inMessage) =>{
    let message = new MessagePost({
        user: inUser,
        title: inTitle,
        message: inMessage
    })
    return message;
}

exports.getAllMessages = async () =>{
    let message = await MessagePost.find({})
    return message;
}