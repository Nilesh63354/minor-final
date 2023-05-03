const  asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const { Error } = require("mongoose");

const authUser =asyncHandler(async(req,res)=>{
    const {user_id,password}=req.body;

    const user = await User.findOne({user_id});

    if ( user && password) {
         res.json({
            user_id: user.user_id,
        });
    }
});

const registerUser =asyncHandler(async (req,res) =>{
    const {user_id, password}=req.body;

    if (!user_id || !password) {
        res.status(400);
        throw new  Error("Please enter  all the feilds");
    }

    const user =await User.create({
        user_id,
        password,
    });

    if (user) {
        res.status(201).json({
            name:user_id,
            pass:password
        });
    }else{
        res.status(400);
        throw new Error("User Not Found");
    }
});

module.exports= {registerUser,authUser};