var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;

var counter = 0;

var verses = [
"Baby shark, doo doo doo doo doo doo Baby shark, doo doo doo doo doo doo Baby shark, doo doo doo doo doo doo Baby shark!",

"Mommy shark, doo doo doo doo doo doo Mommy shark, doo doo doo doo doo doo Mommy shark, doo doo doo doo doo doo Mommy shark!",

"Daddy shark, doo doo doo doo doo doo Daddy shark, doo doo doo doo doo doo Daddy shark, doo doo doo doo doo doo Daddy shark!",

"Grandma shark, doo doo doo doo doo doo Grandma shark, doo doo doo doo doo doo Grandma shark, doo doo doo doo doo doo Grandma shark!",

"Grandpa shark, doo doo doo doo doo doo Grandpa shark, doo doo doo doo doo doo Grandpa shark, doo doo doo doo doo doo Grandpa shark! "
];

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      babyRegex = /baby/;
      mommyRegex = /mommy/;
      daddyRegex = /daddy/;
      grandmaRegex = /grandma/;
      grandpaRegegx = /grandpa/;

  if(request.text && babyRegex.test(request.text)) {
    this.res.writeHead(200);
    postMessage();
    this.res.end();
  } else {
    console.log("don't care");
    this.res.writeHead(198);
    this.res.end();
  }
}

function postMessage() {
  var botResponse, options, body, botReq, myRand;

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
