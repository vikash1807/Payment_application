const mongoose = require('mongoose')
const { Schema } = require('mongoose')
const dotenv = require('dotenv')

const dbUrl = process.env.DATABASE_URL;
mongoose.connect(dbUrl);

const userSchema = new Schema({
    firstName : {type : String, required : true},
    lastName : {type : String, required : true},
    username : {type : String, required : true},
    password : {type : String, required : true}
})
const User = mongoose.model('User', userSchema);

const accountSchema = new Schema({
    userId : {type : Schema.Types.ObjectId, ref : User, required : true},
    balance : {type : Number, required : true}
})

const Account = mongoose.model('Amount', accountSchema);

module.exports = {User, Account};


