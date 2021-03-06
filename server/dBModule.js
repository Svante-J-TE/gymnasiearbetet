const mongoose = require('mongoose');


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
});

exports.connectToMongoose = (input) =>{
  mongoose.connect(`mongodb://localhost/${input}`, { useNewUrlParser: true, useUnifiedTopology: true });
}

exports.saveToMongoose = (input) => {
  input.save(()=>{
    console.log("Input successfully saved to MongoDB")
  })
}

exports.findInMongoose = async (mdl, toFind) => {
  return await mdl.findOne({ _id: toFind })
}

exports.findInDB = async (Model) => {
  return await Model.find({});
}