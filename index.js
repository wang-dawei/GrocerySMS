var http = require('http');
var url = require('url');
var qs = require('querystring');
var func = require('./module.js');

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
    res.write('GrocerySMS');
    res.write('</h1>');
    res.write('<h2>');
    res.write('(972) 370-5159');
    res.write('</h2>');
    res.write('<p>');
    res.write('Commands:')
    res.write('</p>');
    res.write('</body>');
    res.write('</html>');
    res.end();
  }

  else if (parsedURL.pathname == '/sms') {
    //Handle incoming text messages
    req.setEncoding('utf8');

    var tempStr = '';

    req.on('data', function(data) {
      tempStr += data;
    });

    req.on('end', function() {
      var requestObject = qs.parse(tempStr);
      var phoneNumber = requestObject.From;
      var textArray = requestObject.Body.split(' ');
      console.log(textArray);
      /*var outputText = requestObject.Body;

      switch(textArray[0]){
        case '@help':
          break;
        case '@newlist':
          outputText = func.newList(textArray[1],phoneNumber);
          break;
        case '@closelist':
          outputText = func.clearNumber(textArray[1],phoneNumber);
          break;
        case '@checklist':
          outputText = func.checkList(textArray[1],phoneNumber);
          break;
        case '@additem':
          var tempAddItems = '';
          for(i = 2; i < textArray.length - 1; i++){
            func.addItem(textArray[1],phoneNumber,textArray[i]);
            tempAddItems = tempAddItems + textArray[i] + ', ';
          };
          outputText = 'Added ' + tempAddItems; 
          break;
        case '@removeitem':
          var tempDelItems = '';
          for(i = 2; i < textArray.length - 1; i++){
            func.delItem(textArray[1],phoneNumber,textArray[i]);
            tempDelItems = tempDelItems + textArray[i] + ', ';
          };
          outputText = 'Deleted ' + tempDelItems;
          break;
        case '@addnumber':
          var tempAddNumb = '';
          for(i = 2; i < textArray.length - 1; i++){
            func.addNumber(textArray[1],phoneNumber,textArray[i]);
            tempAddNumb = tempAddNumb + textArray[i] + ', ';
          };
          outputText = 'Added ' + tempAddNumb;
          break;
        case '@removenumber'
          var tempDelNumb = '';
          for(i = 2; i < textArray.length - 1; i++){
            func.delNumber(textArray[1],phoneNumber,textArray[i]);
            tempDelNumb = tempDelNumb + textArray[i] + ', ';
          };
          outputText = 'Added ' + tempDelNumb;
          break;
        default:
          outputText = 'GrocerySMS does not recognize that command. Use @help if you need a list of commands.';
          break;
      };*/

      res.writeHead(200, {'Content-Type': 'text/xml'});
      res.write('<?xml version="1.0" encoding="UTF-8" ?>');
      res.write('<Response>');
      res.write('<Message>GrocerySMS: Hello!</Message>');
      res.write('</Response>');
      res.end();
    });
  }

  else {
    //Handle unknown requests to other ports
    res.writeHead(404);
    res.end();
  };
}); 

server.listen(process.env.PORT)