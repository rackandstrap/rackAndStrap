const Users = require('../models/userModel')
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')

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


const registerUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  // Check if user exists
  const userExists = await Users.findOne({ username })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create user
  const user = req.body
  user.password = hashedPassword
  const createdUser = await Users.create(user)

  if (createdUser) {
    res.status(201).json({
        createdUser,
        token: generateToken(createdUser._id)
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})


const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body

  const user = await Users.findOne({ username })

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      user,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
})


const updateUser = asyncHandler(async (req, res) => {
    const auth = req.headers['authorization']
    if (auth) {
        const token = auth.split(' ')[1]
        console.log(token)
        return res.status(200).json({response: "received"})
    } else {
        return res.status(400).json({response: "no token provided"})
    }
})


const deleatedUser = asyncHandler(async (req, res) => {
    
})

const getSelf = asyncHandler(async (req, res) => {
  res.status(200).json(req.user)
})

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET)
}

module.exports = {
  registerUser,
  loginUser,
  getSelf,
  authenticateUser,
  updateUser
}

