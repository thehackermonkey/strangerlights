//require twit library, CSV(to append tweet inf to a csv) and moment(time formating)
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
		console.log(serialTweet);
	};

	checkTweet(tweetArray, alphabetArray)

});
