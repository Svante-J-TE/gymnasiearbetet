const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    password: String
})

const User = mongoose.model('User', userSchema);

exports.createUser = (inName, inPassword) =>{
    let user = new User({
        name: inName,
        password: inPassword
    })
    return user;
}

exports.findUser = async () =>{
    let user = await User.find({})
    return user;
}