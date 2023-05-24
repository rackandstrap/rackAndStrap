const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config('../config/.env');

const authenticateUser = async (req, res, next) => {

    const token = req.headers.authorization.split(' ')[1];
    console.log(token)
    if (!token) {
        return res.status(403).json({response: "please include a token"})
    }

    const data = jwt.verify(token, process.env.JWT_SECRET)
    console.log(data)

    if (data) {
        // const user = await User.findOne({_id: data.id})
        req.userId = data.id;
        next()
    } else {
        res.status(403).json({response: "error"})
    }

    // const user = await User.findOne({_id: id})

    // if (!user) {
    //     return res.status(403).json({response: "wrong credentials"})
    // }

    // req.user = user

}

module.exports = authenticateUser

