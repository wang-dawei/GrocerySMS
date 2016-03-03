var http = require('http');
var url = require('url');
var qs = require('querystring');
var func = require('./module.js');

// Twilio Credentials (preset in Heroku configuration)
var accountSid = process.env.accountSid;
var authToken = process.env.authToken;
 
//Data Structures
var masterDict = [];
var lists = [];
var code = 0;

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
    res.write('(940)222-4419');
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
      var outputText = requestObject.Body;

      switch(textArray[0]){
        case '@help':
          outputText = '@newlist ListName \n \n @closelist ListName \n \n @checklist ListName \n \n @additem ListName Item1 Item2 ... FinalItem \n \n @removeitem ListName Item1 Item2 ... FinalItem \n \n @addnumber ListName PhoneNumber1 PhoneNumber2 ... FinalPhoneNumber' ;
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
          for(i = 2; i < textArray.length; i++){
            outputText = func.addItem(masterDict,phoneNumber,textArray[1],lists,textArray[i]);
            if(outputText === 'This list does not exist.'){
              break;
            };
            tempAddItems = tempAddItems + ' ' + textArray[i];
          };
          outputText = 'Added ' + tempAddItems; 
          break;
        case '@removeitem':
          var tempDelItems = '';
          for(i = 2; i < textArray.length; i++){
            outputText = func.delItem(masterDict,phoneNumber,textArray[1],lists,textArray[i]);
            if(outputText === 'This list does not exist.'){
              break;
            };
            tempDelItems = tempDelItems + ' ' + textArray[i];
          };
          outputText = 'Deleted ' + tempDelItems;
          break;
        case '@addnumber':
          var tempAddNumb = '';
          for(i = 3; i < textArray.length; i++){
            outputText = func.addNumber(masterDict,phoneNumber,textArray[1],textArray[i],textArray[2]);
            if(outputText === 'This list does not exist.'){
              break;
            };
            tempAddNumb = tempAddNumb + ' ' + textArray[i];
          };
          outputText = 'Added ' + tempAddNumb;
          break;
        default:
          outputText = 'GrocerySMS does not recognize that command. Use @help if you need a list of commands.';
          break;
      };

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