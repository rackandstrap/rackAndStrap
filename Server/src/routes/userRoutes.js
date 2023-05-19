const express = require('express');
const router = express.Router();
const Users = require('../models/userModel')
const bcrypt = require('bcrypt');
const {registerUser, loginUser, getSelf, authenticateUser, updateUser} = require('../controllers/userController')


router.get('/:all', async (req, res) => {
    if (req.params.all === "all") {
        const users = await Users.find();
        res.json(users);
    } else {
        res.status(404).json({response: "user not found"});
    }
})

router.post('/login', loginUser)

router.post('/register', registerUser)

router.patch('/', updateUser)

router.delete('/', authenticateUser, async (req, res) => {
    const {username} = req.body;
    const deleatedUser = await Users.deleteOne({username});
    
    res.json({response: "user deleted succesfully"})
});


module.exports = router;