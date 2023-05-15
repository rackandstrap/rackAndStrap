const express = require('express');
const app = express();
const port = 3000

app.use('/', (req, res) => {
    console.log(req.url);
    res.json({response: 'succesful request'});
});

app.listen(port, () => console.log('listening on port ' + port));