const express = require('express');
const app = express();
const port = 3000

const connectToDB = require('./src/config/db')

// Connect to the database
connectToDB()

// Handle all requests
app.use('*', (req, res) => {
    console.log(`request received from ip address - ${req.ip}`);
    res.json({response: 'response'});
});

// start the server and listen on port 3000
app.listen(port, () => console.log('listening on port ' + port));