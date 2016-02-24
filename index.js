var http = require('http');
var url = require('url');
var qs = require('querystring');
var func = require('./module.js')

// Twilio Credentials (preset in Heroku configuration)
var accountSid = process.env.accountSid;
var authToken = process.env.authToken;
 
//require the Twilio module and create a REST client 
var client = require('twilio')(accountSid, authToken);

//Data Arrays
var masterDict = [];
var lists = [];
var code = 0;

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
    res.write('<div align = "center">');
    res.write('<h1>');
    res.write('GrocerySMS');
    res.write('</h1>');
    res.write('<h2>');
    res.write('(972) 370-5159');
    res.write('</h2>');
    res.write('<p>');
    res.write('Commands:')
    res.write('</p>');
    res.write('</div>');
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
      var outputText = '';

      if (masterArray.indexOf(phoneNumber) === -1) {
        //Add phoneNumber to the master list of numbers
      };
      switch(textArray[0]){
        case '@help':
          break;
        case '@newlist':
          outputText = func.newList(masterDict,phoneNumber,textArray[1],lists,code);
          break;
        case '@closelist':
          outputText = func.clearList(masterDict,phoneNumber,textArray[1],lists);
          break;
        case '@checklist':
          outputText = func.checkList(masterDict,phoneNumber,textArray[1],lists);
          break;
        case '@additem':
          var tempAddItems = '';
          for(i = 2; i < textArray.length - 1; i++){
            func.addItem(masterDict,phoneNumber,textArray[1],lists,textArray[i]);
            tempAddItems = tempAddItems + textArray[i] + ', ';
          };
          outputText = 'Added ' + tempAddItems; 
          break;
        case '@removeitem':
          var tempDelItems = '';
          for(i = 2; i < textArray.length - 1; i++){
            func.delItem(masterDict,phoneNumber,textArray[1],lists,textArray[i]);
            tempDelItems = tempDelItems + textArray[i] + ', ';
          };
          outputText = 'Deleted ' + tempDelItems;
          break;
        case '@addnumber':
          var tempAddNumb = '';
          for(i = 3; i < textArray.length - 1; i++){
            func.addNumber(masterDict,phoneNumber,textArray[1],textArray[i],textArray[2]);
            tempAddNumb = tempAddNumb + textArray[i] + ', ';
          };
          outputText = 'Added ' + tempAddNumb;
          break;

        default:
          outputText = 'GrocerySMS does not recognize that command. Use @help if you need a list of commands.';
          break;
      };
      /*if (textArray[0] === '@help') {
        //Show a list of commands and brief explanations
      }

      else if (textArray[0] === '@newlist') {
        //Create a new grocery list
        outputText = module.addList(code,number);
      }

      else if (textArray[0] === '@closelist') {
        //Close a finished grocery list
      }

      else if (textArray[0] === '@checklist') {
        //See items in a grocery list
      }     

      else if (textArray[0] === '@additem') {
        //Add an item to an existing grocery list
      }

      else if (textArray[0] === '@removeitem') {
        //Remove an item from an existing grocery list
      }

      else if (textArray[0] === '@addnumber') {
        //Add a number to an existing grocery list
      }

      else if (textArray[0] === '@removenumber') {
        //Remove a number from a finished grocery list
      }

      else {
        //Return an error
        outputText = 'GrocerySMS does not recognize that command. Use @help if you need a list of commands.';
      };*/

      res.writeHead(200, {'Content-Type': 'text/xml'});
      res.write('<?xml version="1.0" encoding="UTF-8" ?>');
      res.write('<Response>');
      res.write('<Message>GrocerySMS: ' + outputText + '</Message>');
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