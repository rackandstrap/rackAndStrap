const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const authenticateUser = async (req, res, next) => {
    const { id } = req.headers.authorization.split(' ')[1]
    if (!id) {
        return res.status(403).json({response: "please include a token"})
    }
    const user = await User.findOne({_id: id})

    if (!user) {
        return res.status(403).json({response: "wrong credentials"})
    }

    req.user = user
    next()
}

