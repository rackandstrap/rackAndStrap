const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

require('dotenv').config({path: './src/config/.env'});
const connectionString = process.env.CONNECTION_STRING_TEST

mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error(err));

const testSchema = new mongoose.Schema({
    name: String,
    userName: String,
    password: String,
    age: Number,
    email: String,
    isAuthorized: Boolean
}, 
    {timestamps: true}
);

const SamsTests = mongoose.model('SamsTest', testSchema);

const data = {
    name: "testUser2",
    userName: "testUserName2",
    password: "testPassword2",
    age: 53,
    email: "testEmail2",
    isAuthorized: false
}

const hashPassword = (password) => {
    return bcrypt.hash(password, 10);
  }

// const addToDB = async (user) => {
//     user.password = await bcrypt.hash(user.password, 10);
//     SamsTests.create(user)
// }

// addToDB(data)

const authenticateUser = async (username, password) => {
    const user = await SamsTests.findOne({userName: username})
    if (!user) {
        console.log("User not found")
        return -1
    } 
    if (await bcrypt.compare(password, user.password) == true) {
        console.log("Password matches")
    } else {
        console.log("Password does not match")
    }
    
}

authenticateUser("testUserName2", "testPassword") // returns true


const getData = async () => {
    const data = await SamsTests.findOne();
    console.log(data);
}

// getData()

// const plainPassword = "Password1";
// const salt = 10;
// let hashed = "$2b$10$052aeKaB/FtQxFAKUMhX5OQbhR3Mon4E5u.bJdIYc09OoU2utNU/K";

// bcrypt.compare(plainPassword, hashed, (err, result) => {
//     if (err) {
//         console.log(err);
//     } else if (result === true) {
//         console.log('correct password');
//     } else {
//         console.log('wrong password');
//     }
// })

