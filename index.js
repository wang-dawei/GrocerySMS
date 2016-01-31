var http = require('http');
var url = require('url');

// Twilio Credentials (preset in Heroku configuration)
var accountSid = process.env.accountSid;
var authToken = process.env.authToken;
 
//require the Twilio module and create a REST client 
var client = require('twilio')(accountSid, authToken); 

var server = http.createServer(function (req,res) {
  parsedURL = url.parse(req.url,true);

  if (parsedURL.pathname == '/') {
    //Create a very basic HTML webpage, can be more complex later
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<html>');
    res.write('<head>');
    res.write('<title>GrocerySMS</title>');
    res.write('</head>');
    res.write('<body>');
    res.write('<h1>');
    res.write('Hello World!');
    res.write('</h1>');
    res.write('</body>');
    res.write('</html>');
    res.end();
  }

  else if (parsedURL.pathname == '/sms') {
    //Handle incoming text messages
    req.setEncoding('utf8');
    var textIn = req.Body;
    client.messages.create({ 
      to: '+12144032374', 
      from: '+19723705159', 
      body: 'GrocerySMS',  
    }, function(err, message) { 
      console.log(message.sid); 
    });
    res.end();
  }

  else {
    //Handle unknown requests to other ports
    res.writeHead(404);
    res.end();
  };
}); 

server.listen(process.env.PORT)
console.log('Server is listening at port ' + process.env.PORT)