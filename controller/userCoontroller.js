const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

// Register a user---------------------------------------
// route -> POST/api/user/register
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(404);
        throw new Error("All fields are required");
    }
    const userAvailable = await User.findOne({ email })
    if (userAvailable) {
        res.status(404)
        throw new Error("User already registered ")
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)
    console.log("Hashed Password:", hashedPassword)
    const user = await User.create({
        username,
        email,
        password: hashedPassword
    });
    console.log(`User created ${user}`)
    if (user) {
        res.status(201).json({ _id: user.id, email: user.email })
    } else {
        res.status(404)
        throw new Error("User data is not vali")
    }

});

// login a user----------------------------------------------
// route -> POST/api/user/login
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.json(404)
        throw new Error("All fields are required")
    }
    const user = await User.findOne({ email });
    // compare password with hashed password
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id
            },
        }, process.env.ACCESS_TOKEN,
            {expiresIn:"1m"}
        )
        res.status(200).json({ accessToken })
    }else{
        res.status(401)
        throw new Error("Email or Password is not valid")
    }
});

// Current user details-------------------------------------------
// route -> GET/api/user/
//Private access
const currentUser = asyncHandler(async (req, res) => {
    res.json({ message: "Current user info" })
});

module.exports = { registerUser, loginUser, currentUser }