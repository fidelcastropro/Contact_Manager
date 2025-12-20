const mongoose = require("mongoose")
const { stringify } = require("uuid")

const userSchema = mongoose.Schema({
    userName : {
        type:String,
        required:[true,"Please give the username"]
    },
    email : {
        type:String,
        required:[true,"Please give your email"],
        unique:[true,"Email address is already registered"]
    },
    password : {
        type:String,
        required:[true,"Please set your Password"],
    }
},
{
    timestamps:true
})

module.exports = mongoose.model("userSchema",userSchema)