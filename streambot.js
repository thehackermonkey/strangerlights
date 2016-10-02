//twitter API and serialport
var Twit = require('twit'),
    config = require('./config'),
    serial = require('serialport'),
    T = new Twit(config);

// search for the following
var query = {
  track: 'strangerlights' //change this for the word of your choice, the bot is going to look for it
}

// init stream
var stream = T.stream('statuses/filter', query)

stream.on('tweet', function (tweet) {
	var tweeText = tweet.text,
		regexp = new RegExp('#([^\\s]*)', 'g'),
		tweeTextReplace = tweeText.replace(regexp, ' '),
		tweetArray = tweeTextReplace.split(''),
		alphabet = 'abcdefghijklmnñopqrstuvwxyz ',
		alphabetArray = alphabet.split(''),
		serialTweet = [];

	function checkTweet(tweetArray, alphabet){
		for(var i=0; i < tweetArray.length; i++){
			if(alphabet.indexOf(tweetArray[i]) > -1) {
				console.log('valid character');
				serialTweet.push(tweetArray[i])
			}
			else {
				console.log('invalid char');
			}
		}
	};
    checkTweet(tweetArray, alphabetArray)

    var port = new serial('/dev/cu.usbmodem1421', {
        baudRate: 250000
    });

    port.on('open', function() {
        sendChars = setInterval(function(){
            port.write(serialTweet[0], function(err) {
                if (err) {
                    return console.log('Error on write: ', err.message);
                }
                console.log(serialTweet[0]);
                serialTweet.shift();
            });
        }, 2000)
        //we need to ende this set interval when "serialTweet" is empty.
    });

    port.on('error', function(err) {
      console.log('Error: ', err.message);
    })

});
