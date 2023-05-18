const Users = require('../models/userModel')
const bcrypt = require('bcrypt')

const authenticateUser = async (req, res, next) => {
    try {
        let username;
        let password;

        if (req.body.creds) {
            username = req.body.creds.username;
            password = req.body.creds.password;
        } else {
            username = req.body.username;
            password = req.body.password;
        }

        const user = await Users.findOne({username});

        if (!user) {
            return res.status(404).json({response: "username does not exist"});
        } 

        const correctPassword = await bcrypt.compare(password, user.password);

        if (correctPassword) {
            next();
        } else {
            return res.status(400).json({error: "Invalid Password"})
        }
    }

    catch (error) {
        res.status(500).json({error: "Server error"})
    }
}

module.exports = authenticateUser