const mongoose = require('mongoose')
const { Schema } = require('mongoose')
mongoose.connect('mongodb+srv://vikash2024:Vikash2024@cluster0.dib0h.mongodb.net/paytm')

const schema = new Schema({
    firstName : {type : String, required : true},
    lastName : {type : String, required : true},
    username : {
        type : String, 
        required : true,
    },
    password : {
        type : String, 
        required : true,
    }
})

const User = mongoose.model('User', schema);

module.exports = {User}


