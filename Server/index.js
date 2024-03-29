const http = require('http');
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3001;

const Users = require('./src/models/userModel');


const connectToDB = require('./src/config/db')
// Connect to the database
connectToDB()

app.use(express.json())
app.use(cors());

// handle request to /users
app.use('/users', require('./src/routes/userRoutes'));

// handle request to /jobs
app.use('/jobs', require('./src/routes/jobRoutes'));

// Handle all requests
app.use('*', async (req, res) => {
    console.log(`request received from ip address - ${req.ip}`);

    res.json({response: 'catch all'});
});

// start the server and listen on port 3001
app.listen(port, () => console.log('listening on port ' + port));