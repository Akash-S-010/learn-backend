const asyncHandler = require("express-async-handler")

// Get all Register a user
// route -> POST/api/user/register
const registerUser = asyncHandler(async (req,res)=>{
    res.json({message:"Register user"})
});

// Get all Register a user
// route -> POST/api/user/login
const loginUser = asyncHandler(async (req,res)=>{
    res.json({message:"Login user"})
});

// Get all Register a user
// route -> GET/api/user/
//Private access
const currentUser = asyncHandler(async (req,res)=>{
    res.json({message:"Current user info"})
});

module.exports = {registerUser,loginUser,currentUser}