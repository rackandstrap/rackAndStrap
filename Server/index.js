const express = require('express');
const app = express();
const port = 3000

// Handle all requests
app.use('*', (req, res) => {
    console.log(`request received from ip address - ${req.ip}`);
    res.json({response: 'response'});
});

app.listen(port, () => console.log('listening on port ' + port));