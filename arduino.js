var arduino = require('duino'),
    board = new arduino.Board();

var board = new arduino.Board({
    device: "ACM"
});

var lcd = new d.LCD({
  board: board,
  pins: {rs:12, rw:11, e:10, data:[5, 4, 3, 2]}
});

lcd.begin(16, 2);
lcd.print("Hello Internet.");
