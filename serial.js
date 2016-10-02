var serial = require('serialport'),
    alphabet = 'HOLA',
    alphabetArray = alphabet.split('');

var port = new serial('/dev/cu.usbmodem1421', {
    baudRate: 250000
});

port.on('open', function() {
    sendChars = setInterval(function(){
        port.write(alphabetArray[0], function(err) {
            if (err) {
                return console.log('Error on write: ', err.message);
            }
            console.log(alphabetArray[0]);
            alphabetArray.shift();
            if(alphabetArray.length === 0){
                clearInterval(sendChars)
            }
        });
    }, 2000);
});

port.on('error', function(err) {
  console.log('Error: ', err.message);
})

console.log('ended');
