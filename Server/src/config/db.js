const mongoose = require('mongoose');

// import dotenv and run the file which will pull all our env variables into process.env
require('dotenv').config({path: "./src/config/.env"})

// get connection string from .env file - *change USERNAME and PASSWORD* to your own username and password in dot env file
const connectionString = process.env.CONNECTION_STRING_USERS;

// connect to db
const connectToDB = async () => {
    try {
        await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to database');
    }
    catch (err) {
        console.error('Error connecting to database: ', err);
    }
}


module.exports = connectToDB;

