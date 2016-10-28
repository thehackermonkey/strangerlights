var serial = require('serialport'),
    alphabet = 'BABAC',
    alphabetArray = alphabet.split('');

var port = new serial('/dev/cu.usbmodem1421', {
    baudRate: 250000
});

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
    }, 2000)
});

// open errors will be emitted as an error event
port.on('error', function(err) {
  console.log('Error: ', err.message);
})
