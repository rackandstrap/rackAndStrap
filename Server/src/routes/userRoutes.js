const express = require('express');
const router = express.Router();
const Users = require('../models/userModel')
const bcrypt = require('bcrypt');
const authenticateUser = require('../controllers/userController')

router.get('/:all', async (req, res) => {
    if (req.params.all === "all") {
        const users = await Users.find();
        res.json(users);
    } else {
        res.status(404).json({response: "user not found"});
    }
})

router.post('/login', authenticateUser , async (req, res) => {
    const {username} = req.body;
    const user = await Users.findOne({username});

    console.log(user);
    res.json(user);
})

router.post('/register', async (req, res) => {
    try {
        const userExists = await Users.findOne({username: req.body.username});

        if (userExists) {
            return res.status(400).json({response: "user already exists"})
        }

        const newUser = await Users.create({
            username: req.body.username,
            password: await bcrypt.hash(req.body.password, 10),
            name: req.body.name || "",
            homebase: req.body.homebase || "",
            jobs: req.body.jobs || [],
            provide: req.body.provide || []
        })

        return res.json(newUser)
    }

    catch (error) {
        return res.status(400).json({error: "Could not create user"})
    }
})

router.patch('/', authenticateUser, async (req, res) => {
    
    try {
        const updates = req.body.updates;
        if (updates.password) {
            updates.password = await bcrypt.hash(updates.password, 10)
        }
        const updatedUser = await Users.updateOne({username: req.body.creds.username}, updates)
        
        return res.json({response: "user updated"})
    }
    catch (error) {
        console.log(error)
        res.status(500).json({response: "unexpected server error"})
    }
    
    
})

router.delete('/', authenticateUser, async (req, res) => {
    const {username} = req.body;
    const deleatedUser = await Users.deleteOne({username});
    
    res.json({response: "user deleted succesfully"})
});


module.exports = router;
