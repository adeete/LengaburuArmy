const express = require('express'), 
        path = require('path'),
        app = express(),
        port = process.env.PORT || 5500;

// Serve static files....
app.use(express.static(__dirname + '/dist/finding-falcone'));

// Send all requests to index.html
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/finding-falcone/index.html'));
});

// default Heroku PORT
app.listen(port, ()=> {
    console.log("starting server");
});