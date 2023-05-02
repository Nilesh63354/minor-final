const  asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const authUser =asyncHandler(async(req,res)=>{
    const {user_id,password}=req.body;

    const user = await User.findOne({user_id});

    if ( user && password) {
         res.json({
            user_id: user.user_id,
        });
    }
});

module.exports= {authUser};