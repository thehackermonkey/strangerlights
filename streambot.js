//twitter API and serialport

var Twit = require('twit'),
    config = require('./local_config'),
    serial = require('serialport'),
	 alphabet = ' QRSTUVWXYZ',
    alphabetArray = alphabet.split(''),
    T = new Twit(config);

	// serial.list(function (err, ports) {
	//    ports.forEach(function(port) {
	//      console.log(port.comName);
	//      console.log(port.pnpId);
	//      console.log(port.manufacturer);
	//    });
	//  });

// search for the following
var query = {
  track: 'strangerlights' //change this for the word of your choice, the bot is going to look for it
}
///LOCAL TESTING

var port = new serial('/dev/cu.Telenax-COM1', {
	 baudRate: 115200
});
// function sendA(){
// 	port.write(' B');
// 	console.log("Escribi A");
// }

// port.on('open', function() {
// 	setTimeout(sendA(), 5000)
// });
//



port.on('open', function() {
    sendChars = setInterval(function(){
        if (!alphabetArray.length) {
            clearInterval(sendChars);
        }
        port.write(alphabetArray[0], function(err) {
            if (err) {
              return console.log('Error on write: ', err.message);
            }
            console.log(alphabetArray[0]);
            alphabetArray.shift();
        });
    }, 2500)
});



// init stream
// var stream = T.stream('statuses/filter', query)
//
// stream.on('tweet', function (tweet) {
// 	var tweeText = tweet.text.toUpperCase(),
// 		regexp = new RegExp('#([^\\s]*)', 'g'),
// 		tweeTextReplace = tweeText.replace(regexp, ' '),
// 		tweetArray = tweeTextReplace.split(''),
// 		alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ ',
// 		alphabetArray = alphabet.split(''),
// 		serialTweet = [];
//
// 	function checkTweet(tweetArray, alphabet){
// 		for(var i=0; i < tweetArray.length; i++){
// 			if(alphabet.indexOf(tweetArray[i]) > -1) {
// 				serialTweet.push(tweetArray[i])
// 			}
// 		}
// 		console.log(serialTweet);
//
//         var port = new serial('/dev/cu.Telenax-COM1', {
//             baudRate: 115200
//         });
//
//         port.on('open', function() {
//             // sendChars = setInterval(function(){
//             //     if (!serialTweet.length) {
//             //         clearInterval(sendChars);
//             //     }
//             //     port.write(serialTweet[0], function(err) {
//             //         if (err) {
//             //           return console.log('Error on write: ', err.message);
//             //         }
//             //         console.log(serialTweet[0]);
//             //         serialTweet.shift();
//             //     });
//             // }, 2000)
// 				var a = 'A';
//
// 				setTimeout(function () {
// 				  port.write(a);
// 				  console.log(a);
// 			  	}, 5000)
//
//
//
//         });
// 	};
//
// 	checkTweet(tweetArray, alphabetArray)
//
// });
