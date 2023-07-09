const asynchandler = require("express-async-handler");
const User = require("../Models/UserModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
require("dotenv").config()
// @ LOGIN THE USER
// @ MOTHED [POST] - API/UESR/LOHIN
// @ PUBLIC [ACCESS]

const Login = asynchandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All Faild are mondtory")
    }

    // first we need find user is present in our databse or not 
    const user = await User.findOne({ email });

    // COMPARE PASSWORD OR HASHPASSWORD
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id
            }
        }, process.env.ACCESS_TOKEN_SECERT, { expiresIn: "300m" })
        res.status(200).json({ accessToken })
    } else {
        res.status(401);
        throw new Error("email or password is not vaild")
    }
    res.status(200).json({ message: 'LOGIN THE USER' });
})

// @ REGISTER NEW USER
// @ MOTHED [POST] - API/UESR/REGISTER 
// @ PUBLIC [ACCESS]

const Register = asynchandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All Faild are mondtory")
    }
    const UserAvailable = await User.findOne({ email });
    if (UserAvailable) {
        res.status(400);
        throw new Error("already register user")
    }
    // HASH PASSWORD
    const hashpassword = await bcrypt.hash(password, 5);
    console.log('hashpassword', hashpassword)
    const user = await User.create({ username, email, password: hashpassword })
    console.log(`user created :-- ${user}`)
    if (user) {
        res.status(201).json({ _id: user.id, email: user.email })
    } else {
        res.status(400);
        throw new Error("User data is not vaild")
    }
    res.status(200).json({ message: 'REGISTER NEW USER' });
})

// @ CURRENT USER INFORMATION
// @ MOTHED [DELETE] - API/USER/CURRENT
// @ PUBLIC [PRIVATE]

const Current_user = asynchandler(async (req, res) => {
    res.status(200).json(req.user);
});


module.exports = { Current_user, Login, Register }