const express = require('express');
const router = express.Router();
const Users = require('../models/userModel')
const bcrypt = require('bcrypt');
const {registerUser, loginUser, getUsers, updateUser, deleteUser} = require('../controllers/userController')
const {authenticateUser} = require('../middleware/index')

// GET /users/?limit=<num>
router.get('/', getUsers)

// POST /users/login
// send username and password in request body
router.post('/login', loginUser)

// POST /users/register
// send all the reqired fields for the user schema in the request body
router.post('/register', registerUser)

// PATCH /users
// send an object with the properties you want to update in the request body
// send the token in the request headers -> Authorization: 'Bearer <token>'
router.patch('/', authenticateUser ,updateUser)

// DELETE /users
// send the token in the request headers -> Authorization: 'Bearer <token>' 
router.delete('/', authenticateUser, deleteUser);


module.exports = router;

