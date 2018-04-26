// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var ejs = require('ejs');
var requestIp = require('request-ip');

app.use(express.static('public'));
app.set('view-engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.htm

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {

    const reqHeader = req.headers;
    
    const headerObj = {
        ipAddress: requestIp.getClientIp(req) ,
        language: reqHeader['accept-language'].split(';')[0],
        software: reqHeader['user-agent'].split(/([()])/)[2]
    }

    res.render('index.html', {header: headerObj});
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
