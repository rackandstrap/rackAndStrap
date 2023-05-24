const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config('../config/.env');

const authenticateUser = async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[0];
    console.log(typeof token);
    if (!token) {
        return res.status(403).json({response: "please include a token"})
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
        if (err) {
            console.error(err);
        } else {
            console.log(data);
        }
    })

    // const user = await User.findOne({_id: id})

    // if (!user) {
    //     return res.status(403).json({response: "wrong credentials"})
    // }

    // req.user = user
    next()
}

module.exports = authenticateUser