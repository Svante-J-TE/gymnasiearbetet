const mongoose = require('mongoose');

const messagePostSchema = new mongoose.Schema({
    title: String,
    message: String
})

const MessagePost = mongoose.model('Message', messagePostSchema);

exports.createMessage = (inTitle, inMessage) =>{
    let message = new MessagePost({
        title: inTitle,
        message: inMessage
    })
    return message;
}

exports.getAllMessages = async () =>{
    let message = await MessagePost.find({})
    return message;
}