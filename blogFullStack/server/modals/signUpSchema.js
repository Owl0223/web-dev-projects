const mongoose = require("mongoose");

const signupSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    }
});

const newsletter = mongoose.model('newsletter', signupSchema);

module.exports = newsletter;