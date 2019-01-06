var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;

var counter = 0;

var verses = [
"18 naked cowboys in the showers at Ram Ranch! Big hard throbbing c*cks wanting to be sucked! 18 naked cowboys wanting to be f*cked! Cowboys in the showers at Ram Ranch! On their knees wanting to suck cowboy c*cks! Ram Ranch really rocks!",

"Hot hard buff cowboys their c*cks throbbing hard! 18 more wild cowboys out in the yard! Big bulging c*cks ever so hard!",

"Orgy in the showers at Ram Ranch! Big hard throbbing c*cks ramming cowboy butt! Like a breeding ram wanting to rut!",

"Big hard throbbing c*cks getting sucked real deep! Cowboys even getting f*cked in their sleep! Ram Ranch, it rocks! Cowboys love big hard throbbing c*cks!",

"18 naked cowboys in the showers at Ram Ranch! Big hard throbbing c*cks wanting to be sucked! 18 naked cowboys wanting to be f*cked! Cowboys in the showers at Ram Ranch! On their knees wanting to suck cowboy c*cks! Ram Ranch really rocks!",

"Hot hard buff cowboys their c*cks throbbing hard! 18 more wild cowboys out in the yard! Big bulging c*cks ever so hard!",

"Orgy in the showers at Ram Ranch! Big hard throbbing c*cks ramming cowboy butt! Like a breeding ram wanting to rut!",

"18 naked cowboys in the showers at Ram Ranch! Big hard throbbing c*cks wanting to be sucked! 18 naked cowboys wanting to be f*cked! Cowboys in the showers at Ram Ranch! On their knees wanting to suck cowboy c*cks! Ram Ranch really rocks!",

"Big hard throbbing c*cks getting sucked real deep! Cowboys even getting f*cked in their sleep! Ram Ranch, it rocks! Cowboys love big hard throbbing c*cks!",

"Yeah 28 US Marines pulling up in black Ford Raptor Trucks! Helicopters landed! Ram Ranch is under seige under lockdown! US Marines are gonna f*ck ram ranch cowboy butts! Looking for Prince Harry! Gunna fuck prince harrys butt! Yeah wild buff! Cool US Marines gonna f*ck cowboy butts!"

];

function respond() {
  var   request = JSON.parse(this.req.chunks[0]),
        myRegex = /ram ranch/;

  if(request.text && myRegex.test(request.text)) {
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

  //botResponse = '18 naked cowboys in the showers at Ram Ranch! Big hard throbbing c*cks wanting to be sucked! 18 naked cowboys wanting to be f*cked! Cowboys in the showers at Ram Ranch! On their knees wanting to suck cowboy c*cks! Ram Ranch really rocks!';

	//botResponse = cool();
	//counter = counter + 1;
	//botResponse = getverse();

	// Here's a random comment!

	myRand = Math.floor(Math.random() * verses.length); // returns a random integer from 0 to 8
	botResponse = verses[myRand];
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
