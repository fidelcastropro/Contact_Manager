const asyncHandler = require("express-async-handler")
const userModel = require("../models/userDataModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()


//Description : login the user
//Route : POST user/login
//Access : Public
const loginUser = asyncHandler(async (req,res) => {
    const {email , password} = req.body
    if(!email || !password){
        res.status(400)
        throw new Error("All Fields are Mandatory")
    }
    const userAvailable = await userModel.findOne({email})
    if(!userAvailable){
        res.status(400)
        throw new Error("The user is not registered Yet")
    }

    if(userAvailable && (await bcrypt.compare(password , userAvailable.password))){
        const accessToken = jwt.sign({
            user : {
                userName : userAvailable.userName,
                email : userAvailable.email,
                id : userAvailable._id
            }
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn : "15m"}
        )
        res.status(200).json({accessToken})
    }
    else{
        res.status(401)
        throw new Error("The User Credentials are not Valid")
    }
})

//Description : Register new user
//Route : POST user/register
//Access : Public
const registerUser = asyncHandler(async (req,res) => {
    const {userName,email,password} = req.body
    if(!userName || !email || !password){
        res.status(400)
        throw new Error("All Fields are Mandatory")
    }
    const userAvailable = await userModel.findOne({email})
    if(userAvailable){
        res.status(400)
        throw new Error("The user had Already Registered")
    }
    const hashedPassword  = await bcrypt.hash(password,10)
    console.log(hashedPassword)
    const registeredUser = await userModel.create({
        userName,
        email,
        password : hashedPassword
    })

    if(registeredUser){
        res.status(200)
        res.json({id : registeredUser.id , name : userName , email : email})
    }
    else{
        res.status(400)
        throw new Error("User Data is not valid")
    }

})

//Description : Get the current user Info
//Route : GET user/current
//Access : Private
const currentUser = asyncHandler(async (req,res) => {
    res.status(200).json(req.user)
})

module.exports = {loginUser,registerUser,currentUser}