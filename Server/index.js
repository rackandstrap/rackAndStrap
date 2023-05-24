const express = require('express');
const app = express();
const cors = require('cors');
const port = 3001

const connectToDB = require('./src/config/db')
// Connect to the database
connectToDB()

app.use(express.json())
app.use(cors());

// handle request to /users
app.use('/users', require('./src/routes/userRoutes'));

// Handle all requests
app.use('*', (req, res) => {
    console.log(`request received from ip address - ${req.ip}`);
    res.json({response: 'catch all'});
});

// start the server and listen on port 3000
app.listen(port, () => console.log('listening on port ' + port));