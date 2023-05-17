const express = require('express');
const router = express.Router();
const Users = require('../models/userModel')
const bcrypt = require('bcrypt');

router.get('/:all', async (req, res) => {
    if (req.params.all === "all") {
        const users = await Users.find();
        res.json(users);
    } else {
        res.status(404).json({response: "user not found"});
    }
})

router.get('/', async (req, res) => {
    try {
        const {username, password} = req.body;

        const user = await Users.findOne({username});

        if (!user) {
            res.status(404).json({response: "username does not exist"});
        } 

        const correctPassword = await bcrypt.compare(password, user.password);

        if (correctPassword) {
            res.json(user);
        } else {
            res.status(400).json({error: "Invalid Password"})
        }
    }

    catch (error) {
        console.error(error)
        res.status(500).json({error: "Server error"})
    }
})

router.post('/', async (req, res) => {
    try {
        const userExists = await Users.findOne({username: req.body.username});

        if (userExists) {
            res.status(400).json({response: "user already exists"})
        }

        const newUser = await Users.create({
            username: req.body.username,
            password: await bcrypt.hash(req.body.password, 10),
            name: req.body.name || "",
            homebase: req.body.homebase || "",
            jobs: req.body.jobs || [],
            provide: req.body.provide || []
        })

        res.json(newUser)
    }

    catch (error) {
        console.error(`Error during creation: ${error}`)
        res.status(400).json({error: "Could not create user"})
    }
})

router.put('/', async (req, res) => {
    // handle put request
})

router.delete('/', async (req, res) => {
    const {username, password} = req.body;

    const user = await Users.findOne({username});

    if (!user) {
        res.status(404).json({response: "username does not exist"});
    }

    const correctPassword = await bcrypt.compare(password, user.password);

    if (correctPassword) {
        try {
            await Users.deleteOne({username});
            res.json({response: "user deleted succesfully"})
        }
        catch (error) {
            res.status(400).json({error})
        }

    } else {
        res.status(400).json({error: "Invalid Password"})
    }
    
});

module.exports = router;