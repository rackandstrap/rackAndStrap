const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config('../config/.env');

const authenticateUser = async (req, res, next) => {

    try {
        const token = req.headers.authorization.split(' ')[1];

        if (!token) {
            return res.status(403).json({response: "please include a token"})
        }

        const data = jwt.verify(token, process.env.JWT_SECRET)

        if (data) {
            const user = await User.findOne({_id: data.id})
            req.user = user;
            next()
        } else {
            res.status(403).json({response: "error"})
        }
    } 
    catch (err) {
        res.status(500).json({response: err});
    }
}

module.exports = {authenticateUser}

