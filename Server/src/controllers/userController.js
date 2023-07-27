const Users = require('../models/userModel')
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')


const getUsers = asyncHandler(async (req, res) => {
  try {
    const users = await Users.find().limit(req.query.limit);
    res.json(users)
  }
  catch (err) {
    res.status(400).send(err.message)
  }
})

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
        user: createdUser,
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
    try {
        const updates = req.body
        const user = await Users.findOneAndUpdate({_id: req.user._id}, updates, {new: true})
        res.json(user)
    }
    catch (err) {
        res.status(400).json({error: err})
    }
})

const deleteUser = asyncHandler(async (req, res) => {
  try {
    const deleatedUser = await Users.findByIdAndDelete(req.user.id);
    res.json(deleatedUser)
  }
  catch (err) {
      res.status(404).json({error: err.message})
  }
})

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET)
}

module.exports = {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  getUsers
}

