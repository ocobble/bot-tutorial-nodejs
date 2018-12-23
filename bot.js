var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;

var counter = 0;

var verses = [
"It's just a gas station",
"Yes it is"
];

function respond() {
  var   request = JSON.parse(this.req.chunks[0]),
        QTRegex = /QT/,
	antiQTRegex = /No it's not/;

  if(request.text && QTRegex.test(request.text)) {
    this.res.writeHead(200);
    postMessage(1);
    this.res.end();
  } else if (request.text && antiQTRegex.test(request.txt)) {
    this.res.writeHead(200);
    postMessage(2);
    this.res.end();
  }
  } else {
    console.log("don't care");
    this.res.writeHead(198);
    this.res.end();
  }
}

function postMessage(val) {
  var botResponse, options, body, botReq, myRand;

  //botResponse = '18 naked cowboys in the showers at Ram Ranch! Big hard throbbing c*cks wanting to be sucked! 18 naked cowboys wanting to be f*cked! Cowboys in the showers at Ram Ranch! On their knees wanting to suck cowboy c*cks! Ram Ranch really rocks!';

	//botResponse = cool();
	//counter = counter + 1;
	//botResponse = getverse();

	// Here's a random comment!

	//myRand = Math.floor(Math.random() * verses.length); // returns a random integer from 0 to 8
	//botResponse = verses[myRand];
	botResponse = verses[0];
  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}

function getverse(counter) {
	if (counter == 10)
	{
		counter = 0;
		return verses[9];
	}
	return verses[counter];
}
exports.respond = respond;
